// @flow

import {
  delay,
  type Task,
} from 'redux-saga'

import {
  put,
  call,
  fork,
  take,
  cancel,
  select,
  takeEvery,
} from 'redux-saga/effects'

import web3 from 'services/web3'
import { ONE_SECOND } from 'data/intervals'

import {
  selectLatestBlock,
  selectCurrentBlock,
  selectProcessingBlock,
} from '../selectors/blocks'

import {
  selectCurrentNetworkId,
  selectCurrentNetwork,
} from '../selectors/config'

import * as blocks from '../modules/blocks'
import {
  initHistoricalSyncParameters,
  loadTransactionsFromBlockExplorer,
} from './historical'

import { cancelAllGetAssetEvents } from '../network/web3'
import { cancelAllGetEthTransactions } from '../network/etherscan'

const LATEST_BLOCK_SYNC_TIMEOUT = 30 * ONE_SECOND
const CURRENT_BLOCK_SYNC_TIMEOUT = 5 * ONE_SECOND

function* saveInitialBlockNumber(): Saga<void> {
  const network = yield select(selectCurrentNetwork)

  // eslint-disable-next-line fp/no-let
  let error = null

  do {
    try {
      const block: BlockData = yield call(web3.getBlock, network, 'latest')

      yield put(blocks.setInitialBlockNumber(block.number))

      // eslint-disable-next-line fp/no-mutation
      error = null
    } catch (err) {
      // eslint-disable-next-line fp/no-mutation
      error = err

      yield call(delay, LATEST_BLOCK_SYNC_TIMEOUT)
    }
  } while (error)
}

function* latestBlockSync(): Saga<void> {
  try {
    while (true) {
      const networkId = yield select(selectCurrentNetworkId)
      const network = yield select(selectCurrentNetwork)

      const prevLatestBlock: ?BlockData = yield select(selectLatestBlock, networkId)

      try {
        const nextLatestBlock: BlockData = yield call(web3.getBlock, network, 'latest')

        if (!prevLatestBlock) {
          yield put(blocks.setLatestBlock(networkId, nextLatestBlock))
        } else {
          const isForked: boolean = (nextLatestBlock.number < prevLatestBlock.number)
          const isBlockMined: boolean = (nextLatestBlock.number > prevLatestBlock.number)

          if (isBlockMined) {
            yield put(blocks.setLatestBlock(networkId, nextLatestBlock))
          } else if (isForked) {
            yield put(blocks.nodeForked(networkId, prevLatestBlock, nextLatestBlock))
          }
        }

        yield call(delay, LATEST_BLOCK_SYNC_TIMEOUT)
      } catch (err) {
        yield put(blocks.latestBlockSyncError(err))
        yield call(delay, LATEST_BLOCK_SYNC_TIMEOUT)
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
      yield call(delay, CURRENT_BLOCK_SYNC_TIMEOUT)
      continue
    }

    if (!processingBlock) {
      yield put(blocks.setProcessingBlock(networkId, latestBlock))
      yield call(delay, CURRENT_BLOCK_SYNC_TIMEOUT)
      continue
    }

    const {
      hash,
      isTransactionsFetched,
      isTransactionsLoading,
    }: BlockData = processingBlock

    if (isTransactionsFetched) {
      const isCurrentBlockOutdated: boolean = !currentBlock || (currentBlock.hash !== hash)

      if (isCurrentBlockOutdated) {
        yield put(blocks.setCurrentBlock(networkId, processingBlock))
      }

      const isProcessingBlockOutdated: boolean = (hash !== latestBlock.hash)
      const isProcessingBlockFinished: boolean = !isTransactionsLoading

      if (isProcessingBlockOutdated && isProcessingBlockFinished) {
        yield put(blocks.setProcessingBlock(networkId, latestBlock))
      }
    }

    yield call(delay, CURRENT_BLOCK_SYNC_TIMEOUT)
  }
}

function* syncStart(): Saga<void> {
  yield saveInitialBlockNumber()

  yield initHistoricalSyncParameters()
  yield loadTransactionsFromBlockExplorer()

  const latestSyncTask: Task<typeof latestBlockSync> = yield fork(latestBlockSync)
  const currentSyncTask: Task<typeof currentBlockSync> = yield fork(currentBlockSync)

  yield take(blocks.SYNC_STOP)

  cancelAllGetAssetEvents()
  cancelAllGetEthTransactions()

  yield cancel(latestSyncTask)
  yield cancel(currentSyncTask)
}

function* syncRestart(): Saga<void> {
  yield put(blocks.syncStop())
  yield put(blocks.syncStart())
}

export function* blocksRootSaga(): Saga<void> {
  yield takeEvery(blocks.SYNC_START, syncStart)
  yield takeEvery(blocks.SYNC_RESTART, syncRestart)
}
