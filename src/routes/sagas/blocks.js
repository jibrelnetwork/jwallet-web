// @flow

import {
  delay,
  channel,
  buffers,
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
} from 'redux-saga/effects'

import * as transactions from 'routes/modules/transactions'

import { selectNetworkId } from 'store/selectors/networks'
import { selectWalletsPersist } from 'store/selectors/wallets'

import {
  selectLatestBlock,
  selectCurrentBlock,
  selectProcessingBlock,
} from 'store/selectors/blocks'

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

export function* requestProcess(requestQueue: Channel): Saga<void> {
  while (true) {
    const request: SchedulerTask = yield take(requestQueue)

    try {
      if (request.module === 'balances') {
        yield* requestBalance(request)
      }

      if (request.module === 'transactions') {
        yield* requestTransactions(request, requestQueue)
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

function* schedulerProcess(): Saga<void> {
  try {
    const {
      items,
      activeWalletId,
    }: ExtractReturn<typeof selectWalletsPersist> = yield select(selectWalletsPersist)

    if (!activeWalletId) {
      return
    }

    const owner: ?Address = keystore.getAddress(items, activeWalletId)

    if (!owner) {
      return
    }

    const networkId: ExtractReturn<typeof selectNetworkId> = yield select(selectNetworkId)

    while (true) {
      const currentBlock: ?BlockInfo = yield select(selectCurrentBlock, networkId)
      const processingBlock: ?BlockInfo = yield select(selectProcessingBlock, networkId)

      if (!processingBlock) {
        yield take(SET_PROCESSING_BLOCK)
        continue
      }

      const buffer = buffers.expanding(1)
      const requestQueue: Channel = yield channel(buffer)

      const requestTasks: Array<Task<typeof requestProcess>> = yield all(Array
        .from({ length: 5 })
        .map(() => fork(requestProcess, requestQueue))
      )

      const getBalancesTask: Task<typeof getBalancesSchedulerProcess> = yield fork(
        getBalancesSchedulerProcess,
        requestQueue,
        networkId,
        processingBlock,
      )

      yield put(transactions.syncStart(
        requestQueue,
        networkId,
        owner,
        currentBlock,
        processingBlock,
      ))

      // wait current block change
      yield take(SET_PROCESSING_BLOCK)

      yield cancel(getBalancesTask)

      yield all(requestTasks.map(task => cancel(task)))

      yield put(transactions.syncStop())

      requestQueue.close()
    }
  } finally {
    if (yield cancelled()) {
      yield put(transactions.syncStop())
    }
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

    const {
      hash,
      isBalancesFetched,
      isBalancesLoading,
      isTransactionsFetched,
      isTransactionsLoading,
    }: BlockInfo = processingBlock

    if (isBalancesFetched && isTransactionsFetched) {
      if (!currentBlock || (currentBlock.hash !== hash)) {
        yield put(setCurrentBlock(networkId, processingBlock))
      }

      const isProcessingBlockOutdated: boolean = (hash !== latestBlock.hash)
      const isProcessingBlockFinished: boolean = !(isBalancesLoading || isTransactionsLoading)

      if (isProcessingBlockOutdated && isProcessingBlockFinished) {
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
    const schedulerTask: Task<typeof schedulerProcess> = yield fork(schedulerProcess)

    yield take(CLOSE_ASIDE_LAYOUT)

    yield cancel(getBlockTask)
    yield cancel(blockFlowTask)
    yield cancel(schedulerTask)
  }
}

export function* blocksRootSaga(): Saga<void> {
  yield all([
    blockManager(),
  ])
}
