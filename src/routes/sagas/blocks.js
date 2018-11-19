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

import {
  selectNetworkId,
} from 'store/stateSelectors'

import {
  getBlock,
} from 'services/web3'

import {
  setLatestBlock,
  setCurrentBlock,
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

function* requestTaskProcess(requestQueueCh: Channel): Saga<void> {
  while (true) {
    const request: SchedulerTask = yield take(requestQueueCh)
    if (request.retryCount) {
      // eslint-disable-next-line fp/no-mutation
      request.retryCount -= 1
    }

    try {
      if (request.module === 'balances') {
        yield* requestBalance(request)
      }
      // if (request.module === 'transactions') {
      //   yield* requestTransaction(request, requestQueueCh)
      // }
    } catch (error) {
      if (request.retryCount && request.retryCount > 0) {
        yield put(requestQueueCh, request)
      }
    }
  }
}

function* blockDataProcess(): Saga<void> {
  while (true) {
    const networkId: NetworkId = yield select(selectNetworkId)
    const currentBlock: ?BlockInfo = yield select(selectCurrentBlock, networkId)

    if (!currentBlock) {
      yield take(SET_CURRENT_BLOCK)
      continue
    }

    const buffer = buffers.expanding(1)
    const requestQueueCh: Channel = yield channel(buffer)
    const requestTasks: Array<Task<typeof requestTaskProcess>> =
      yield all(Array.from({ length: 5 }).map(() => fork(requestTaskProcess, requestQueueCh)))

    const getBalancesTask: Task<typeof getBalancesSchedulerProcess> = yield fork(
      getBalancesSchedulerProcess,
      requestQueueCh,
      networkId,
      currentBlock
    )

    // wait current block change
    yield take(SET_CURRENT_BLOCK)

    yield cancel(getBalancesTask)

    yield all(requestTasks.map(task => cancel(task)))

    requestQueueCh.close()
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
      yield put(setCurrentBlock(networkId, latestBlock))
      continue
    }

    if (currentBlock.isBalancesFetched /* && currentBlock.isTransactionsReady */) {
      if (processedBlock && processedBlock.hash === currentBlock.hash) {
        continue
      }
      yield put(setProcessedBlock(networkId, currentBlock))

      if (currentBlock.hash === latestBlock.hash) {
        continue
      }

      yield put(setCurrentBlock(networkId, null))
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
        }: ETHBlock = yield call(getBlock, 'latest')

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
