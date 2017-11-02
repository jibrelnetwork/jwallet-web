import { put, takeEvery } from 'redux-saga/effects'

import isMnemonicType from 'utils/isMnemonicType'
import keystore from 'services/keystore'

import {
  SEND_FUNDS_SET_ACCOUNT_ID,
  SEND_FUNDS_SET_ACCOUNT,
} from '../modules/modals/sendFunds'

import {
  RECEIVE_FUNDS_SET_ACCOUNT_ID,
  RECEIVE_FUNDS_SET_ACCOUNT,
} from '../modules/modals/receiveFunds'

import {
  CONVERT_FUNDS_SET_FROM_ACCOUNT,
  CONVERT_FUNDS_SET_FROM_ACCOUNT_ID,
  CONVERT_FUNDS_SET_TO_ACCOUNT,
  CONVERT_FUNDS_SET_TO_ACCOUNT_ID,
} from '../modules/modals/convertFunds'

function* setAccount(accountId, accounts, type) {
  yield put({
    type,
    currentAccount: accounts.filter(account => (account.id === accountId)).shift()
  })
}

function* setSendFundsAccount(action = {}) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, SEND_FUNDS_SET_ACCOUNT)
}

function* setConvertFundsFromAccount(action = {}) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, CONVERT_FUNDS_SET_FROM_ACCOUNT)
}

function* setConvertFundsToAccount(action = {}) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, CONVERT_FUNDS_SET_TO_ACCOUNT)
}

function* setReceiveFundsAccount(action = {}) {
  try {
    const { accountId, accounts, addressesFromMnemonic } = action
    const currentAccount = accounts.filter(account => (account.id === accountId)).shift() || {}
    const { id, type, addressIndex } = currentAccount

    if (isMnemonicType(type)) {
      let addressFromMnemonic = addressesFromMnemonic[addressIndex]

      if (!addressFromMnemonic) {
        addressFromMnemonic = getAddressFromMnemonicByIndex(id, addressIndex)
      }

      currentAccount.address = addressFromMnemonic
    }

    yield put({ type: RECEIVE_FUNDS_SET_ACCOUNT, currentAccount })
  } catch (e) {
    yield put({ type: RECEIVE_FUNDS_SET_ACCOUNT })
  }
}

function getAddressFromMnemonicByIndex(accountId = '', addressIndex = 0) {
  const iteration = 0
  const limit = (addressIndex + 1)
  const addresses = keystore.getAddressesFromMnemonic(accountId, iteration, limit) || []

  return addresses[addressIndex] || {}
}

export function* watchSendFundsAccountId() {
  yield takeEvery(SEND_FUNDS_SET_ACCOUNT_ID, setSendFundsAccount)
}

export function* watchConvertFundsFromAccountId() {
  yield takeEvery(CONVERT_FUNDS_SET_FROM_ACCOUNT_ID, setConvertFundsFromAccount)
}

export function* watchConvertFundsToAccountId() {
  yield takeEvery(CONVERT_FUNDS_SET_TO_ACCOUNT_ID, setConvertFundsToAccount)
}

export function* watchReceiveFundsAccountId() {
  yield takeEvery(RECEIVE_FUNDS_SET_ACCOUNT_ID, setReceiveFundsAccount)
}
