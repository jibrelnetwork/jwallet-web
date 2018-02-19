// @flow

import { put, takeEvery } from 'redux-saga/effects'

import { gtm, keystore, storage } from 'services'

import {
  KEYSTORE_SET_ACCOUNTS,
  KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA,
  KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
} from 'routes/JWallet/modules/keystore'

import { CLEAR } from '../modules/clearKeys'

function* onClearKeys(): Saga<void> {
  try {
    keystore.removeAccounts()
    yield onClearKeysSuccess()
  } catch (err) {
    yield onClearKeysError()
  }
}

function* onClearKeysSuccess(): Saga<void> {
  gtm.pushClearKeystore()

  yield setEmptyKeys()
  yield clearCurrentKey()

  // It is necessary to reload page
  window.location.href = '/'
}

function* onClearKeysError(/* err */): Saga<void> {
  // console.error(err)
}

function* setEmptyKeys(): Saga<void> {
  storage.setKeystore(keystore.serialize())
  yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts: [] })
}

function* clearCurrentKey(): Saga<void> {
  storage.removeKeystoreCurrentAccount()
  storage.removeKeystoreAddressesFromMnemonic()

  yield put({ type: KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA })
  yield put({ type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC, items: [], currentIteration: 0 })
}

export function* watchClearKeys(): Saga<void> {
  yield takeEvery(CLEAR, onClearKeys)
}
