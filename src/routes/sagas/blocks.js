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
  setProcessedBlock,
  SET_CURRENT_BLOCK,
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
  const { blocks } = state.blocks.persist

  if (blocks[networkId] && blocks[networkId].latestBlock) {
    return blocks[networkId].latestBlock
  }

  return null
}

function selectCurrentBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { blocks } = state.blocks.persist

  if (blocks[networkId] && blocks[networkId].latestBlock) {
    return blocks[networkId].currentBlock
  }

  return null
}

function selectProcessedBlock(state: AppState, networkId: NetworkId): ?BlockInfo {
  const { blocks } = state.blocks.persist

  if (blocks[networkId] && blocks[networkId].latestBlock) {
    return blocks[networkId].processedBlock
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
    } catch (error) {
      if (request.retryCount && request.retryCount > 0) {
        yield put(requestQueue, {
          ...request,
          retryCount: request.retryCount - 1,
        })
      }
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
    const currentBlock: ?BlockInfo = yield select(selectProcessedBlock, networkId)
    const processingBlock: ?BlockInfo = yield select(selectCurrentBlock, networkId)

    if (!processingBlock) {
      yield take(SET_CURRENT_BLOCK)
      continue
    }

    const buffer = buffers.expanding(1)
    const requestQueue: Channel = yield channel(buffer)
    const requestTasks: Array<Task<typeof requestTaskProcess>> = []

    /* eslint-disable more/no-c-like-loops,
      fp/no-let, fp/no-mutation, no-plusplus, fp/no-mutating-methods */
    for (let i = 0; i < 5; i++) {
      requestTasks.push(yield fork(requestTaskProcess, requestQueue))
    }

    const getBalancesTask: Task<typeof getBalancesSchedulerProcess> = yield fork(
      getBalancesSchedulerProcess,
      requestQueue,
      networkId,
      processingBlock,
    )

    yield put(transactions.syncStart(requestQueue, networkId, owner, currentBlock, processingBlock))

    // wait current block change
    yield take(SET_CURRENT_BLOCK)

    yield cancel(getBalancesTask)

    for (let i = 0; i < requestTasks.length; i++) {
      yield cancel(requestTasks[i])
    }

    yield put(transactions.syncStop())

    requestQueue.close()
    /* eslint-enable more/no-c-like-loops,
      fp/no-let, fp/no-mutation, no-plusplus, fp/no-mutating-methods */
  }
}

function* blockFlowProcess(): Saga<void> {
  while (true) {
    yield call(delay, 1000)

    const networkId: NetworkId = yield select(selectNetworkId)
    const latestBlock: ?BlockInfo = yield select(selectLatestBlock, networkId)
    const currentBlock: ?BlockInfo = yield select(selectCurrentBlock, networkId)
    const processedBlock: ?BlockInfo = yield select(selectProcessedBlock, networkId)

    if (!latestBlock) {
      continue
    }

    if (!currentBlock) {
      // yield put(setCurrentBlock(networkId, latestBlock))
      continue
    }

    if (currentBlock.isBalancesReady /* && currentBlock.isTransactionsReady */) {
      if (processedBlock && processedBlock.hash === currentBlock.hash) {
        continue
      }
      yield put(setProcessedBlock(networkId, currentBlock))

      if (currentBlock.hash === latestBlock.hash) {
        continue
      }

      // yield put(setCurrentBlock(networkId, null))
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
          number,
          hash,
          timestamp,
          parentHash,
        }: ETHBlock = yield call(web3.getBlock, 'latest')

        const latestBlockInfo: BlockInfo = {
          number,
          hash,
          timestamp,
          parentHash,
          requestedAt: new Date(),
        }

        if (!latestBlock || latestBlockInfo.number > latestBlock.number) {
          console.log(`setLatestBlock: ${networkId} -> ${latestBlockInfo.number}`)
          yield put(setLatestBlock(networkId, latestBlockInfo))
        } else if (latestBlockInfo.number < latestBlock.number) {
          console.error(`WE ARE IN FORK: ${networkId} -> new block
            number: ${latestBlockInfo.number}, old number ${latestBlock.number}`)
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
