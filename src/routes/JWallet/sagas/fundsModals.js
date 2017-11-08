import { call, put, takeEvery } from 'redux-saga/effects'
import Keystore from 'jwallet-web-keystore'
import BigNumber from 'bignumber.js'

import config from 'config'
import { keystore, web3 } from 'services'
import isMnemonicType from 'utils/isMnemonicType'

import {
  SEND_FUNDS_CLOSE_MODAL,
  SEND_FUNDS_SET_ACCOUNT_ID,
  SEND_FUNDS_SET_ACCOUNT,
  SEND_FUNDS_SET_INVALID_FIELD,
  SEND_FUNDS,
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

function* sendFunds(action = {}) {
  try {
    const { props } = action
    const isValid = yield validateSendFunds(props)

    if (!isValid) {
      return
    }

    const { onClose, amount } = props || {}
    const value = amountToWei(amount)

    if (value.lessThanOrEqualTo(0)) {
      yield setInvalidField('amount', 'Amount should be greater than 0')

      return
    }

    const transactionData = yield getTransactionData(props)

    if (!transactionData) {
      return
    }

    const transactionHash = yield call(web3.sendETHTransaction, transactionData)

    yield sendFundsSuccess(onClose)
  } catch (err) {
    yield sendFundsFail(err)
  }
}

function* validateSendFunds(props = {}) {
  const { accountId, address, amount, gas, gasPrice } = props

  if (yield isAccountSelected(accountId)) {
    return false
  } else if (yield isAddressError(address)) {
    return false
  } else if (yield isAmountError(amount)) {
    return false
  } else if (yield isGasError(gas)) {
    return false
  } else if (yield isGasPriceError(gasPrice)) {
    return false
  }

  return true
}

function* sendFundsSuccess(onClose) {
  yield put({ type: SEND_FUNDS_CLOSE_MODAL })

  return onClose ? onClose() : null
}

function* sendFundsFail(err) {
  console.error(err.message)

  yield setInvalidField('password', 'Incorrect password')
}

function* setInvalidField(fieldName, message = '') {
  yield put({ type: SEND_FUNDS_SET_INVALID_FIELD, fieldName, message })
}

function* isAccountSelected(accountId) {
  if (!(accountId && accountId.length)) {
    yield setInvalidField('account', 'Please select account')

    return true
  }

  return false
}

function* isAddressError(address) {
  if (!Keystore.isHexStringValid(address, 40)) {
    yield setInvalidField('address', 'Please input valid account address')

    return true
  }

  return false
}

function* isAmountError(amount) {
  if (/[^\d.]/.test(amount)) {
    yield setInvalidField('amount', 'Please input valid amount to transfer')

    return true
  }

  return false
}

function* isGasError(gas) {
  if (/\D/.test(gas)) {
    yield setInvalidField('gas', 'Please input valid gas limit value')

    return true
  }

  return false
}

function* isGasPriceError(gasPrice) {
  if (/^\d./.test(gasPrice)) {
    yield setInvalidField('gasPrice', 'Please input valid gas price value')

    return true
  }

  return false
}

function* getTransactionData(props) {
  const { accountId, password, address, amount, addressIndex, gas, gasPrice } = props
  const value = amountToWei(amount)

  if (value.lessThanOrEqualTo(0)) {
    yield setInvalidField('amount', 'Amount should be greater than 0')

    return null
  }

  const data = {
    value,
    to: address,
    privateKey: keystore.getPrivateKey(password, accountId, addressIndex).replace('0x', ''),
  }

  if (gasPrice && gasPrice.length) {
    data.gasPrice = amountToWei(gasPrice)

    if (data.gasPrice.lessThanOrEqualTo(0)) {
      yield setInvalidField('gasPrice', 'Gas price should be greater than 0')

      return null
    }
  }

  if (gas && gas.length) {
    data.gas = parseInt(gas, 10) || 0

    if (data.gasPrice <= 0) {
      yield setInvalidField('gas', 'Gas limit should be greater than 0')

      return null
    }
  }

  return data
}

function amountToWei(amount) {
  const parsedAmount = parseFloat(amount, 10) || 0
  const fixedAmount = parsedAmount.toFixed(18)
  const weiAmount = fixedAmount * (10 ** config.defaultDecimals)

  return new BigNumber(weiAmount)
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

export function* watchSendFunds() {
  yield takeEvery(SEND_FUNDS, sendFunds)
}
