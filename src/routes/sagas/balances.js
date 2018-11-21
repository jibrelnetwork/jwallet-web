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
import checkETH from 'utils/digitalAssets/checkETH'

import {
  selectNetworkId,
  selectWalletsItems,
  selectActiveWalletId,
  selectDigitalAssets,
} from 'store/stateSelectors'

import {
  getAssetBalance,
} from 'services/web3'

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
  blockNumber: number,
  ownerAddress: Address): boolean {
  const { balances } = state.balances.persist
  const block = blockNumber.toString()

  if (balances[networkId] &&
      balances[networkId][block] &&
      balances[networkId][block][ownerAddress]) {
    const assets = balances[networkId][block][ownerAddress]
    return !!(Object
      .keys(assets)
      .find((address: Address) => assets[address].isLoading))
  }
  return false
}

export function* getBalancesSchedulerProcess(
  requestQueue: Channel,
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
    yield all(activeAssets
      .filter(({ address }) => !checkETH(address))
      .map((asset) => {
        const task: SchedulerTask = {
          module: 'balances',
          method: {
            name: 'getERC20Balance',
            payload: {
              blockNumber: currentBlock.number,
              contractAddress: asset.address,
              owner: activeOwnerAddress,
            },
          },
        }
        return put(requestQueue, task)
      }))

    while (true) {
      console.log(networkId, currentBlock.number, activeOwnerAddress)
      const hasPendingBalances: ExtractReturn<typeof selectHasPendingBalances>
        = yield select(selectHasPendingBalances, networkId, currentBlock.number, activeOwnerAddress)

      if (!hasPendingBalances) {
        yield put(setIsBalancesFetched(networkId, true))
        console.log('All balances for block ${} has been fetched')
        return
      }

      yield call(delay, 1000)
    }
  } finally {
    // canceled...
  }
}

export function* requestBalance(task: SchedulerTask): Saga<void> {
  switch (task.method.name) {
    case 'getERC20Balance': {
      const {
        payload,
      } = task.method

      const balance: Bignumber = yield call(
        getAssetBalance,
        payload.contractAddress,
        payload.owner)

      const balancePayload = {
        balance: balance.toString(10),
        isLoading: false,
      }

      const networkId: NetworkId = yield select(selectNetworkId)

      yield put(updateBalance(
        networkId,
        payload.blockNumber,
        payload.owner,
        payload.contractAddress,
        balancePayload
      ))
      break
    }

    default:
  }
}
