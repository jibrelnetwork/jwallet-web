// @flow

import { delay } from 'redux-saga'
import { push } from 'react-router-redux'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import web3 from 'services/web3'
import keystore from 'services/keystore'

import {
  selectActiveWalletId,
  selectWalletsPersist,
  selectWalletsAddresses,
} from 'store/stateSelectors'

import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsAddresses from '../modules/walletsAddresses'

function* openView(): Saga<void> {
  yield put(walletsAddresses.clean())

  const { items, activeWalletId }: WalletsPersist = yield select(selectWalletsPersist)

  if (!items) {
    yield put(push('/wallets/start'))

    return
  }

  if (!activeWalletId) {
    yield put(push('/wallets'))

    return
  }

  const { iteration }: WalletsAddressesState = yield select(selectWalletsAddresses)

  const startIndex: Index = config.mnemonicAddressesCount * iteration
  const endIndex: Index = (startIndex + config.mnemonicAddressesCount) - 1
  const addresses = keystore.getAddresses(items, activeWalletId, startIndex, endIndex)

  yield put(walletsAddresses.getMoreSuccess(addresses))
}

function* setActive(action: ExtractReturn<typeof walletsAddresses.setActive>): Saga<void> {
  const {
    items,
    walletId,
    addressIndex,
  } = action.payload

  const itemsNew: Wallets = keystore.updateWallet(items, walletId, { addressIndex })
  yield put(wallets.setWalletsItems(itemsNew))
  yield put(push('/digital-assets'))
}

function* getMore(
  action: ExtractReturn<typeof walletsAddresses.getMoreRequest>,
): Saga<void> {
  const {
    items,
    walletId,
    endIndex,
    startIndex,
  } = action.payload

  const addresses = keystore.getAddresses(items, walletId, startIndex, endIndex)
  yield put(walletsAddresses.getMoreSuccess(addresses))
}

function getBalanceByAddress(address: Address) {
  return call(web3.getETHBalance, address)
}

function* getBalancesByAddresses(addresses: Addresses): Saga<Balances> {
  const balances: Array<number> = yield all(addresses.map(address => getBalanceByAddress(address)))

  return addresses.reduce((result: Balances, address: Address, i: Index) => ({
    ...result,
    [address]: balances[i],
  }), {})
}

function* getBalances(
  action: ExtractReturn<typeof walletsAddresses.getBalancesRequest>,
): Saga<void> {
  const activeWalletId: ?WalletId = yield select(selectActiveWalletId)

  if (!activeWalletId) {
    return
  }

  try {
    const balances: Balances = yield getBalancesByAddresses(action.payload.addresses)

    yield delay(config.balanceLoadingTimeout)
    yield put(walletsAddresses.getBalancesSuccess(balances))
  } catch (err) {
    yield put(walletsAddresses.getBalancesError(err))
  }
}

export function* walletsAddressesRootSaga(): Saga<void> {
  yield takeEvery(walletsAddresses.OPEN_VIEW, openView)
  yield takeEvery(walletsAddresses.SET_ACTIVE, setActive)
  yield takeEvery(walletsAddresses.GET_MORE_REQUEST, getMore)
  yield takeEvery(walletsAddresses.GET_ETH_BALANCES_REQUEST, getBalances)
}
