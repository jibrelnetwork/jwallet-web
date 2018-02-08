import BigNumber from 'bignumber.js'
import isEmpty from 'lodash/isEmpty'
import Keystore from 'jwallet-web-keystore'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { keystore, gtm, web3 } from 'services'
import { getKeystoreAccountType, InvalidFieldError } from 'utils'

import { selectDigitalAssets, selectSendFundsModal, selectCurrentAccountId } from './stateSelectors'

import {
  SEND_FUNDS_OPEN_MODAL,
  SEND_FUNDS_CLOSE_MODAL,
  SEND_FUNDS_SET_ALERT,
  SEND_FUNDS_SET_ACCOUNT_ID,
  SEND_FUNDS_SET_ACCOUNT,
  SEND_FUNDS_SET_PASSWORD,
  SEND_FUNDS_SET_INVALID_FIELD,
  SEND_FUNDS_CLEAR,
  SEND_FUNDS,
} from '../modules/modals/sendFunds'

import { RECEIVE_FUNDS_OPEN_MODAL } from '../modules/modals/receiveFunds'

import {
  CONVERT_FUNDS_SET_FROM_ACCOUNT,
  CONVERT_FUNDS_SET_FROM_ACCOUNT_ID,
  CONVERT_FUNDS_SET_TO_ACCOUNT,
  CONVERT_FUNDS_SET_TO_ACCOUNT_ID,
} from '../modules/modals/convertFunds'

function* onSendFundsSetAccountId(action) {
  const { accountId } = action

  yield setAccount(accountId, SEND_FUNDS_SET_ACCOUNT)
}

function* onConvertFundsSetFromAccountId(action) {
  const { accountId } = action

  yield setAccount(accountId, CONVERT_FUNDS_SET_FROM_ACCOUNT)
}

function* onConvertFundsSetToAccountId(action) {
  const { accountId } = action

  yield setAccount(accountId, CONVERT_FUNDS_SET_TO_ACCOUNT)
}

function* onSendFunds() {
  try {
    const sendFundsData = yield select(selectSendFundsModal)
    validateSendFundsData(sendFundsData)

    const transactionHandler = getTransactionHandler(sendFundsData.symbol)
    const transactionData = yield getTransactionData(sendFundsData)

    yield validateTransactionValue(sendFundsData, transactionData.value)
    yield call(transactionHandler, transactionData)
    yield sendFundsSuccess(sendFundsData)
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)

      return
    }

    yield sendFundsFail(err)
  }
}

function* setAccount(accountId, type) {
  const { address, addressIndex, accountName } = keystore.getAccount({ id: accountId })

  yield put({
    type,
    currentAccount: {
      accountName,
      addressIndex,
      id: accountId,
      address: address || keystore.getAddressFromMnemonic(accountId, addressIndex),
    },
  })
}

function* sendFundsSuccess({ currentAccount, symbol }) {
  const accountData = keystore.getAccount({ id: currentAccount.id })
  const accountType = getKeystoreAccountType(accountData)

  gtm.pushSendFundsSuccess(symbol, accountType)

  yield put({ type: SEND_FUNDS_CLOSE_MODAL })
  yield put({ type: SEND_FUNDS_CLEAR })
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
  return isETH(symbol) ? web3.sendETHTransaction : web3.sendContractTransaction
}

function* getTransactionData(data) {
  const { currentAccount, password, address, amount, symbol, gas, gasPrice } = data
  const { id, addressIndex } = currentAccount
  const { contractAddress, decimals } = yield getCurrencyBySymbol(symbol)

  const txData = {
    to: address,
    value: getTransactionValue(amount, decimals),
    privateKey: keystore.getPrivateKey(password, id, addressIndex).replace('0x', ''),
  }

  if (!isETH(symbol)) {
    txData.contractAddress = contractAddress
  }

  if (gasPrice && gasPrice.length) {
    txData.gasPrice = new BigNumber(parseInt(gasPrice, 10) || 0, 10)
    validateTransactionGasPrice(txData.gasPrice)
  }

  if (gas && gas.length) {
    txData.gasLimit = new BigNumber(parseInt(gas, 10) || 0, 10)
    validateTransactionGas(txData.gasLimit)
  }

  return txData
}

function validateSendFundsData(data) {
  const { currentAccount, address, amount, gas, gasPrice } = data

  validateAccountId(currentAccount.id)
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
  if (!Keystore.isValidAddress(address)) {
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

function* validateTransactionValue(data, value) {
  if (value.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.lessThan0')))
  }

  /**
   * Get balance of selected account
   */
  const { currentAccount, symbol } = data
  const { address } = currentAccount
  const { contractAddress, decimals } = yield getCurrencyBySymbol(symbol)

  const currentAccountBalance = isETH(symbol)
    ? yield web3.getETHBalance(address)
    : yield web3.getTokenBalance(contractAddress, address, decimals)

  const balanceUnits = currentAccountBalance * (10 ** decimals)

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
  const value = new BigNumber(amount, 10)
  const units = new BigNumber(10, 10)
  const decimalsPower = units.pow(decimals)
  const fixedValue = value.times(decimalsPower).toFixed()

  return new BigNumber(fixedValue, 10)
}

function* getCurrencyBySymbol(symbol) {
  const { items } = yield select(selectDigitalAssets)
  const currency = items.filter(c => (c.symbol === symbol))[0]

  return {
    contractAddress: currency.address,
    decimals: currency.decimals,
  }
}

function* onSendFundsOpenModal() {
  const { currentAccount } = yield select(selectSendFundsModal)

  if (currentAccount.id) {
    yield setAccount(currentAccount.id, SEND_FUNDS_SET_ACCOUNT)
  }
}

function* onReceiveOpenModal() {
  const currentAccountId = yield select(selectCurrentAccountId)

  if (!currentAccountId) {
    return
  }

  const accountData = keystore.getAccount({ id: currentAccountId })
  const accountType = getKeystoreAccountType(accountData)

  gtm.pushReceiveFunds('ReceiveFunds', accountType)
}

function isETH(symbol) {
  return (symbol === 'ETH')
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

export function* watchSendFundsOpenModal() {
  yield takeEvery(SEND_FUNDS_OPEN_MODAL, onSendFundsOpenModal)
}

export function* watchReceiveOpenModal() {
  yield takeEvery(RECEIVE_FUNDS_OPEN_MODAL, onReceiveOpenModal)
}
