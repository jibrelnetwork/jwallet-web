// @flow

import {
  delay,
  type Channel,
} from 'redux-saga'

import {
  select,
  put,
  all,
  call,
} from 'redux-saga/effects'

import keystore from 'services/keystore'

import {
  selectNetworkId,
  selectWalletsItems,
  selectActiveWalletId,
  selectDigitalAssets,
} from 'store/stateSelectors'

import {
  initAtBlock,
  updateBalance,
} from '../modules/balances'

import {
  setIsBalancesFetched,
} from '../modules/blocks'

function selectActiveDigitalAssets(state: AppState): Array<DigitalAsset> {
  const allAssets = selectDigitalAssets(state)
  return Object.keys(allAssets).map(address => allAssets[address]).filter(asset => asset.isActive)
}

function selectHasPendingBalances(
  state: AppState,
  networkId: NetworkId,
  blockNumber: BlockNumber,
  ownerAddress: Address): boolean {
  const { balances } = state.balances.persist
  if (balances[networkId] &&
      balances[networkId][blockNumber] &&
      balances[networkId][blockNumber][ownerAddress]) {
    const assets = balances[networkId][blockNumber][ownerAddress]
    return !!(Object
      .keys(assets)
      .find((address: Address) => assets[address].isLoading))
  }
  return false
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
        isLoading: true,
      },
    }), {})

    yield put(initAtBlock(
      networkId,
      currentBlock.number,
      activeOwnerAddress,
      initialState
    ))

    // schedule to fetch all balances
    yield all(activeAssets.map((asset) => {
      const task: SchedulerTask = {
        module: 'balances',
        method: {
          name: 'getERC20Balance',
          payload: {
            blockNumber: currentBlock.number,
            contractAddress: asset.address,
            walletAddress: activeOwnerAddress,
          },
        },
      }
      return put(requestQueueCh, task)
    }))

    while (true) {
      console.log(networkId, currentBlock.number, activeOwnerAddress)
      const hasPendingBalances: ExtractReturn<typeof selectHasPendingBalances>
        = yield select(selectHasPendingBalances, networkId, currentBlock.number, activeOwnerAddress)

      if (!hasPendingBalances) {
        yield put(setIsBalancesFetched(networkId))
        console.log('All balances for block ${} has been fetched')
        return
      }

      yield call(delay, 100)
    }
  } finally {
    // canceled...
  }
}

export function* requestBalance(task: SchedulerTask): Saga<void> {
  console.log('requestBalance', task)
  yield delay(500)

  const { name, payload } = task.method

  switch (name) {
    case 'getERC20Balance': {
      const balance = {
        balance: '0',
        isLoading: false,
      }

      const networkId: NetworkId = yield select(selectNetworkId)

      yield put(updateBalance(
        networkId,
        payload.blockNumber,
        payload.walletAddress,
        payload.contractAddress,
        balance
      ))
      break
    }

    default:
  }
}
