// @flow

import { t } from 'ttag'
import {
  delay,
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
  takeEvery,
} from 'redux-saga/effects'

import config from 'config'
import { selectProcessingBlock } from 'store/selectors/blocks'
import { selectCurrentNetworkId } from 'store/selectors/networks'

import {
  web3,
  blockExplorer,
} from 'services'

import {
  flattenTransactions,
  checkTransactionLoading,
  flattenTransactionsByOwner,
  checkTransactionsByOwnerLoading,
  getLastExistedBlockNumberByAsset,
} from 'utils/transactions'

import {
  checkETH,
  checkJNT,
  flattenDigitalAssets,
  getDigitalAssetByAddress,
} from 'utils/digitalAssets'

import {
  selectActiveWallet,
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectTransactionById,
  selectTransactionsByOwner,
  selectPendingTransactionByHash,
} from 'store/selectors/transactions'

import {
  selectDigitalAssetsItems,
  selectActiveDigitalAssets,
} from 'store/selectors/digitalAssets'

import * as blocks from '../modules/blocks'
import * as transactions from '../modules/transactions'

const {
  syncTransactionsTimeout,
  resyncTransactionsTimeout,
  processingBlockWaitTimeout,
  maxBlocksPerTransactionsRequest,
  minBlocksPerTransactionsRequest,
} = config

const GENESIS_BLOCK_NUMBER: number = 0

function getRequestTransactionTasks(
  transaction: TransactionWithPrimaryKeys,
): SchedulerTransactionTask[] {
  const {
    keys,
    data,
    blockData,
    receiptData,
    hash,
    blockHash,
  }: TransactionWithPrimaryKeys = transaction

  const {
    id,
    blockNumber,
    assetAddress,
  } = keys

  if (!blockHash) {
    return []
  }

  const getDataMethod: GetTransactionMethod = {
    name: 'getTransactionData',
    payload: {
      hash,
      blockNumber,
      assetAddress,
      transactionId: id,
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
  minBlock: ?number,
  isJNT: boolean,
): SchedulerTransactionsTask[] {
  const baseTaskMethod: GetTransactionsMethod = {
    name: 'getETHTransactions',
    payload: {
      assetAddress,
      toBlock,
      fromBlock,
      minBlock: minBlock || GENESIS_BLOCK_NUMBER,
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

  if (isJNT) {
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

function getTransactionsByOwnerForActiveAssets(
  itemsByOwner: ?TransactionsByOwner,
  activeAssets: DigitalAsset[],
): ?TransactionsByOwner {
  if (!itemsByOwner) {
    return null
  }

  return Object
    .keys(itemsByOwner)
    .reduce((result: TransactionsByOwner, assetAddress: AssetAddress): TransactionsByOwner => {
      const activeAsset: ?DigitalAsset = getDigitalAssetByAddress(activeAssets, assetAddress)

      if (!activeAsset) {
        return result
      }

      return {
        ...result,
        [assetAddress]: itemsByOwner ? itemsByOwner[assetAddress] : null,
      }
    }, {})
}

function* checkTransactionsFetched(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  activeAssets: DigitalAsset[],
): Saga<boolean> {
  const itemsByOwner: ExtractReturn<typeof selectTransactionsByOwner> =
    yield select(selectTransactionsByOwner, networkId, ownerAddress)

  const itemsByOwnerForActiveAssets: ?TransactionsByOwner = getTransactionsByOwnerForActiveAssets(
    itemsByOwner,
    activeAssets,
  )

  const flatten: TransactionWithPrimaryKeys[] =
    flattenTransactionsByOwner(itemsByOwnerForActiveAssets)

  return !!flatten.length
}

function* getWalletCreatedBlockNumber(): Saga<void> {
  const wallet: ExtractReturn<typeof selectActiveWallet> = yield select(selectActiveWallet)

  if (!wallet) {
    throw new Error(t`ActiveWalletNotFoundError`)
  }

  /**
   * @TODO
   * check network here and get its name
   */

  const { createdBlockNumber }: Wallet = wallet

  return createdBlockNumber && createdBlockNumber.mainnet
}

function* checkTransactionsLoading(
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  activeAssets: DigitalAsset[],
): Saga<boolean> {
  const itemsByOwner: ExtractReturn<typeof selectTransactionsByOwner> =
    yield select(selectTransactionsByOwner, networkId, ownerAddress)

  const itemsByOwnerForActiveAssets: ?TransactionsByOwner = getTransactionsByOwnerForActiveAssets(
    itemsByOwner,
    activeAssets,
  )

  const walletCreatedBlockNumber: ?number = yield* getWalletCreatedBlockNumber()

  return checkTransactionsByOwnerLoading(
    itemsByOwnerForActiveAssets,
    activeAssets,
    walletCreatedBlockNumber,
  )
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

      const assets: ExtractReturn<typeof selectActiveDigitalAssets> =
        yield select(selectActiveDigitalAssets)

      if (!(networkId && ownerAddress)) {
        return
      }

      if (!processingBlock) {
        yield call(delay, processingBlockWaitTimeout)
        continue
      }

      const {
        isTransactionsFetched,
        isTransactionsLoading,
      }: BlockData = processingBlock

      const isFetched: boolean = yield* checkTransactionsFetched(networkId, ownerAddress, assets)

      if (!isTransactionsFetched && isFetched) {
        yield put(blocks.setIsTransactionsFetched(networkId, true))
      }

      const isLoading: boolean = yield* checkTransactionsLoading(networkId, ownerAddress, assets)

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

  const walletCreatedBlockNumber: ?number = yield* getWalletCreatedBlockNumber()

  const activeAssets: ExtractReturn<typeof selectActiveDigitalAssets> =
    yield select(selectActiveDigitalAssets)

  yield all(activeAssets.map((digitalAsset: DigitalAsset) => put(transactions.initItemsByAsset(
    networkId,
    ownerAddress,
    digitalAsset.blockchainParams.address,
  ))))

  yield all(activeAssets.reduce((
    result: SchedulerTransactionsTask[],
    digitalAsset: DigitalAsset,
  ) => {
    const {
      address,
      deploymentBlockNumber,
    }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

    const isJNT: boolean = checkJNT(address, activeAssets)

    return [
      ...result,
      ...getRequestTransactionsByAssetTasks(
        address,
        fromBlock,
        toBlock,
        walletCreatedBlockNumber || deploymentBlockNumber,
        isJNT,
      ),
    ]
  }, []).map((task: SchedulerTransactionsTask) => put(requestQueue, task)))

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
  latestAvailableBlock: number,
): number {
  const fromBlock: number = Object.keys(transactionsByAssetAddress).reduce((
    result: number,
    blockNumber: BlockNumber,
  ) => {
    const currentBlockNumber: number = parseInt(blockNumber, 10) || GENESIS_BLOCK_NUMBER

    // need to get the biggest block number
    const isBigger: boolean = (currentBlockNumber > result)

    // block number should be less than latestAvailableBlock number
    const isValid: boolean = (currentBlockNumber < latestAvailableBlock)

    // return result if current block number less than previous or invalid
    if (!(isBigger && isValid)) {
      return result
    }

    // return current block number because at this point it is suitable
    return currentBlockNumber
  }, latestAvailableBlock)

  return fromBlock
}

function getTasksToRefetchByAsset(
  digitalAsset: DigitalAsset,
  itemsByAssetAddress: TransactionsByAssetAddress,
  walletCreatedBlockNumber: ?number,
  isJNT: boolean,
): SchedulerTransactionsTask[] {
  const {
    address,
    deploymentBlockNumber,
  }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

  return Object.keys(itemsByAssetAddress).reduce((
    resultByBlockNumber: SchedulerTransactionsTask[],
    blockNumber: BlockNumber,
  ): SchedulerTransactionsTask[] => {
    const currentBlockNumber: number = parseInt(blockNumber, 10) || GENESIS_BLOCK_NUMBER
    const itemsByBlockNumber: ?TransactionsByBlockNumber = itemsByAssetAddress[blockNumber]
    const fromBlockNumber: number = getBlockNumberFromFetch(itemsByAssetAddress, currentBlockNumber)

    const resultByBlockNumberNew: SchedulerTransactionsTask[] = [
      ...resultByBlockNumber,
      ...getRequestTransactionsByAssetTasks(
        address,
        fromBlockNumber,
        currentBlockNumber,
        walletCreatedBlockNumber || deploymentBlockNumber,
        isJNT,
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
  walletCreatedBlockNumber: ?number,
): SchedulerTransactionsTask[] {
  return Object.keys(itemsByOwner).reduce((
    resultByAssetAddress: SchedulerTransactionsTask[],
    assetAddress: AssetAddress,
  ): SchedulerTransactionsTask[] => {
    const itemsByAssetAddress: ?TransactionsByAssetAddress = itemsByOwner[assetAddress]
    const digitalAsset: ?DigitalAsset = digitalAssets[assetAddress]

    if (!(digitalAsset && digitalAsset.isActive)) {
      return resultByAssetAddress
    }

    const {
      address,
      deploymentBlockNumber,
    }: DigitalAssetBlockchainParams = digitalAsset.blockchainParams

    const minBlock: ?number = walletCreatedBlockNumber || deploymentBlockNumber
    const isJNT: boolean = checkJNT(address, flattenDigitalAssets(digitalAssets))

    const fullyResyncTasks: SchedulerTransactionsTask[] = getRequestTransactionsByAssetTasks(
      address,
      GENESIS_BLOCK_NUMBER,
      latestBlockNumber,
      minBlock,
      isJNT,
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
      walletCreatedBlockNumber,
      isJNT,
    )

    const lastExistedBlock: number = getLastExistedBlockNumberByAsset(itemsByAssetAddress)

    if (!lastExistedBlock) {
      return [
        ...failedRequests,
        ...fullyResyncTasks,
      ]
    }

    const diff: number = lastExistedBlock - (minBlock || GENESIS_BLOCK_NUMBER)

    if (diff > maxBlocksPerTransactionsRequest) {
      return [
        ...failedRequests,
        ...getRequestTransactionsByAssetTasks(
          address,
          GENESIS_BLOCK_NUMBER,
          lastExistedBlock,
          minBlock,
          isJNT,
        ),
      ]
    }

    return [
      ...resultByAssetAddress,
      ...failedRequests,
    ]
  }, [])
}

function* resyncTransactionsByOwnerAddress(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  toBlock: number,
): Saga<void> {
  while (true) {
    const itemsByOwner: ExtractReturn<typeof selectTransactionsByOwner> =
      yield select(selectTransactionsByOwner, networkId, ownerAddress)

    if (!itemsByOwner) {
      yield delay(resyncTransactionsTimeout)
      continue
    }

    const walletCreatedBlockNumber: ?number = yield* getWalletCreatedBlockNumber()

    const digitalAssets: ExtractReturn<typeof selectDigitalAssetsItems> =
      yield select(selectDigitalAssetsItems)

    const tasks: SchedulerTransactionsTask[] = getTasksToRefetchByOwner(
      digitalAssets,
      itemsByOwner,
      toBlock,
      walletCreatedBlockNumber,
    )

    yield all(tasks.map((task: SchedulerTransactionsTask) => put(requestQueue, task)))
    yield delay(resyncTransactionsTimeout)
  }
}

function getTasksToFetchByTransactionId(
  items: TransactionWithPrimaryKeys[],
): SchedulerTransactionTask[] {
  return items.reduce((
    result: SchedulerTransactionTask[],
    transaction: TransactionWithPrimaryKeys,
  ): SchedulerTransactionTask[] => ([
    ...result,
    ...getRequestTransactionTasks(transaction),
  ]), [])
}

function* resyncTransactionsByTransactionId(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
): Saga<void> {
  while (true) {
    const itemsByOwner: ExtractReturn<typeof selectTransactionsByOwner> =
      yield select(selectTransactionsByOwner, networkId, ownerAddress)

    if (!itemsByOwner) {
      yield delay(resyncTransactionsTimeout)
      continue
    }

    const activeAssets: ExtractReturn<typeof selectActiveDigitalAssets> =
      yield select(selectActiveDigitalAssets)

    const itemsByOwnerForActiveAssets: ?TransactionsByOwner = getTransactionsByOwnerForActiveAssets(
      itemsByOwner,
      activeAssets,
    )

    const items: TransactionWithPrimaryKeys[] = flattenTransactionsByOwner(
      itemsByOwnerForActiveAssets,
      true,
    )

    const tasks: SchedulerTransactionTask[] = getTasksToFetchByTransactionId(items)

    yield all(tasks.map((task: SchedulerTransactionTask) => put(requestQueue, task)))
    yield delay(resyncTransactionsTimeout)
  }
}

function* resyncTransactionsStart(
  action: ExtractReturn<typeof transactions.resyncTransactionsStart>,
): Saga<void> {
  const {
    requestQueue,
    networkId,
    ownerAddress,
    toBlock,
  } = action.payload

  if (toBlock <= GENESIS_BLOCK_NUMBER) {
    return
  }

  const resyncTransactionsByOwnerAddressTask: Task<typeof resyncTransactionsByOwnerAddress> =
    yield fork(resyncTransactionsByOwnerAddress, requestQueue, networkId, ownerAddress, toBlock)

  const resyncTransactionsByTransactionIdTask: Task<typeof resyncTransactionsByTransactionId> =
    yield fork(resyncTransactionsByTransactionId, requestQueue, networkId, ownerAddress)

  yield take(transactions.RESYNC_TRANSACTIONS_STOP)
  yield cancel(resyncTransactionsByOwnerAddressTask)
  yield cancel(resyncTransactionsByTransactionIdTask)
}

function* requestTransactionsByRange(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  fromBlock: number,
  toBlock: number,
  minBlock: number,
): Saga<void> {
  const { method } = task
  const diffBlockNumber: number = toBlock - fromBlock
  const isRangeUnderflow: boolean = (fromBlock < minBlock)
  const isRangeTooBig: boolean = (diffBlockNumber > maxBlocksPerTransactionsRequest)

  if (isRangeUnderflow || isRangeTooBig) {
    return
  }

  yield put(requestQueue, {
    ...task,
    method: {
      ...method,
      payload: {
        ...method.payload,
        toBlock,
        fromBlock,
      },
    },
  })
}

function* recursiveRequestTransactions(
  requestQueue: Channel,
  task: SchedulerTransactionsTask,
  fromBlock: number,
  toBlock: number,
  minBlock: number,
): Saga<void> {
  if (toBlock < 0) {
    return
  }

  const diffBlockNumber: number = toBlock - fromBlock

  const fromBlockNew: number = (diffBlockNumber > maxBlocksPerTransactionsRequest)
    ? (toBlock - maxBlocksPerTransactionsRequest)
    : fromBlock

  const fromBlockSafety: number = (fromBlockNew < minBlock) ? minBlock : fromBlockNew

  yield* requestTransactionsByRange(requestQueue, task, fromBlockSafety, toBlock, minBlock)

  if (fromBlockSafety > minBlock) {
    yield* recursiveRequestTransactions(
      requestQueue,
      task,
      fromBlockNew - maxBlocksPerTransactionsRequest,
      toBlock - maxBlocksPerTransactionsRequest,
      minBlock,
    )
  }
}

function* checkPendingTransaction(
  action: ExtractReturn<typeof transactions.checkPendingTransaction>,
): Saga<void> {
  const {
    networkId,
    ownerAddress,
    assetAddress,
    transactionId,
  } = action.payload

  const transaction: ExtractReturn<typeof selectTransactionById> = yield select(
    selectTransactionById,
    networkId,
    ownerAddress,
    assetAddress,
    transactionId,
  )

  if (!transaction) {
    return
  }

  const isLoading: boolean = checkTransactionLoading(transaction)

  if (isLoading) {
    return
  }

  const { hash }: Transaction = transaction

  const pendingTransaction: ExtractReturn<typeof selectPendingTransactionByHash> = yield select(
    selectPendingTransactionByHash,
    networkId,
    ownerAddress,
    assetAddress,
    hash,
  )

  if (!pendingTransaction) {
    return
  }

  yield put(transactions.removePendingTransaction(networkId, ownerAddress, assetAddress, hash))
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

  yield put(transactions.checkPendingTransaction(
    networkId,
    ownerAddress,
    assetAddress,
    transactionId,
  ))
}

function* fetchEventsData(
  requestQueue: Channel,
  assetAddress: AssetAddress,
  blockNumber: BlockNumber,
  txs: Transactions,
): Saga<void> {
  const items: TransactionWithPrimaryKeys[] = flattenTransactions(
    txs,
    assetAddress,
    blockNumber,
    true,
  )

  const tasks: SchedulerTransactionTask[] = getTasksToFetchByTransactionId(items)

  yield all(tasks.map((task: SchedulerTransactionTask) => put(requestQueue, task)))
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
    minBlock,
    fromBlock,
    assetAddress,
  } = payload

  const toBlockStr: BlockNumber = toBlock.toString()

  if ((toBlock - fromBlock) > maxBlocksPerTransactionsRequest) {
    yield* recursiveRequestTransactions(requestQueue, task, fromBlock, toBlock, minBlock)

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

        const txIds: TransactionId[] = Object.keys(txs)

        yield all(txIds.map((txId: TransactionId) => put(transactions.checkPendingTransaction(
          networkId,
          ownerAddress,
          assetAddress,
          txId,
        ))))

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

    yield* requestTransactionsByRange(requestQueue, task, fromBlock, mediumBlock, minBlock)
    yield* requestTransactionsByRange(requestQueue, task, mediumBlock, toBlock, minBlock)
  }
}

function* removeItemsByAsset(
  action: ExtractReturn<typeof transactions.removeItemsByAsset>,
): Saga<void> {
  const { assetAddress } = action.payload

  const networkId: ExtractReturn<typeof selectCurrentNetworkId> =
    yield select(selectCurrentNetworkId)

  const ownerAddress: ExtractReturn<typeof selectActiveWalletAddress> =
    yield select(selectActiveWalletAddress)

  if (!ownerAddress) {
    return
  }

  yield put(transactions.initItemsByAsset(networkId, ownerAddress, assetAddress, true))
  yield put(blocks.syncRestart())
}

export function* transactionsRootSaga(): Saga<void> {
  yield takeEvery(transactions.REMOVE_ITEMS_BY_ASSET, removeItemsByAsset)
  yield takeEvery(transactions.FETCH_BY_OWNER_REQUEST, fetchByOwnerRequest)
  yield takeEvery(transactions.RESYNC_TRANSACTIONS_START, resyncTransactionsStart)
  yield takeEvery(transactions.CHECK_PENDING_TRANSACTION, checkPendingTransaction)
}
