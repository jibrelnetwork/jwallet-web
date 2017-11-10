import { call, put, select, takeEvery } from 'redux-saga/effects'
import BigNumber from 'bignumber.js'
import Keystore from 'jwallet-web-keystore'

import config from 'config'
import { keystore, web3 } from 'services'
import { InvalidFieldError, isMnemonicType } from 'utils'

import { selectCurrencies, selectSendFundsModal } from './stateSelectors'

import {
  SEND_FUNDS_CLOSE_MODAL,
  SEND_FUNDS_SET_ALERT,
  SEND_FUNDS_SET_ACCOUNT_ID,
  SEND_FUNDS_SET_ACCOUNT,
  SEND_FUNDS_SET_PASSWORD,
  SEND_FUNDS_SET_INVALID_FIELD,
  SEND_FUNDS_CLEAR,
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

function* onSendFundsSetAccountId(action = {}) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, SEND_FUNDS_SET_ACCOUNT)
}

function* onConvertFundsSetFromAccountId(action = {}) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, CONVERT_FUNDS_SET_FROM_ACCOUNT)
}

function* onConvertFundsSetToAccountId(action = {}) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, CONVERT_FUNDS_SET_TO_ACCOUNT)
}

function* onReceiveFundsSetAccountId(action = {}) {
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

function* onSendFunds() {
  try {
    const sendFundsData = yield select(selectSendFundsModal)
    const { onClose, symbol } = sendFundsData || {}
    const currency = yield getCurrencyBySymbol(symbol)

    const transactionHandler = getTransactionHandler(symbol)
    const transactionData = getTransactionData({ ...sendFundsData, currency })

    yield call(transactionHandler, transactionData)
    yield sendFundsSuccess(onClose)
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)

      return
    }

    yield sendFundsFail(err)
  }
}

function* setAccount(accountId = '', accounts = [], type = '') {
  yield put({
    type,
    currentAccount: accounts.filter(account => (account.id === accountId)).shift(),
  })
}

function getAddressFromMnemonicByIndex(accountId = '', addressIndex = 0) {
  const iteration = 0
  const limit = (addressIndex + 1)
  const addresses = keystore.getAddressesFromMnemonic(accountId, iteration, limit) || []

  return addresses[addressIndex] || {}
}

function* sendFundsSuccess(onClose) {
  yield put({ type: SEND_FUNDS_CLOSE_MODAL })
  yield put({ type: SEND_FUNDS_CLEAR })

  return onClose ? onClose() : null
}

function* sendFundsFail(err = {}) {
  const isPasswordError = /password/i.test(err.message)

  if (isPasswordError) {
    yield setInvalidField('password', 'Password is incorrect')
  } else {
    yield cleanPassword()
    yield setAlert('Sending of the transaction was failed. Please try again later')
  }

  console.error(err)
}

function* setInvalidField(fieldName = '', message = '') {
  yield put({ type: SEND_FUNDS_SET_INVALID_FIELD, fieldName, message })
}

function* setAlert(alert = '') {
  yield put({ type: SEND_FUNDS_SET_ALERT, alert })
}

function* cleanPassword() {
  yield put({ type: SEND_FUNDS_SET_PASSWORD })
}

function getTransactionHandler(symbol = '') {
  return (symbol === 'ETH') ? web3.sendETHTransaction : web3.sendContractTransaction
}

function getTransactionData(props = {}) {
  validateTransactionData(props)

  const { currency, accountId, password, address, amount, addressIndex, gas, gasPrice } = props
  const { symbol, contractAddress, decimals, balance } = currency
  const value = getTransactionValue(amount, decimals)

  validateTransactionValue(value, balance)

  const data = {
    value,
    to: address,
    privateKey: keystore.getPrivateKey(password, accountId, addressIndex).replace('0x', ''),
  }

  if (symbol !== 'ETH') {
    data.contractAddress = contractAddress
  }

  if (gasPrice && gasPrice.length) {
    data.gasPrice = new BigNumber(parseInt(gasPrice, 10) || 0, 10)
    validateTransactionGasPrice(data.gasPrice)
  }

  if (gas && gas.length) {
    data.gasLimit = new BigNumber(parseInt(gas, 10) || 0, 10)
    validateTransactionGas(data.gasLimit)
  }

  return data
}

function validateTransactionData(props = {}) {
  const { accountId, address, amount, gas, gasPrice } = props

  validateAccountId(accountId)
  validateAddress(address)
  validateAmount(amount)
  validateGas(gas)
  validateGasPrice(gasPrice)
}

function validateAccountId(accountId = '') {
  if (!(accountId && accountId.length)) {
    throw (new InvalidFieldError('account', 'Please select account'))
  }
}

function validateAddress(address = '') {
  if (!Keystore.isHexStringValid(address, 40)) {
    throw (new InvalidFieldError('address', 'Please input valid account address'))
  }
}

function validateAmount(amount = '') {
  if (/[^\d.]/.test(amount)) {
    throw (new InvalidFieldError('amount', 'Please input valid amount to transfer'))
  }
}

function validateGas(gas = '') {
  if (/\D/.test(gas)) {
    throw (new InvalidFieldError('gas', 'Please input valid gas limit value'))
  }
}

function validateGasPrice(gasPrice = '') {
  if (/\D/.test(gasPrice)) {
    throw (new InvalidFieldError('gasPrice', 'Please input valid gas price value'))
  }
}

function validateTransactionValue(value = 0, balance = 0, decimals = config.defaultDecimals) {
  if (value.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('amount', 'Amount should be greater than 0'))
  }

  const balanceUnits = balance * (10 ** decimals)

  if (value.greaterThan(balanceUnits)) {
    throw (new InvalidFieldError('amount', 'Amount exceeds account balance'))
  }
}

function validateTransactionGas(gas = 0) {
  if (gas.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('gas', 'Gas limit should be greater than 0'))
  }
}

function validateTransactionGasPrice(gasPrice = 0) {
  if (gasPrice.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('gasPrice', 'Gas price should be greater than 0'))
  }
}

function getTransactionValue(amount = '', decimals = config.defaultDecimals) {
  const parsedAmount = parseFloat(amount, 10) || 0
  const fixedAmount = parsedAmount.toFixed(18)
  const unitsAmount = fixedAmount * (10 ** decimals)

  return new BigNumber(unitsAmount, 10)
}

function* getCurrencyBySymbol(symbol = '') {
  const { items, balances } = yield select(selectCurrencies)
  const currency = items.filter(c => (c.symbol === symbol))[0] || {}

  return {
    symbol,
    balance: balances[symbol] || 0,
    contractAddress: currency.address || '',
    decimals: currency.decimals || config.defaultDecimals,
  }
}

export function* watchSendFundsAccountId() {
  yield takeEvery(SEND_FUNDS_SET_ACCOUNT_ID, onSendFundsSetAccountId)
}

export function* watchConvertFundsFromAccountId() {
  yield takeEvery(CONVERT_FUNDS_SET_FROM_ACCOUNT_ID, onConvertFundsSetFromAccountId)
}

export function* watchConvertFundsToAccountId() {
  yield takeEvery(CONVERT_FUNDS_SET_TO_ACCOUNT_ID, onConvertFundsSetToAccountId)
}

export function* watchReceiveFundsAccountId() {
  yield takeEvery(RECEIVE_FUNDS_SET_ACCOUNT_ID, onReceiveFundsSetAccountId)
}

export function* watchSendFunds() {
  yield takeEvery(SEND_FUNDS, onSendFunds)
}
