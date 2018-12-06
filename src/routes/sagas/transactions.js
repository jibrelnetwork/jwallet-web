// @flow

import { delay } from 'redux-saga'

import {
  all,
  put,
  call,
  fork,
  take,
  cancel,
  select,
  takeEvery,
} from 'redux-saga/effects'

import type { Task } from 'redux-saga'

import config from 'config'
import blockExplorer from 'services/blockExplorer'

import { selectProcessingBlock } from 'store/selectors/blocks'
import { selectTransactionsByNetworkId } from 'store/selectors/transactions'

import {
  selectDigitalAssets,
  selectActiveDigitalAssets,
} from 'store/selectors/digitalAssets'

import {
  checkETH,
  checkJNT,
} from 'utils/digitalAssets'

import * as blocks from '../modules/blocks'
import * as transactions from '../modules/transactions'

type TransactionMethodName =
  'getETHTransactions' |
  'getERC20Transactions' |
  'getJNTTransactions'

const {
  syncTransactionsTimeout,
  minTransactionsCountToShow,
  maxBlocksPerTransactionsRequest,
  minBlocksPerTransactionsRequest,
} = config

const GENESIS_BLOCK_NUMBER: number = 0

function getMethodName({ address }: DigitalAsset): TransactionMethodName {
  if (checkETH(address)) {
    return 'getETHTransactions'
  } else if (checkJNT(address)) {
    return 'getJNTTransactions'
  }

  return 'getERC20Transactions'
}

function getRequestTransactionsByAssetTask(
  digitalAsset: DigitalAsset,
  fromBlock: number,
  toBlock: number,
): SchedulerTransactionsTask {
  const name: TransactionMethodName = getMethodName(digitalAsset)

  return {
    method: {
      name,
      payload: {
        toBlock,
        fromBlock,
        assetAddress: digitalAsset.address,
        decimals: digitalAsset.decimals,
      },
    },
    module: 'transactions',
    priority: 0,
    retryCount: 3,
  }
}

function* checkTransactionsFetched(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
): Saga<boolean> {
  const itemsByNetworkId: ExtractReturn<typeof selectTransactionsByNetworkId> =
    yield select(selectTransactionsByNetworkId, networkId)

  if (!itemsByNetworkId) {
    return false
  }

  const itemsByOwner: ?TransactionsByOwner = itemsByNetworkId[ownerAddress]

  if (!itemsByOwner) {
    return false
  }

  const fetchedItems: Transactions = Object.keys(itemsByOwner).reduce((
    resultByAssetAddress: Transactions,
    assetAddress: AssetAddress,
  ): Transactions => {
    const itemsByAssetAddress: ?TransactionsByAssetAddress = itemsByOwner[assetAddress]

    if (!itemsByAssetAddress) {
      return resultByAssetAddress
    }

    const result: Transactions = Object.keys(itemsByAssetAddress).reduce((
      resultByBlockNumber: Transactions,
      blockNumber: BlockNumber,
    ): Transactions => {
      const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress[blockNumber]

      if (!itemsByBlockNumber) {
        return resultByBlockNumber
      }

      const { items }: TransactionsByBlockNumber = itemsByBlockNumber

      if (!items) {
        return resultByBlockNumber
      }

      return {
        ...items,
        ...resultByBlockNumber,
      }
    }, {})

    return {
      ...result,
      ...resultByAssetAddress,
    }
  }, {})

  const fetchedItemsCount: number = Object.keys(fetchedItems).length

  return (fetchedItemsCount >= minTransactionsCountToShow)
}

function* checkTransactionsLoading(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
): Saga<boolean> {
  const itemsByNetworkId: ExtractReturn<typeof selectTransactionsByNetworkId> =
    yield select(selectTransactionsByNetworkId, networkId)

  if (!itemsByNetworkId) {
    return true
  }

  const itemsByOwner: ?TransactionsByOwner = itemsByNetworkId[ownerAddress]

  if (!itemsByOwner) {
    return true
  }

  const isLoading: boolean = Object.keys(itemsByOwner).reduce((
    resultByAssetAddress: boolean,
    assetAddress: AssetAddress,
  ): boolean => {
    // return true if already true
    if (resultByAssetAddress) {
      return true
    }

    const itemsByAssetAddress: ?TransactionsByAssetAddress = itemsByOwner[assetAddress]

    // return true if items was not found by existed key
    if (!itemsByAssetAddress) {
      return true
    }

    // return result of iterating by addresses of assets
    return Object.keys(itemsByAssetAddress).reduce((
      resultByBlockNumber: boolean,
      blockNumber: BlockNumber,
    ): boolean => {
      // return true if already true
      if (resultByBlockNumber) {
        return true
      }

      const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress[blockNumber]

      // return true if items was not found by existed key
      if (!itemsByBlockNumber) {
        return true
      }

      // return true if items don't exist
      return !itemsByBlockNumber.items
    }, false)
  }, false)

  return isLoading
}

function* syncProcessingBlockStatus(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
): Saga<void> {
  try {
    while (true) {
      const processingBlock: ExtractReturn<typeof selectProcessingBlock> =
        yield select(selectProcessingBlock, networkId)

      if (!processingBlock) {
        yield call(delay, 1000)
        continue
      }

      const {
        isTransactionsFetched,
        isTransactionsLoading,
      }: BlockData = processingBlock

      const isFetched: boolean = yield* checkTransactionsFetched(networkId, ownerAddress)

      if (!isTransactionsFetched && isFetched) {
        yield put(blocks.setIsTransactionsFetched(networkId, true))
      }

      const isLoading: boolean = yield* checkTransactionsLoading(networkId, ownerAddress)

      if (isTransactionsLoading && !isLoading) {
        yield put(blocks.setIsTransactionsFetched(networkId, true))
        yield put(blocks.setIsTransactionsLoading(networkId, false))
      }

      yield call(delay, syncTransactionsTimeout)
    }
  } finally {
    //
  }
}

function* fetchByOwnerRequest(
  action: ExtractReturn<typeof transactions.fetchByOwnerRequest>,
): Saga<void> {
  const {
    requestQueue,
    networkId,
    ownerAddress,
    toBlock,
    fromBlock,
  } = action.payload

  const activeAssets: DigitalAsset[] = yield select(selectActiveDigitalAssets)

  yield all(activeAssets.map((digitalAsset: DigitalAsset) => put(transactions.initItemsByAsset(
    networkId,
    ownerAddress,
    digitalAsset.address,
  ))))

  yield all(activeAssets.map((digitalAsset: DigitalAsset) => {
    const task: SchedulerTransactionsTask = getRequestTransactionsByAssetTask(
      digitalAsset,
      fromBlock,
      toBlock,
    )

    return put(requestQueue, task)
  }))

  /**
   * Init processing block statuses of loading/fetched flags of transactions
   * After that start syncing:
   * - set fetched flag to true, if we have min count of transactions to display for user
   * - set loading flag to false, if transactions are fully fetched
   * (there are could be some failed responses, that will be fetched later)
   *
   * When loading flags of balances & transactions set to false, processing block will be changed
   */

  yield put(blocks.setIsTransactionsLoading(networkId, true))
  yield put(blocks.setIsTransactionsFetched(networkId, false))

  const syncProcessingBlockStatusTask: Task<typeof syncProcessingBlockStatus> = yield fork(
    syncProcessingBlockStatus,
    networkId,
    ownerAddress,
  )

  yield take(blocks.SET_PROCESSING_BLOCK)
  yield cancel(syncProcessingBlockStatusTask)
}

function getBlockNumberFromFetch(
  transactionsByAssetAddress: TransactionsByAssetAddress,
  toBlock: number,
): number {
  if (!transactionsByAssetAddress) {
    return 0
  }

  const fromBlock: number = Object.keys(transactionsByAssetAddress).reduce((
    result: number,
    blockNumber: BlockNumber,
  ) => {
    const currentBlockNumber: number = parseInt(blockNumber, 10) || GENESIS_BLOCK_NUMBER

    // need to get the biggest block number
    const isBigger: boolean = (currentBlockNumber > result)

    // block number should be less than toBlock number
    const isValid: boolean = (currentBlockNumber < toBlock)

    // return result if current block number less than previous or invalid
    if (!(isBigger && isValid)) {
      return result
    }

    // return current block number because at this point it is suitable
    return currentBlockNumber
  }, 0)

  return fromBlock
}

function getLastExistedBlockNumberByAsset(
  itemsByAssetAddress: TransactionsByAssetAddress,
): number {
  return Object.keys(itemsByAssetAddress).reduce((
    result: number,
    blockNumber: BlockNumber,
  ) => {
    const currentBlockNumber: number = parseInt(blockNumber, 10) || GENESIS_BLOCK_NUMBER

    // need to get the lowest block number
    const isLower: boolean = (currentBlockNumber < result)

    // return result if current block number bigger than previous
    if (!isLower) {
      return result
    }

    const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress[blockNumber]

    if (!itemsByBlockNumber) {
      return result
    }

    const {
      items,
      isError,
    }: TransactionsByBlockNumber = itemsByBlockNumber

    if (!isError && items) {
      return currentBlockNumber
    }

    return result
  }, 0)
}

function getTasksToRefetchByAsset(
  digitalAsset: DigitalAsset,
  itemsByAssetAddress: TransactionsByAssetAddress,
): SchedulerTransactionsTask[] {
  return Object.keys(itemsByAssetAddress).reduce((
    resultByBlockNumber: SchedulerTransactionsTask[],
    blockNumber: BlockNumber,
  ): SchedulerTransactionsTask[] => {
    const currentBlockNumber: number = parseInt(blockNumber, 10) || GENESIS_BLOCK_NUMBER
    const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress[blockNumber]

    const fromBlockNumber: number = getBlockNumberFromFetch(
      itemsByAssetAddress,
      currentBlockNumber,
    )

    const resultByBlockNumberNew: SchedulerTransactionsTask[] = [
      ...resultByBlockNumber,
      getRequestTransactionsByAssetTask(digitalAsset, fromBlockNumber, currentBlockNumber),
    ]

    if (!itemsByBlockNumber) {
      return resultByBlockNumberNew
    }

    const {
      items,
      isError,
    }: TransactionsByBlockNumber = itemsByBlockNumber

    if (items && !isError) {
      return resultByBlockNumber
    }

    return resultByBlockNumberNew
  }, [])
}

function getTasksToRefetchByOwner(
  digitalAssets: DigitalAssets,
  itemsByOwner: TransactionsByOwner,
  latestBlockNumber: number,
): SchedulerTransactionsTask[] {
  return Object.keys(itemsByOwner).reduce((
    resultByAssetAddress: SchedulerTransactionsTask[],
    assetAddress: AssetAddress,
  ): SchedulerTransactionsTask[] => {
    const itemsByAssetAddress: ?TransactionsByAssetAddress = itemsByOwner[assetAddress]
    const digitalAsset: ?DigitalAsset = digitalAssets[assetAddress]

    if (!digitalAsset) {
      return resultByAssetAddress
    }

    const fullyResyncTask: SchedulerTransactionsTask = getRequestTransactionsByAssetTask(
      digitalAsset,
      GENESIS_BLOCK_NUMBER,
      latestBlockNumber,
    )

    if (!itemsByAssetAddress) {
      return [
        ...resultByAssetAddress,
        fullyResyncTask,
      ]
    }

    const failedRequests: SchedulerTransactionsTask[] = getTasksToRefetchByAsset(
      digitalAsset,
      itemsByAssetAddress,
    )

    const lastExistedBlock: number = getLastExistedBlockNumberByAsset(itemsByAssetAddress)

    if (!lastExistedBlock) {
      return [
        ...failedRequests,
        fullyResyncTask,
      ]
    }

    if (lastExistedBlock > maxBlocksPerTransactionsRequest) {
      return [
        ...failedRequests,
        getRequestTransactionsByAssetTask(digitalAsset, GENESIS_BLOCK_NUMBER, lastExistedBlock),
      ]
    }

    return failedRequests
  }, [])
}

function* refetchByOwnerRequest(
  action: ExtractReturn<typeof transactions.refetchByOwnerRequest>,
): Saga<void> {
  const {
    // requestQueue,
    networkId,
    ownerAddress,
    toBlock,
  } = action.payload

  const itemsByNetworkId: ExtractReturn<typeof selectTransactionsByNetworkId> =
    yield select(selectTransactionsByNetworkId, networkId)

  if (!itemsByNetworkId) {
    return
  }

  const itemsByOwner: ?TransactionsByOwner = itemsByNetworkId[ownerAddress]

  if (!itemsByOwner) {
    return
  }

  const digitalAssets: ExtractReturn<typeof selectDigitalAssets> =
    yield select(selectDigitalAssets)

  const tasksToRefetch: SchedulerTransactionsTask[] = getTasksToRefetchByOwner(
    digitalAssets,
    itemsByOwner,
    toBlock,
  )

  console.error(tasksToRefetch)

  // yield all(tasksToRefetch.map((task: SchedulerTransactionsTask) => put(requestQueue, task)))
}

function* recursiveRequestTransactions(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  fromBlock: number,
  toBlock: number,
): Saga<void> {
  const { method } = task

  switch (method.name) {
    case 'getETHTransactions':
    case 'getERC20Transactions':
    case 'getJNTTransactions': {
      const diffBlockNumber: number = toBlock - fromBlock

      const fromBlockNew = (diffBlockNumber > maxBlocksPerTransactionsRequest)
        ? (toBlock - maxBlocksPerTransactionsRequest)
        : fromBlock

      yield* requestTransactionsByRange(requestQueue, task, fromBlock, toBlock)

      if (fromBlockNew > 0) {
        yield* recursiveRequestTransactions(
          requestQueue,
          task,
          fromBlockNew - maxBlocksPerTransactionsRequest,
          toBlock - maxBlocksPerTransactionsRequest,
        )
      }

      break
    }

    default:
      break
  }
}

function* requestTransactionsByRange(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  fromBlock: number,
  toBlock: number,
): Saga<void> {
  const { method } = task

  switch (method.name) {
    case 'getETHTransactions':
    case 'getERC20Transactions':
    case 'getJNTTransactions': {
      const diffBlockNumber: number = toBlock - fromBlock

      // just break if diff bigger than max
      if (diffBlockNumber > maxBlocksPerTransactionsRequest) {
        break
      }

      yield put(requestQueue, {
        ...task,
        method: {
          ...task.method,
          payload: {
            ...method.payload,
            toBlock,
            fromBlock,
          },
        },
      })

      break
    }

    default:
      break
  }
}

export function* requestTransactions(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
): Saga<void> {
  const {
    name,
    payload,
  } = task.method

  const {
    toBlock,
    fromBlock,
  } = payload

  const toBlockStr: BlockNumber = toBlock.toString()

  switch (name) {
    case 'getETHTransactions': {
      if ((toBlock - fromBlock) > maxBlocksPerTransactionsRequest) {
        yield* recursiveRequestTransactions(requestQueue, task, fromBlock, toBlock)
        break
      }

      yield put(transactions.initItemsByBlock(networkId, ownerAddress, 'Ethereum', toBlockStr))

      try {
        const txs: Transactions = yield call(
          blockExplorer.getETHTransactions,
          networkId,
          ownerAddress,
          fromBlock,
          toBlock,
        )

        yield put(transactions.fetchByBlockSuccess(
          networkId,
          ownerAddress,
          'Ethereum',
          toBlockStr,
          txs,
        ))
      } catch (err) {
        if ((toBlock - fromBlock) < minBlocksPerTransactionsRequest) {
          yield put(transactions.fetchByBlockError(networkId, ownerAddress, 'Ethereum', toBlockStr))
          throw err
        }

        const mediumBlock: number = Math.round(toBlock / 2)

        yield* requestTransactionsByRange(requestQueue, task, fromBlock, mediumBlock)
        yield* requestTransactionsByRange(requestQueue, task, mediumBlock, toBlock)
      }

      break
    }

    case 'getERC20Transactions': {
      // simulate api call
      yield call(delay, 1000)

      yield put(transactions.fetchByBlockSuccess(
        networkId,
        ownerAddress,
        payload.assetAddress,
        toBlockStr,
        {},
      ))

      break
    }

    case 'getJNTTransactions': {
      // simulate api call
      yield call(delay, 1000)

      yield put(transactions.fetchByBlockSuccess(
        networkId,
        ownerAddress,
        payload.assetAddress,
        toBlockStr,
        {},
      ))

      break
    }

    default:
      break
  }
}

export function* transactionsRootSaga(): Saga<void> {
  yield takeEvery(transactions.FETCH_BY_OWNER_REQUEST, fetchByOwnerRequest)
  yield takeEvery(transactions.REFETCH_BY_OWNER_REQUEST, refetchByOwnerRequest)
}
