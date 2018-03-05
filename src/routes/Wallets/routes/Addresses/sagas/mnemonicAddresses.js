// @flow

import { delay } from 'redux-saga'
import { concat, fromPairs, merge } from 'ramda'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import isMnemonicType from 'utils/isMnemonicType'
import { keystore, web3 } from 'services'
import { selectWalletId, selectMnemonicAddresses } from 'store/stateSelectors'

import {
  OPEN,
  CLOSE,
  SET_ACTIVE,
  GET_MORE,
  GET_ETH_BALANCES,
  close,
  setActiveSuccess,
  setActiveError,
  getMore,
  getMoreSuccess,
  getMoreError,
  getBalances,
  getBalancesSuccess,
  getBalancesError,
  clean,
} from '../modules/mnemonicAddresses'

function* openMnemonicAddresses(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(close())

    return
  }

  try {
    const { type }: Wallet = keystore.getWallet(walletId)

    if (isMnemonicType(type)) {
      yield put(getMore())
    } else {
      yield put(close())
    }
  } catch (err) {
    yield put(close())
  }
}

function* closeMnemonicAddresses(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setAddressIndex(action: { payload: { addressIndex: Index } }): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(close())

    return
  }

  try {
    keystore.setAddressIndex(walletId, action.payload.addressIndex)
    yield put(setActiveSuccess(action.payload.addressIndex))
  } catch (err) {
    yield put(setActiveError(err))
  }
}

function* getMoreAddresses(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)
  const { addresses, iteration }: MnemonicAddressesData = yield select(selectMnemonicAddresses)

  if (!walletId) {
    yield put(close())

    return
  }

  try {
    const addressesFromMnemonic: Addresses = keystore.getAddressesFromMnemonic(walletId, iteration)
    const newAddresses: Addresses = concat(addresses)(addressesFromMnemonic)
    yield put(getMoreSuccess(newAddresses, (iteration + 1)))
    yield put(getBalances(addressesFromMnemonic))
  } catch (err) {
    yield put(getMoreError(err))
  }
}

function* getETHBalances(action: { payload: { addresses: Addresses } }): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)
  const { balances }: MnemonicAddressesData = yield select(selectMnemonicAddresses)
  const { addresses }: { addresses: Addresses } = action.payload

  if (!walletId) {
    yield put(close())

    return
  }

  try {
    const balancesByAddresses: Balances = yield getBalanceByAddresses(addresses)
    const newBalances: Balances = merge(balances)(balancesByAddresses)
    yield delay(config.balanceLoadingTimeout)
    yield put(getBalancesSuccess(newBalances))
  } catch (err) {
    yield put(getBalancesError(err))
  }
}

function* getBalanceByAddresses(addresses: Addresses) {
  const balances: Array<number> = yield all(addresses.map(getBalanceByAddress))

  const addressBalancePairs: AddressBalancePairs = addresses.map((address: Address, i: Index) => {
    return [address, balances[i]]
  })

  return fromPairs(addressBalancePairs)
}

function getBalanceByAddress(address: Address) {
  return call(web3.getETHBalance, address)
}

export function* watchOpenMnemonicAddresses(): Saga<void> {
  yield takeEvery(OPEN, openMnemonicAddresses)
}

export function* watchCloseMnemonicAddresses(): Saga<void> {
  yield takeEvery(CLOSE, closeMnemonicAddresses)
}

export function* watchSetAddressIndex(): Saga<void> {
  yield takeEvery(SET_ACTIVE, setAddressIndex)
}

export function* watchGetMoreAddresses(): Saga<void> {
  yield takeEvery(GET_MORE, getMoreAddresses)
}

export function* watchGetETHBalances(): Saga<void> {
  yield takeEvery(GET_ETH_BALANCES, getETHBalances)
}
