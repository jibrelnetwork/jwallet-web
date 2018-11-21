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
} from 'store/stateSelectors'

import { selectActiveDigitalAssets } from 'store/selectors/digitalAssets'

import { getAssetBalance, getETHBalance } from 'services/web3'

import { setIsBalancesFetched } from '../modules/blocks'

import {
  initAtBlock,
  updateBalance,
} from '../modules/balances'

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
  processingBlock: BlockInfo,
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
      processingBlock.number,
      activeOwnerAddress,
      initialState
    ))

    // schedule to fetch all balances
    yield all(activeAssets.map((asset) => {
      if (asset.address === 'Ethereum') {
        const task: SchedulerTask = {
          module: 'balances',
          method: {
            name: 'getETHBalance',
            payload: {
              blockNumber: processingBlock.number,
              owner: activeOwnerAddress,
            },
          },
        }
        return put(requestQueue, task)
      } else {
        const task: SchedulerTask = {
          module: 'balances',
          method: {
            name: 'getERC20Balance',
            payload: {
              blockNumber: processingBlock.number,
              contractAddress: asset.address,
              owner: activeOwnerAddress,
            },
          },
        }
        return put(requestQueue, task)
      }
    }))

    // wait, while all balances will be fetched
    while (true) {
      const hasPendingBalances: ExtractReturn<typeof selectHasPendingBalances> = yield select(
        selectHasPendingBalances,
        networkId,
        processingBlock.number,
        activeOwnerAddress
      )

      if (!hasPendingBalances) {
        yield put(setIsBalancesFetched(networkId))
        console.log(`All balances for block ${processingBlock.number} has been fetched`)
        return
      }

      yield call(delay, 100)
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
        payload.owner
      )

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

    case 'getETHBalance': {
      const {
        payload,
      } = task.method

      const balance: Bignumber = yield call(
        getETHBalance,
        payload.owner
      )

      const balancePayload = {
        balance: balance.toString(10),
        isLoading: false,
      }

      const networkId: NetworkId = yield select(selectNetworkId)

      yield put(updateBalance(
        networkId,
        payload.blockNumber,
        payload.owner,
        'Ethereum',
        balancePayload
      ))
      break
    }

    default:
  }
}
