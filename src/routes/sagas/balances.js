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

import { selectPendingBalances } from 'store/selectors/balances'
import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import web3 from 'services/web3'

import * as blocks from '../modules/blocks'
import * as balances from '../modules/balances'

export function* scheduleRequestsBalances(
  requestQueue: Channel,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: number,
): Saga<void> {
  try {
    const activeAssets: Array<DigitalAsset> = yield select(selectActiveDigitalAssets)

    if (activeAssets.length === 0) {
      // @TODO: notify, that everything is fetched
      return
    }

    // push initial balances state
    const initialItems: Balances = activeAssets.reduce((prev, asset) => ({
      ...prev,
      [asset.address]: {
        balance: null,
        isLoading: true,
      },
    }), {})

    yield put(balances.initAtBlock(networkId, blockNumber, ownerAddress, initialItems))

    // schedule to fetch all balances
    yield all(activeAssets.map((asset) => {
      if (asset.address === 'Ethereum') {
        const task: SchedulerTask = {
          module: 'balances',
          method: {
            name: 'getETHBalance',
          },
        }

        return put(requestQueue, task)
      } else {
        const task: SchedulerTask = {
          module: 'balances',
          method: {
            name: 'getERC20Balance',
            payload: {
              contractAddress: asset.address,
            },
          },
        }

        return put(requestQueue, task)
      }
    }))

    // wait, while all balances will be fetched
    while (true) {
      const pendingBalances: ExtractReturn<typeof selectPendingBalances> = yield select(
        selectPendingBalances,
        networkId,
        blockNumber,
        ownerAddress,
      )

      if (!pendingBalances.length) {
        yield put(blocks.setIsBalancesFetched(networkId, true))

        return
      }

      yield call(delay, 1000)
    }
  } finally {
    yield put(balances.syncCancelled())
  }
}

export function* requestBalance(
  task: SchedulerTask,
  networkId: NetworkId,
  ownerAddress: OwnerAddress,
  blockNumber: number,
): Saga<void> {
  const { method } = task

  switch (method.name) {
    case 'getETHBalance': {
      const balance: BigNumber = yield call(web3.getETHBalance, ownerAddress)

      const balancePayload = {
        value: balance.toString(10),
        isLoading: false,
      }

      yield put(balances.updateBalance(
        networkId,
        blockNumber,
        ownerAddress,
        'Ethereum',
        balancePayload,
      ))

      break
    }

    case 'getERC20Balance': {
      const { contractAddress } = method.payload
      const balance: BigNumber = yield call(web3.getAssetBalance, contractAddress, ownerAddress)

      const balancePayload = {
        value: balance.toString(10),
        isLoading: false,
      }

      yield put(balances.updateBalance(
        networkId,
        blockNumber,
        ownerAddress,
        contractAddress,
        balancePayload,
      ))

      break
    }

    default:
      break
  }
}

export function* syncStart(action: ExtractReturn<typeof balances.syncStart>): Saga<void> {
  const {
    requestQueue,
    processingBlock,
    ownerAddress,
    networkId,
  } = action.payload

  const requestBalancesTask: Task<typeof scheduleRequestsBalances> = yield fork(
    scheduleRequestsBalances,
    requestQueue,
    networkId,
    ownerAddress,
    processingBlock.number,
  )

  yield take(balances.SYNC_STOP)
  yield cancel(requestBalancesTask)
}

export function* balancessRootSaga(): Saga<void> {
  yield takeEvery(balances.SYNC_START, syncStart)
}
