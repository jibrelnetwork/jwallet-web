// @flow

import update from 'react-addons-update'
import { all, put, call, fork, take, cancel, select, takeEvery } from 'redux-saga/effects'

import type { Task, Channel } from 'redux-saga'

import blockExplorer from 'services/blockExplorer'
import { checkETH, checkJNT } from 'utils/digitalAssets'

import {
  selectTransactions,
  selectDigitalAssets,
} from 'store/stateSelectors'

/* eslint-disable-next-line no-unused-vars */
import { requestTaskProcess } from './blocks'
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

function putRequest(
  requestQueue: Channel,
  digitalAssets: DigitalAssets,
  owner: Address,
  asset: Address,
  networkId: NetworkId,
  fromBlock: number,
  toBlock: number,
) {
  const digitalAsset: DigitalAsset = digitalAssets[asset]
  const name: TransactionMethodName = getMethodName(digitalAsset)

  const task: SchedulerTask = {
    method: {
      name,
      payload: {
        asset,
        owner,
        networkId,
        toBlock,
        fromBlock,
        decimals: digitalAsset.decimals,
      },
    },
    module: 'transactions',
    priority: 0,
    retryCount: 3,
  }

  return put(requestQueue, task)
}

export function* requestTransactionsLoop(
  requestQueue: Channel,
  networkId: NetworkId,
  owner: Address,
  fromBlock: number,
  toBlock: number,
): Saga<void> {
  try {
    while (true) {
      const digitalAssets: ExtractReturn<typeof selectDigitalAssets> =
        yield select(selectDigitalAssets)

      yield all(Object
        .keys(digitalAssets)
        .filter((assetAddress: Address): boolean => !!digitalAssets[assetAddress].isActive)
        .map((asset: Address) => putRequest(
          requestQueue,
          digitalAssets,
          owner,
          asset,
          networkId,
          fromBlock,
          toBlock,
        ))
      )
    }
  } finally {
    //
  }
}

function getLoadingTransactions(txs: Transactions): Transactions {
  return Object.keys(txs).reduce((result: Transactions, hash: Hash): Transactions => {
    const {
      gasUsed,
      timestamp,
    }: Transaction = txs[hash]

    // gasUsed is fetched from transactionReceipt, timestamp is fetched from block
    if (gasUsed && timestamp) {
      return result
    }

    return {
      ...result,
      [hash]: txs[hash],
    }
  }, {})
}

function* checkLoadingTransactions(networkId: NetworkId, owner: Address): Saga<void> {
  const {
    persist,
    isLoading,
  }: ExtractReturn<typeof selectTransactions> = yield (selectTransactions)

  const itemsByNetworkId = persist.items[networkId]

  if (!itemsByNetworkId) {
    return
  }

  const itemsByOwner = itemsByNetworkId[owner]

  if (!itemsByOwner) {
    return
  }

  const assetAddresses: Array<AssetAddress> = Object.keys(itemsByOwner)

  const loadingTransactions = assetAddresses
    .reduce((result: Transactions, asset: AssetAddress): Transactions => {
      const itemsByAsset = itemsByOwner[asset]

      if (!itemsByAsset) {
        return result
      }

      return getLoadingTransactions(itemsByAsset)
    }, {})

  const isCurrentlyLoading: boolean = !!Object.keys(loadingTransactions)

  if (isLoading !== isCurrentlyLoading) {
    yield put(transactions.setIsLoading(isCurrentlyLoading))
  }
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

      const subTask: SchedulerTask = update(task, {
        method: {
          payload: {
            $set: {
              ...payload,
              toBlock,
              fromBlock: (fromBlockNew <= 0) ? 0 : fromBlockNew,
            },
          },
        },
      })

      yield put(requestQueue, subTask)

      if (fromBlockNew > 0) {
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
  switch (task.method.name) {
    case 'getETHTransactions': {
      const {
        owner,
        networkId,
        fromBlock,
        toBlock,
      } = task.method.payload

      if ((toBlock - fromBlock) > MAX_BLOCKS_PER_REQUEST) {
        yield recursiveRequestTransactions(task, requestQueue, toBlock, fromBlock)
        break
      }

      const txs: Transactions = yield call(
        blockExplorer.getETHTransactions,
        networkId,
        owner,
        fromBlock,
        toBlock,
      )

      yield put(transactions.setItems(networkId, owner, 'Ethereum', txs))
      yield* checkLoadingTransactions(owner, networkId)
      break
    }

    default: {
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

  const requestTasks: Array<Task<typeof requestTaskProcess>> = yield all(Array
    .from({ length: 5 })
    .map(() => fork(requestTaskProcess, requestQueue))
  )

  const requestTransactionsTask: Task<typeof requestTransactionsLoop> = yield fork(
    requestTransactionsLoop,
    requestQueue,
    networkId,
    owner,
    currentBlockNumber,
    processingBlock.number,
  )

  yield take(transactions.SYNC_STOP)
  yield cancel(requestTransactionsTask)
  yield all(requestTasks.map(requestTask => cancel(requestTask)))
}

export function* transactionsRootSaga(): Saga<void> {
  yield takeEvery(transactions.SYNC_START, syncStart)
}
