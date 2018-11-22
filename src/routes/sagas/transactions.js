// @flow

import { delay } from 'redux-saga'
import { all, put, call, fork, take, cancel, select, takeEvery } from 'redux-saga/effects'

import type { Task, Channel } from 'redux-saga'

import config from 'config'
import blockExplorer from 'services/blockExplorer'
import checkTransactionLoading from 'utils/transactions/checkTransactionLoading'
import { selectProcessingBlock } from 'store/selectors/blocks'
import { selectTransactions } from 'store/selectors/transactions'
import { selectDigitalAssets } from 'store/selectors/digitalAssets'
import { checkETH, checkJNT, flattenDigitalAssets } from 'utils/digitalAssets'

import * as blocks from '../modules/blocks'
import * as transactions from '../modules/transactions'

type TransactionMethodName =
  'getETHTransactions' |
  'getERC20Transactions' |
  'getJNTTransactions'

const MAX_BLOCKS_PER_REQUEST: number = 100 * 1000

function getMethodName({ address }: DigitalAsset): TransactionMethodName {
  if (checkETH(address)) {
    return 'getETHTransactions'
  } else if (checkJNT(address)) {
    return 'getJNTTransactions'
  }

  return 'getERC20Transactions'
}

function getTask(
  digitalAsset: DigitalAsset,
  owner: Address,
  networkId: NetworkId,
  fromBlock: number,
  toBlock: number,
): SchedulerTask {
  const name: TransactionMethodName = getMethodName(digitalAsset)

  return {
    method: {
      name,
      payload: {
        owner,
        networkId,
        toBlock,
        fromBlock,
        asset: digitalAsset.address,
        decimals: digitalAsset.decimals,
      },
    },
    module: 'transactions',
    priority: 0,
    retryCount: 3,
  }
}

export function* scheduleRequestsTransactions(
  requestQueue: Channel,
  networkId: NetworkId,
  owner: Address,
  fromBlock: number,
  toBlock: number,
): Saga<void> {
  try {
    const digitalAssets: ExtractReturn<typeof selectDigitalAssets> =
      yield select(selectDigitalAssets)

    const digitalAssetsFlattened: DigitalAsset[] = flattenDigitalAssets(digitalAssets)

    yield all(digitalAssetsFlattened
      .filter(({ isActive }: DigitalAsset): boolean => !!isActive)
      .map((digitalAsset: DigitalAsset) => {
        const task: SchedulerTask = getTask(
          digitalAsset,
          owner,
          networkId,
          fromBlock,
          toBlock,
        )

        return put(requestQueue, task)
      })
    )

    yield put(blocks.setIsTransactionsLoading(networkId, true))
    yield put(blocks.setIsTransactionsFetched(networkId, false))

    while (true) {
      yield call(delay, 10000)

      const processingBlock: ExtractReturn<typeof selectProcessingBlock> =
        yield select(selectProcessingBlock, networkId)

      if (!processingBlock) {
        return
      }

      const {
        isTransactionsFetched,
        isTransactionsLoading,
      }: BlockInfo = processingBlock

      const isFetched: boolean = yield* checkFetchedTransactions(owner, networkId)

      if (!isTransactionsFetched && isFetched) {
        yield put(blocks.setIsTransactionsFetched(networkId, true))
      }

      const isLoading: boolean = yield* checkLoadingTransactions(owner, networkId)

      if (isTransactionsLoading && !isLoading) {
        yield put(blocks.setIsTransactionsFetched(networkId, true))
        yield put(blocks.setIsTransactionsLoading(networkId, false))
      }
    }
  } finally {
    //
  }
}

function getLoadingTransactions(txs: Transactions): Transactions {
  return Object.keys(txs).reduce((result: Transactions, hash: Hash): Transactions => {
    const tx: ?Transaction = txs[hash]

    return !(tx && checkTransactionLoading(tx)) ? result : {
      ...result,
      [hash]: tx,
    }
  }, {})
}

function getFetchedTransactions(txs: Transactions): Transactions {
  return Object.keys(txs).reduce((result: Transactions, hash: Hash): Transactions => {
    const tx: ?Transaction = txs[hash]

    return (!tx || checkTransactionLoading(tx)) ? result : {
      ...result,
      [hash]: tx,
    }
  }, {})
}

function* checkLoadingTransactions(networkId: NetworkId, owner: Address): Saga<boolean> {
  const { persist }: ExtractReturn<typeof selectTransactions> = yield select(selectTransactions)
  const itemsByNetworkId = persist.items[networkId]

  if (!itemsByNetworkId) {
    return false
  }

  const itemsByOwner = itemsByNetworkId[owner]

  if (!itemsByOwner) {
    return false
  }

  const assetAddresses: Array<AssetAddress> = Object.keys(itemsByOwner)

  const txs: Transactions = assetAddresses
    .reduce((result: Transactions, asset: AssetAddress): Transactions => {
      const itemsByAsset = itemsByOwner[asset]

      if (!itemsByAsset) {
        return result
      }

      return {
        ...result,
        ...getLoadingTransactions(itemsByAsset),
      }
    }, {})

  const isLoading: boolean = (Object.keys(txs).length === 0)

  return isLoading
}

function* checkFetchedTransactions(networkId: NetworkId, owner: Address): Saga<boolean> {
  const { persist }: ExtractReturn<typeof selectTransactions> = yield select(selectTransactions)
  const itemsByNetworkId = persist.items[networkId]

  if (!itemsByNetworkId) {
    return false
  }

  const itemsByOwner = itemsByNetworkId[owner]

  if (!itemsByOwner) {
    return false
  }

  const assetAddresses: Array<AssetAddress> = Object.keys(itemsByOwner)

  const txs: Transactions = assetAddresses
    .reduce((result: Transactions, asset: AssetAddress): Transactions => {
      const itemsByAsset = itemsByOwner[asset]

      if (!itemsByAsset) {
        return result
      }

      return {
        ...result,
        ...getFetchedTransactions(itemsByAsset),
      }
    }, {})

  const foundCount: number = Object.keys(txs).length

  return (foundCount >= config.minTransactionsCountToShow)
}

function* recursiveRequestTransactions(
  task: SchedulerTask,
  requestQueue: Channel,
  fromBlock: number,
  toBlock: number,
): Saga<void> {
  const {
    payload,
    name,
  } = task.method

  switch (name) {
    case 'getETHTransactions':
    case 'getERC20Transactions':
    case 'getJNTTransactions': {
      const diffBlockNumber: number = toBlock - fromBlock

      const fromBlockNew = (diffBlockNumber > MAX_BLOCKS_PER_REQUEST)
        ? (toBlock - MAX_BLOCKS_PER_REQUEST)
        : fromBlock

      yield put(requestQueue, {
        ...task,
        method: {
          ...task.method,
          payload: {
            ...payload,
            toBlock,
            fromBlock: (fromBlockNew <= 0) ? 0 : fromBlockNew,
          },
        },
      })

      if (fromBlockNew > 0) {
        yield call(delay, 1000)

        yield* recursiveRequestTransactions(
          task,
          requestQueue,
          fromBlockNew - MAX_BLOCKS_PER_REQUEST,
          toBlock - MAX_BLOCKS_PER_REQUEST,
        )
      }

      break
    }

    default:
      break
  }
}

export function* requestTransactions(
  task: SchedulerTask,
  requestQueue: Channel,
): Saga<void> {
  const { method } = task

  switch (method.name) {
    case 'getETHTransactions': {
      const {
        owner,
        networkId,
        fromBlock,
        toBlock,
      } = method.payload

      if ((toBlock - fromBlock) > MAX_BLOCKS_PER_REQUEST) {
        yield recursiveRequestTransactions(task, requestQueue, fromBlock, toBlock)
        break
      }

      const txs: Transactions = yield call(
        blockExplorer.getETHTransactions,
        networkId,
        owner,
        fromBlock,
        toBlock,
      )

      const isEmpty: boolean = !Object.keys(txs).length

      if (!isEmpty) {
        yield put(transactions.setItems(networkId, owner, 'Ethereum', txs))
      }

      break
    }

    case 'getERC20Transactions': {
      // simulate api call
      yield call(delay, 1000)
      break
    }

    default: {
      // currently JNT here
      yield call(delay, 1000)
      console.log(task)
      break
    }
  }
}

export function* syncStart(action: ExtractReturn<typeof transactions.syncStart>): Saga<void> {
  const {
    requestQueue,
    currentBlock,
    processingBlock,
    owner,
    networkId,
  } = action.payload

  const currentBlockNumber: number = currentBlock ? currentBlock.number : 0

  const requestTransactionsTask: Task<typeof scheduleRequestsTransactions> = yield fork(
    scheduleRequestsTransactions,
    requestQueue,
    networkId,
    owner,
    currentBlockNumber,
    processingBlock.number,
  )

  yield take(transactions.SYNC_STOP)
  yield cancel(requestTransactionsTask)
}

export function* transactionsRootSaga(): Saga<void> {
  yield takeEvery(transactions.SYNC_START, syncStart)
}
