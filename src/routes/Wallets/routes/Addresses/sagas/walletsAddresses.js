// @flow

import { delay } from 'redux-saga'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import web3 from 'services/web3'
import walletsWorker from 'workers/wallets'
import { selectWallets, selectWalletsAddresses } from 'store/stateSelectors'
import * as wallets from 'routes/Wallets/modules/wallets'

import * as walletsAddresses from '../modules/walletsAddresses'

function* openView(): Saga<void> {
  const { items, activeWalletId } = yield select(selectWallets)
  const { iteration } = yield select(selectWalletsAddresses)

  const startIndex: Index = config.mnemonicAddressesCount * iteration
  const endIndex: Index = startIndex + config.mnemonicAddressesCount

  if (!activeWalletId) {
    return
  }

  yield put(walletsAddresses.getMoreRequest(items, activeWalletId, startIndex, endIndex))
}

function* closeView(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(walletsAddresses.clean())
}

function setActive(
  action: ExtractReturn<typeof walletsAddresses.setActiveRequest>,
): Saga<void> {
  const {
    items,
    walletId,
    addressIndex,
  } = action.payload

  walletsWorker.setActiveRequest(items, walletId, addressIndex)
}

function* setActiveError(): Saga<void> {
  // notify user
}

function* setActiveSuccess(
  action: ExtractReturn<typeof walletsAddresses.setActiveSuccess>,
): Saga<void> {
  yield put(wallets.setWallets(action.payload.items))
}

function getMore(
  action: ExtractReturn<typeof walletsAddresses.getMoreRequest>,
): Saga<void> {
  const {
    items,
    walletId,
    endIndex,
    startIndex,
  } = action.payload

  walletsWorker.getMoreRequest(items, walletId, startIndex, endIndex)
}

function* getMoreError(): Saga<void> {
  // notify user
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
  const { activeWalletId } = yield select(selectWallets)

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

function* getBalancesError(): Saga<void> {
  // notify user
}

export function* walletsAddressesRootSaga(): Saga<void> {
  yield takeEvery(walletsAddresses.OPEN_VIEW, openView)
  yield takeEvery(walletsAddresses.CLOSE_VIEW, closeView)
  yield takeEvery(walletsAddresses.GET_MORE_REQUEST, getMore)
  yield takeEvery(walletsAddresses.GET_MORE_ERROR, getMoreError)
  yield takeEvery(walletsAddresses.SET_ACTIVE_REQUEST, setActive)
  yield takeEvery(walletsAddresses.SET_ACTIVE_ERROR, setActiveError)
  yield takeEvery(walletsAddresses.SET_ACTIVE_SUCCESS, setActiveSuccess)
  yield takeEvery(walletsAddresses.GET_ETH_BALANCES_REQUEST, getBalances)
  yield takeEvery(walletsAddresses.GET_ETH_BALANCES_ERROR, getBalancesError)
}
