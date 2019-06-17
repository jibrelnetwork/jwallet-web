// @flow

import {
  buffers,
  channel,
  delay,
  type Channel,
  type Task,
} from 'redux-saga'

import {
  all,
  put,
  call,
  fork,
  take,
  cancel,
  select,
  cancelled,
  takeEvery,
} from 'redux-saga/effects'

import config from 'config'
import web3 from 'services/web3'

import {
  selectLatestBlock,
  selectCurrentBlock,
  selectProcessingBlock,
} from '../selectors/blocks'

import {
  selectCurrentNetworkId,
  selectCurrentNetwork,
} from '../selectors/network'

import { selectCurrentAddress } from '../selectors/priorities'

import * as transactions from '../modules/transactions'

import {
  requestTransaction,
  requestTransactions,
} from './transactions'
import * as blocks from '../modules/blocks'

function* latestBlockSync(): Saga<void> {
  try {
    while (true) {
      const networkId = yield select(selectCurrentNetworkId)
      const network = yield select(selectCurrentNetwork)

      const latestBlock: ?BlockData = yield select(selectLatestBlock, networkId)

      try {
        const block: BlockData = yield call(web3.getBlock, network, 'latest')

        if (!latestBlock) {
          yield put(blocks.setLatestBlock(networkId, block))
        } else {
          const isForked: boolean = (block.number < latestBlock.number)
          const isBlockMined: boolean = (block.number > latestBlock.number)

          if (isBlockMined) {
            yield put(blocks.setLatestBlock(networkId, block))
          } else if (isForked) {
            yield put(blocks.nodeForked(networkId, latestBlock, block))
          }
        }

        yield call(delay, config.latestBlockSyncTimeout)
      } catch (err) {
        yield put(blocks.latestBlockSyncError(err))
        yield call(delay, config.latestBlockSyncTimeout)
      }
    }
  } finally {
    yield put(blocks.latestBlockSyncStop())
  }
}

function* currentBlockSync(): Saga<void> {
  while (true) {
    const networkId = yield select(selectCurrentNetworkId)
    const latestBlock: ?BlockData = yield select(selectLatestBlock, networkId)
    const currentBlock: ?BlockData = yield select(selectCurrentBlock, networkId)
    const processingBlock: ?BlockData = yield select(selectProcessingBlock, networkId)

    if (!latestBlock) {
      yield call(delay, config.currentBlockSyncTimeout)
      continue
    }

    if (!processingBlock) {
      yield put(blocks.setProcessingBlock(networkId, latestBlock))
      yield call(delay, config.currentBlockSyncTimeout)
      continue
    }

    const {
      hash,
      isBalancesFetched,
      isBalancesLoading,
      isTransactionsFetched,
      isTransactionsLoading,
    }: BlockData = processingBlock

    if (isBalancesFetched && isTransactionsFetched) {
      const isCurrentBlockOutdated: boolean = !currentBlock || (currentBlock.hash !== hash)

      if (isCurrentBlockOutdated) {
        yield put(blocks.setCurrentBlock(networkId, processingBlock))
      }

      const isProcessingBlockOutdated: boolean = (hash !== latestBlock.hash)
      const isProcessingBlockFinished: boolean = !(isBalancesLoading || isTransactionsLoading)

      if (isProcessingBlockOutdated && isProcessingBlockFinished) {
        yield put(blocks.setProcessingBlock(networkId, latestBlock))
      }
    }

    yield call(delay, config.currentBlockSyncTimeout)
  }
}

export function* processQueue(
  requestQueue: Channel,
  ownerAddress: OwnerAddress,
): Saga<void> {
  while (true) {
    const request: SchedulerTask = yield take(requestQueue)

    try {
      if (request.module === 'transactions') {
        yield* requestTransactions(requestQueue, request)
      } else if (request.module === 'transaction') {
        yield* requestTransaction(request, ownerAddress)
      } else {
        throw new Error(`Task handler for module ${request.module} is not defined`)
      }
    } catch (err) {
      if (request.retryCount && request.retryCount > 0) {
        yield put(requestQueue, {
          ...request,
          retryCount: request.retryCount - 1,
        })
      }

      yield put(blocks.processQueueError(err))
    }
  }
}

function* processBlock(): Saga<void> {
  try {
    while (true) {
      const networkId = yield select(selectCurrentNetworkId)
      const currentBlock: ?BlockData = yield select(selectCurrentBlock, networkId)
      const processingBlock: ?BlockData = yield select(selectProcessingBlock, networkId)

      const ownerAddress = yield select(selectCurrentAddress)

      if (!processingBlock) {
        yield call(delay, config.processingBlockWaitTimeout)
        continue
      }

      const buffer = buffers.expanding(1)
      const requestQueue: Channel = yield channel(buffer)

      const processQueueTasks: Task<typeof processQueue>[] = yield all(
        Array
          .from({ length: config.requestQueueWorkersCount })
          .map(() => fork(
            processQueue,
            requestQueue,
            networkId,
            ownerAddress,
          )),
      )

      yield put(transactions.fetchByOwnerRequest(
        requestQueue,
        networkId,
        ownerAddress,
        currentBlock ? currentBlock.number : 0,
        processingBlock.number,
      ))

      yield put(transactions.resyncTransactionsStart(
        requestQueue,
        networkId,
        ownerAddress,
        currentBlock ? currentBlock.number : 0,
      ))

      yield take(blocks.SET_PROCESSING_BLOCK)
      yield all(processQueueTasks.map(task => cancel(task)))
      requestQueue.close()
    }
  } finally {
    if (yield cancelled()) {
      yield put(transactions.resyncTransactionsStop())
    }
  }
}

function* syncStart(): Saga<void> {
  const address = yield select(selectCurrentAddress)

  const latestSyncTask: Task<typeof latestBlockSync> = yield fork(latestBlockSync)
  const currentSyncTask: Task<typeof currentBlockSync> = yield fork(currentBlockSync)
  const processBlockTask: Task<typeof processBlock> = yield fork(processBlock, address)

  yield take(blocks.SYNC_STOP)

  yield cancel(latestSyncTask)
  yield cancel(currentSyncTask)
  yield cancel(processBlockTask)
}

function* syncRestart(): Saga<void> {
  yield put(blocks.syncStop())
  yield put(blocks.syncStart())
}

export function* blocksRootSaga(): Saga<void> {
  yield takeEvery(blocks.SYNC_START, syncStart)
  yield takeEvery(blocks.SYNC_RESTART, syncRestart)
}
