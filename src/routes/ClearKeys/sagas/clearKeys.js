import { put, takeEvery } from 'redux-saga/effects'

import { gtm, keystore, storage } from 'services'

import {
  KEYSTORE_SET_ACCOUNTS,
  KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA,
  KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC,
} from 'routes/JWallet/modules/keystore'

import { SET_INVALID_FIELD, CLEAR } from '../modules/clearKeys'

function* onClearKeys(action: { password: Password }) {
  try {
    keystore.removeAccounts(action.password)
    yield onClearKeysSuccess()
  } catch (err) {
    yield onClearKeysFail(err)
  }
}

function* onClearKeysSuccess() {
  gtm.pushClearKeystore()

  yield clearKeys()
  yield clearCurrentKey()
}

function* onClearKeysFail() {
  yield put({
    type: SET_INVALID_FIELD,
    fieldName: 'password',
    message: i18n('modals.general.error.password.invalid'),
  })
}

function* clearKeys() {
  storage.setKeystore(keystore.serialize())
  yield put({ type: KEYSTORE_SET_ACCOUNTS, accounts: [] })
}

function* clearCurrentKey() {
  storage.removeKeystoreCurrentAccount()
  storage.removeKeystoreAddressesFromMnemonic()

  yield put({ type: KEYSTORE_CLEAR_CURRENT_ACCOUNT_DATA })
  yield put({ type: KEYSTORE_SET_ADDRESSES_FROM_MNEMONIC, items: [], currentIteration: 0 })
}

export function* watchClearKeys(): Saga<void> {
  yield takeEvery(CLEAR, onClearKeys)
}
