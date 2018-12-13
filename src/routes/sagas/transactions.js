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
import filterLoadingTransactions from 'utils/transactions/filterLoadingTransactions'
import { selectProcessingBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import { selectTransactionsByNetworkId } from 'store/selectors/transactions'

import {
  web3,
  blockExplorer,
} from 'services'

import {
  checkETH,
  checkJNT,
} from 'utils/digitalAssets'

import {
  selectDigitalAssets,
  selectActiveDigitalAssets,
} from 'store/selectors/digitalAssets'

import * as blocks from '../modules/blocks'
import * as transactions from '../modules/transactions'

const {
  syncTransactionsTimeout,
  minTransactionsCountToShow,
  maxBlocksPerTransactionsRequest,
  minBlocksPerTransactionsRequest,
} = config

const GENESIS_BLOCK_NUMBER: number = 0

function getRequestTransactionTasks(
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  transaction: Transaction,
  transactionId: TransactionId,
): SchedulerTransactionTask[] {
  const {
    data,
    blockData,
    receiptData,
    hash,
    blockHash,
  }: Transaction = transaction

  if (!blockHash) {
    return []
  }

  const getDataMethod: GetTransactionMethod = {
    name: 'getTransactionData',
    payload: {
      hash,
      blockNumber,
      assetAddress,
      transactionId,
    },
  }

  const getDataTask: SchedulerTransactionTask = {
    method: getDataMethod,
    module: 'transaction',
    priority: 0,
    retryCount: 3,
  }

  const getReceiptDataTask: SchedulerTransactionTask = {
    ...getDataTask,
    method: {
      ...getDataMethod,
      name: 'getTransactionReceiptData',
    },
  }

  const getBlockDataTask: SchedulerTransactionTask = {
    ...getDataTask,
    method: {
      ...getDataMethod,
      name: 'getBlockData',
      payload: {
        ...getDataMethod.payload,
        hash: blockHash,
      },
    },
  }

  return [
    data ? null : getDataTask,
    blockData ? null : getBlockDataTask,
    receiptData ? null : getReceiptDataTask,
  ].reduce((
    result: SchedulerTransactionTask[],
    task: ?SchedulerTransactionTask,
  ): SchedulerTransactionTask[] => (!task ? result : [
    ...result,
    task,
  ]), [])
}

function getRequestTransactionsByAssetTasks(
  assetAddress: AssetAddress,
  fromBlock: number,
  toBlock: number,
): SchedulerTransactionsTask[] {
  const baseTaskMethod: GetTransactionsMethod = {
    name: 'getETHTransactions',
    payload: {
      assetAddress,
      toBlock,
      fromBlock,
    },
  }

  const baseTask: SchedulerTransactionsTask = {
    method: baseTaskMethod,
    module: 'transactions',
    priority: 0,
    retryCount: 3,
  }

  if (checkETH(assetAddress)) {
    return [baseTask]
  }

  const transferTasks: SchedulerTransactionsTask[] = [{
    ...baseTask,
    method: {
      ...baseTaskMethod,
      name: 'getTransferEventsTo',
    },
  }, {
    ...baseTask,
    method: {
      ...baseTaskMethod,
      name: 'getTransferEventsFrom',
    },
  }]

  if (checkJNT(assetAddress)) {
    const mintableTasks: SchedulerTransactionsTask[] = [{
      ...baseTask,
      method: {
        ...baseTaskMethod,
        name: 'getMintEvents',
      },
    }, {
      ...baseTask,
      method: {
        ...baseTaskMethod,
        name: 'getBurnEvents',
      },
    }]

    return [
      ...transferTasks,
      ...mintableTasks,
    ]
  }

  return transferTasks
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

      const itemsFiltered: Transactions = filterLoadingTransactions(items)

      return {
        ...itemsFiltered,
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

      const { items }: TransactionsByBlockNumber = itemsByBlockNumber

      // return true if items don't exist
      if (!items) {
        return true
      }

      const itemsFiltered: Transactions = filterLoadingTransactions(items, true)

      return (Object.keys(itemsFiltered).length !== 0)
    }, false)
  }, false)

  return isLoading
}

function* syncProcessingBlockStatus(): Saga<void> {
  try {
    while (true) {
      const networkId: ExtractReturn<typeof selectCurrentNetworkId> =
        yield select(selectCurrentNetworkId)

      const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
        yield select(selectActiveWalletAddress)

      const processingBlock: ExtractReturn<typeof selectProcessingBlock> =
        yield select(selectProcessingBlock, networkId)

      if (!(networkId && ownerAddress)) {
        return
      }

      if (!processingBlock) {
        yield call(delay, config.processingBlockWaitTimeout)
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

  yield all(activeAssets.reduce((
    result: SchedulerTransactionsTask[],
    digitalAsset: DigitalAsset,
  ) => ([
    ...result,
    ...getRequestTransactionsByAssetTasks(digitalAsset.address, fromBlock, toBlock),
  ]), []).map((task: SchedulerTransactionsTask) => put(requestQueue, task)))

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

  const syncProcessingBlockStatusTask: Task<typeof syncProcessingBlockStatus> =
    yield fork(syncProcessingBlockStatus)

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
      ...getRequestTransactionsByAssetTasks(
        digitalAsset.address,
        fromBlockNumber,
        currentBlockNumber,
      ),
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

    const fullyResyncTasks: SchedulerTransactionsTask[] = getRequestTransactionsByAssetTasks(
      digitalAsset.address,
      GENESIS_BLOCK_NUMBER,
      latestBlockNumber,
    )

    if (!itemsByAssetAddress) {
      return [
        ...resultByAssetAddress,
        ...fullyResyncTasks,
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
        ...fullyResyncTasks,
      ]
    }

    if (lastExistedBlock > maxBlocksPerTransactionsRequest) {
      return [
        ...failedRequests,
        ...getRequestTransactionsByAssetTasks(
          digitalAsset.address,
          GENESIS_BLOCK_NUMBER,
          lastExistedBlock,
        ),
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
  if (toBlock < 0) {
    return
  }

  const diffBlockNumber: number = toBlock - fromBlock

  const fromBlockNew = (diffBlockNumber > maxBlocksPerTransactionsRequest)
    ? (toBlock - maxBlocksPerTransactionsRequest)
    : fromBlock

  const fromBlockSafety: number = (fromBlockNew < 0) ? 0 : fromBlockNew

  yield* requestTransactionsByRange(requestQueue, task, fromBlockSafety, toBlock)

  if (fromBlockNew > 0) {
    yield* recursiveRequestTransactions(
      requestQueue,
      task,
      fromBlockNew - maxBlocksPerTransactionsRequest,
      toBlock - maxBlocksPerTransactionsRequest,
    )
  }
}

function* requestTransactionsByRange(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  fromBlock: number,
  toBlock: number,
): Saga<void> {
  const { method } = task
  const diffBlockNumber: number = toBlock - fromBlock

  // just return if diff bigger than max
  if (diffBlockNumber > maxBlocksPerTransactionsRequest) {
    return
  }

  yield put(requestQueue, {
    ...task,
    method: {
      ...task.method,
      payload: {
        ...method.payload,
        toBlock,
        fromBlock: (fromBlock < 0) ? 0 : fromBlock,
      },
    },
  })
}

export function* requestTransaction(
  task: SchedulerTransactionTask,
  network: Network,
  ownerAddress: OwnerAddress,
): Saga<void> {
  const networkId: NetworkId = network.id

  const {
    name,
    payload,
  } = task.method

  const {
    hash,
    blockNumber,
    assetAddress,
    transactionId,
  } = payload

  switch (name) {
    case 'getBlockData': {
      const data: TransactionBlockData = yield call(web3.getBlockData, network, hash)

      yield put(transactions.updateTransactionData(
        networkId,
        ownerAddress,
        assetAddress,
        blockNumber,
        transactionId,
        { blockData: data },
      ))

      break
    }

    case 'getTransactionData': {
      const data: TransactionData = yield call(web3.getTransactionData, network, hash)

      yield put(transactions.updateTransactionData(
        networkId,
        ownerAddress,
        assetAddress,
        blockNumber,
        transactionId,
        { data },
      ))

      break
    }

    case 'getTransactionReceiptData': {
      const data: TransactionReceiptData = yield call(web3.getTransactionReceiptData, network, hash)

      yield put(transactions.updateTransactionData(
        networkId,
        ownerAddress,
        assetAddress,
        blockNumber,
        transactionId,
        { receiptData: data },
      ))

      break
    }

    default:
      break
  }
}

function* fetchEventsData(
  requestQueue: Channel,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  txs: Transactions,
): Saga<void> {
  yield all(Object.keys(txs).reduce((
    result: SchedulerTransactionTask[],
    transactionId: TransactionId,
  ): SchedulerTransactionTask[] => {
    const currentTx: ?Transaction = txs[transactionId]

    if (!currentTx) {
      return result
    }

    return [
      ...result,
      ...getRequestTransactionTasks(assetAddress, blockNumber, currentTx, transactionId),
    ]
  }, []).map((task: SchedulerTransactionTask) => put(requestQueue, task)))
}

export function* requestTransactions(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  network: Network,
  ownerAddress: OwnerAddress,
): Saga<void> {
  const networkId: NetworkId = network.id

  const {
    method,
    retryCount,
  } = task

  const {
    name,
    payload,
  } = method

  const {
    toBlock,
    fromBlock,
    assetAddress,
  } = payload

  const toBlockStr: BlockNumber = toBlock.toString()

  if ((toBlock - fromBlock) > maxBlocksPerTransactionsRequest) {
    yield* recursiveRequestTransactions(requestQueue, task, fromBlock, toBlock)

    return
  }

  yield put(transactions.initItemsByBlock(networkId, ownerAddress, assetAddress, toBlockStr))

  try {
    switch (name) {
      case 'getETHTransactions': {
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
          assetAddress,
          toBlockStr,
          txs,
        ))

        break
      }

      case 'getTransferEventsTo': {
        const txs: Transactions = yield call(
          web3.getTransferEventsTo,
          network,
          assetAddress,
          ownerAddress,
          fromBlock,
          toBlock,
        )

        yield put(transactions.fetchByBlockSuccess(
          networkId,
          ownerAddress,
          assetAddress,
          toBlockStr,
          txs,
        ))

        yield* fetchEventsData(requestQueue, assetAddress, toBlockStr, txs)

        break
      }

      case 'getTransferEventsFrom': {
        const txs: Transactions = yield call(
          web3.getTransferEventsFrom,
          network,
          assetAddress,
          ownerAddress,
          fromBlock,
          toBlock,
        )

        yield put(transactions.fetchByBlockSuccess(
          networkId,
          ownerAddress,
          assetAddress,
          toBlockStr,
          txs,
        ))

        yield* fetchEventsData(requestQueue, assetAddress, toBlockStr, txs)

        break
      }

      case 'getMintEvents': {
        const txs: Transactions = yield call(
          web3.getMintEvents,
          network,
          assetAddress,
          ownerAddress,
          fromBlock,
          toBlock,
        )

        yield put(transactions.fetchByBlockSuccess(
          networkId,
          ownerAddress,
          assetAddress,
          toBlockStr,
          txs,
        ))

        yield* fetchEventsData(requestQueue, assetAddress, toBlockStr, txs)

        break
      }

      case 'getBurnEvents': {
        const txs: Transactions = yield call(
          web3.getBurnEvents,
          network,
          assetAddress,
          ownerAddress,
          fromBlock,
          toBlock,
        )

        yield put(transactions.fetchByBlockSuccess(
          networkId,
          ownerAddress,
          assetAddress,
          toBlockStr,
          txs,
        ))

        yield* fetchEventsData(requestQueue, assetAddress, toBlockStr, txs)

        break
      }

      default:
        break
    }
  } catch (err) {
    if (retryCount && (retryCount > 0)) {
      throw err
    }

    if ((toBlock - fromBlock) < minBlocksPerTransactionsRequest) {
      yield put(transactions.fetchByBlockError(
        networkId,
        ownerAddress,
        assetAddress,
        toBlockStr,
      ))
    }

    const mediumBlock: number = Math.round(toBlock / 2)

    yield* requestTransactionsByRange(requestQueue, task, fromBlock, mediumBlock)
    yield* requestTransactionsByRange(requestQueue, task, mediumBlock, toBlock)
  }
}

export function* transactionsRootSaga(): Saga<void> {
  yield takeEvery(transactions.FETCH_BY_OWNER_REQUEST, fetchByOwnerRequest)
  yield takeEvery(transactions.REFETCH_BY_OWNER_REQUEST, refetchByOwnerRequest)
}
