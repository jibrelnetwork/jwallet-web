// @flow

import {
  delay,
  type Channel,
} from 'redux-saga'

import {
  select,
  put,
  call,
} from 'redux-saga/effects'

import keystore from 'services/keystore'

import {
  selectWalletsItems,
  selectActiveWalletId,
  selectDigitalAssets,
} from 'store/stateSelectors'

import {
  initAtBlock,
} from '../modules/balances'

function selectActiveDigitalAssets(state: AppState): Array<DigitalAsset> {
  const allAssets = selectDigitalAssets(state)
  return Object.keys(allAssets).map(address => allAssets[address]).filter(asset => asset.isActive)
}

export function* getBalancesSchedulerProcess(
  requestQueueCh: Channel<SchedulerTask>,
  networkId: NetworkId,
  currentBlock: BlockInfo,
): Saga<void> {
  try {
    const wallets: ExtractReturn<typeof selectWalletsItems> = yield select(selectWalletsItems)

    const activeWalletId: ExtractReturn<typeof selectActiveWalletId>
      = yield select(selectActiveWalletId)
    if (!activeWalletId) {
      return
    }

    const activeOwnerAddress = keystore.getAddress(wallets, activeWalletId)
    if (!activeOwnerAddress) {
      return
    }

    const activeAssets: Array<DigitalAsset> = yield select(selectActiveDigitalAssets)
    if (activeAssets.length === 0) {
      // @TODO: notify, that everything is fetched
      return
    }

    // push initial balances state
    const initialState: OwnerBalances = activeAssets.reduce((prev, asset) => ({
      ...prev,
      [asset.address]: {
        balance: null,
        isLoading: false,
      },
    }), {})

    yield put(initAtBlock(
      networkId,
      currentBlock.number,
      activeOwnerAddress,
      initialState
    ))

    // yield all(activeAssets.map(asset => put(requestQueueCh, {

    // }))

    while (true) {
      // 6. push tasks to the scheduler

      yield call(delay, 1000)

      const task: SchedulerTask = {
        module: 'balances',
        method: {
          name: 'getETHBalance',
          payload: {
            blockNumber: 123,
            walletAddress: '123',
          },
        },
        retryCount: 3,
        priority: 0,
      }

      yield put(requestQueueCh, task)

      // console.log('scheduled')
    }
  } finally {
    // canceled...
  }
}

export function* requestBalance(task: SchedulerTask): Saga<void> {
  // console.log('requestBalance', task)
}
