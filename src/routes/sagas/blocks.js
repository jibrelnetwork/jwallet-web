// @flow

import {
  delay,
  channel,
  buffers,
  type Task,
  type Channel,
} from 'redux-saga'

import {
  all,
  take,
  fork,
  cancel,
  select,
  put,
  call,
} from 'redux-saga/effects'

import * as transactions from 'routes/modules/transactions'

import {
  selectNetworkId,
  selectWalletsPersist,
} from 'store/stateSelectors'

import {
  web3,
  keystore,
} from 'services'

import {
  setLatestBlock,
  setCurrentBlock,
  setProcessingBlock,
  SET_PROCESSING_BLOCK,
} from '../modules/blocks'

import {
  OPEN_ASIDE_LAYOUT,
  CLOSE_ASIDE_LAYOUT,
} from '../modules'

import {
  requestBalance,
  getBalancesSchedulerProcess,
} from './balances'

import {
  requestTransactions,
} from './transactions'

function selectLatestBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { items } = state.blocks.persist

  if (items[networkId] && items[networkId].latestBlock) {
    return items[networkId].latestBlock
  }

  return null
}

function selectCurrentBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { items } = state.blocks.persist

  if (items[networkId] && items[networkId].latestBlock) {
    return items[networkId].currentBlock
  }

  return null
}

function selectProcessingBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { items } = state.blocks.persist

  if (items[networkId] && items[networkId].latestBlock) {
    return items[networkId].processingBlock
  }

  return null
}

export function* requestTaskProcess(requestQueue: Channel): Saga<void> {
  while (true) {
    const request: SchedulerTask = yield take(requestQueue)

    try {
      if (request.module === 'balances') {
        yield* requestBalance(request)
      }

      if (request.module === 'transactions') {
        yield* requestTransactions(request)
      }
    } catch (err) {
      if (request.retryCount && request.retryCount > 0) {
        yield put(requestQueue, {
          ...request,
          retryCount: request.retryCount - 1,
        })
      }

      console.error(err)
    }
  }
}

function* blockDataProcess(): Saga<void> {
  while (true) {
    const {
      items,
      activeWalletId,
    }: ExtractReturn<typeof selectWalletsPersist> = yield select(selectWalletsPersist)

    if (!activeWalletId) {
      throw new Error('Active wallet is not found')
    }

    const owner: ?Address = keystore.getAddress(items, activeWalletId)

    if (!owner) {
      throw new Error('Active wallet is not found')
    }

    const networkId: ExtractReturn<typeof selectNetworkId> = yield select(selectNetworkId)
    const currentBlock: ?BlockInfo = yield select(selectCurrentBlock, networkId)
    const processingBlock: ?BlockInfo = yield select(selectProcessingBlock, networkId)

    if (!processingBlock) {
      yield take(SET_PROCESSING_BLOCK)
      continue
    }

    const buffer = buffers.expanding(1)
    const requestQueue: Channel = yield channel(buffer)
    const requestTasks: Array<Task<typeof requestTaskProcess>> =
      yield all(Array.from({ length: 5 }).map(() => fork(requestTaskProcess, requestQueue)))

    const getBalancesTask: Task<typeof getBalancesSchedulerProcess> = yield fork(
      getBalancesSchedulerProcess,
      requestQueue,
      networkId,
      processingBlock,
    )

    yield put(transactions.syncStart(requestQueue, networkId, owner, currentBlock, processingBlock))

    // wait current block change
    yield take(SET_PROCESSING_BLOCK)

    yield cancel(getBalancesTask)

    yield all(requestTasks.map(task => cancel(task)))

    yield put(transactions.syncStop())

    requestQueue.close()
  }
}

function* blockFlowProcess(): Saga<void> {
  while (true) {
    yield call(delay, 1000)

    const networkId: NetworkId = yield select(selectNetworkId)
    const latestBlock: ?BlockInfo = yield select(selectLatestBlock, networkId)
    const currentBlock: ?BlockInfo = yield select(selectCurrentBlock, networkId)
    const processingBlock: ?BlockInfo = yield select(selectProcessingBlock, networkId)

    if (!latestBlock) {
      continue
    }

    if (!processingBlock) {
      yield put(setProcessingBlock(networkId, latestBlock))
      continue
    }

    if (processingBlock.isBalancesFetched /* && processingBlock.isTransactionsReady */) {
      if (!currentBlock || (currentBlock.hash !== processingBlock.hash)) {
        yield put(setCurrentBlock(networkId, processingBlock))
      }

      if (processingBlock.hash !== latestBlock.hash) {
        yield put(setProcessingBlock(networkId, null))
      }
    }
  }
}

function* getBlockProcess(): Saga<void> {
  try {
    while (true) {
      const networkId: NetworkId = yield select(selectNetworkId)
      const latestBlock: ?BlockInfo = yield select(selectLatestBlock, networkId)

      try {
        const {
          hash,
          parentHash,
          number,
          timestamp,
        }: ETHBlock = yield call(web3.getBlock, 'latest')

        const receivedBlock: BlockInfo = {
          hash,
          parentHash,
          number,
          timestamp,
          requestedAt: new Date(),
        }

        if (!latestBlock || receivedBlock.number > latestBlock.number) {
          console.log(`setLatestBlock: ${networkId} -> ${receivedBlock.number}`)
          yield put(setLatestBlock(networkId, receivedBlock))
        } else if (receivedBlock.number < latestBlock.number) {
          console.error(`WE ARE IN FORK: ${networkId} -> new block
            number: ${receivedBlock.number}, old number ${latestBlock.number}`)
        }

        yield call(delay, 7000)
      } catch (error) {
        console.error(error)
        yield call(delay, 1000)
      }
    }
  } finally {
    console.log('blockManagerProcess canceled')
  }
}

function* blockManager(): Saga<void> {
  while (yield take(OPEN_ASIDE_LAYOUT)) {
    const getBlockTask: Task<typeof getBlockProcess> = yield fork(getBlockProcess)
    const blockFlowTask: Task<typeof blockFlowProcess> = yield fork(blockFlowProcess)
    const blockDataTask: Task<typeof blockDataProcess> = yield fork(blockDataProcess)

    yield take(CLOSE_ASIDE_LAYOUT)

    yield cancel(getBlockTask)
    yield cancel(blockFlowTask)
    yield cancel(blockDataTask)
  }
}

export function* blocksRootSaga(): Saga<void> {
  yield all([
    blockManager(),
  ])
}
