import BigNumber from 'bignumber.js'
import isEmpty from 'lodash/isEmpty'
import Keystore from 'jwallet-web-keystore'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { keystore, web3 } from 'services'
import { InvalidFieldError } from 'utils/errors'

import { selectDigitalAssets, selectSendFundsModal } from './stateSelectors'

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
  CONVERT_FUNDS_SET_FROM_ACCOUNT,
  CONVERT_FUNDS_SET_FROM_ACCOUNT_ID,
  CONVERT_FUNDS_SET_TO_ACCOUNT,
  CONVERT_FUNDS_SET_TO_ACCOUNT_ID,
} from '../modules/modals/convertFunds'

function* onSendFundsSetAccountId(action) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, SEND_FUNDS_SET_ACCOUNT)
}

function* onConvertFundsSetFromAccountId(action) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, CONVERT_FUNDS_SET_FROM_ACCOUNT)
}

function* onConvertFundsSetToAccountId(action) {
  const { accountId, accounts } = action

  yield setAccount(accountId, accounts, CONVERT_FUNDS_SET_TO_ACCOUNT)
}

function* onSendFunds() {
  try {
    const sendFundsData = yield select(selectSendFundsModal)
    const { onClose, symbol } = sendFundsData
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

function* setAccount(accountId, accounts, type) {
  yield put({
    type,
    currentAccount: accounts.filter(account => (account.id === accountId)).shift(),
  })
}

function* sendFundsSuccess(onClose) {
  yield put({ type: SEND_FUNDS_CLOSE_MODAL })
  yield put({ type: SEND_FUNDS_CLEAR })

  return onClose ? onClose() : null
}

function* sendFundsFail(err) {
  const isPasswordError = /password/i.test(err.message)

  if (isPasswordError) {
    yield setInvalidField('password', i18n('modals.sendFunds.error.password.invalid'))
  } else {
    yield cleanPassword()
    yield setAlert(i18n('modals.sendFunds.alert.internalError'))
  }

  console.error(err)
}

function* setInvalidField(fieldName, message) {
  yield put({ type: SEND_FUNDS_SET_INVALID_FIELD, fieldName, message })
}

function* setAlert(alertMessage) {
  yield put({ type: SEND_FUNDS_SET_ALERT, alert: alertMessage })
}

function* cleanPassword() {
  yield put({ type: SEND_FUNDS_SET_PASSWORD })
}

function getTransactionHandler(symbol) {
  return (symbol === 'ETH') ? web3.sendETHTransaction : web3.sendContractTransaction
}

function getTransactionData(props) {
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

function validateTransactionData(props) {
  const { accountId, address, amount, gas, gasPrice } = props

  validateAccountId(accountId)
  validateAddress(address)
  validateAmount(amount)
  validateGas(gas)
  validateGasPrice(gasPrice)
}

function validateAccountId(accountId) {
  if (isEmpty(accountId)) {
    throw (new InvalidFieldError('account', i18n('modals.sendFunds.error.account.notSelected')))
  }
}

function validateAddress(address) {
  if (!Keystore.isHexStringValid(address, 40)) {
    throw (new InvalidFieldError('address', i18n('modals.sendFunds.error.address.invalid')))
  }
}

function validateAmount(amount) {
  if (/[^\d.]/.test(amount)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.invalid')))
  }
}

function validateGas(gas) {
  if (/\D/.test(gas)) {
    throw (new InvalidFieldError('gas', i18n('modals.sendFunds.error.gas.invalid')))
  }
}

function validateGasPrice(gasPrice) {
  if (/\D/.test(gasPrice)) {
    throw (new InvalidFieldError('gasPrice', i18n('modals.sendFunds.error.gasPrice.invalid')))
  }
}

function validateTransactionValue(value, balance, decimals) {
  if (value.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.lessThan0')))
  }

  const balanceUnits = balance * (10 ** decimals)

  if (value.greaterThan(balanceUnits)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.exceedsBalance')))
  }
}

function validateTransactionGas(gas) {
  if (gas.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('gas', i18n('modals.sendFunds.error.gas.lessThan0')))
  }
}

function validateTransactionGasPrice(gasPrice) {
  if (gasPrice.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('gasPrice', i18n('modals.sendFunds.error.gasPrice.lessThan0')))
  }
}

function getTransactionValue(amount, decimals) {
  const parsedAmount = parseFloat(amount, 10) || 0
  const fixedAmount = parsedAmount.toFixed(18)
  const unitsAmount = fixedAmount * (10 ** decimals)

  return new BigNumber(unitsAmount, 10)
}

function* getCurrencyBySymbol(symbol) {
  const { items, balances } = yield select(selectDigitalAssets)
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

export function* watchSendFunds() {
  yield takeEvery(SEND_FUNDS, onSendFunds)
}
