// @flow

import BigNumber from 'bignumber.js'
import Keystore from 'jwallet-web-keystore'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { keystore, gtm, web3 } from 'services'
import { getKeystoreAccountType, InvalidFieldError } from 'utils'

import {
  SET_ALERT,
  SET_PASSWORD,
  SET_INVALID_FIELD,
  CLEAN,
  SEND,
} from '../modules/sendFunds'

function getSendFundsData(state: { sendFunds: any }): any {
  return state.sendFunds
}

function getCurrentAccountId(state: { keystore: any }): AccountId {
  return state.keystore.currentAccount.id
}

function getDigitalAssets(state: { currencies: any }) {
  return state.currencies
}

function* onSendFunds(): Saga<void> {
  try {
    const sendFundsData = yield select(getSendFundsData)
    const { assetAddress } = sendFundsData
    const currency = yield getCurrency(assetAddress)

    const transactionHandler = getTransactionHandler(currency.symbol)
    const transactionData = getTransactionData(sendFundsData, currency)

    yield call(transactionHandler, transactionData)
    yield onSendFundsSuccess(currency.symbol)
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)

      return
    }

    yield onSendFundsError(err)
  }
}

function* onSendFundsSuccess(symbol: string) {
  const currentAccountId = select(getCurrentAccountId)
  const accountData = keystore.getAccount({ id: currentAccountId })
  const accountType = getKeystoreAccountType(accountData)

  gtm.pushSendFundsSuccess(symbol, accountType)

  yield put({ type: CLEAN })
}

function* onSendFundsError(err: { message: string }) {
  const isPasswordError = /password/i.test(err.message)

  if (isPasswordError) {
    yield setInvalidField('password', i18n('modals.sendFunds.error.password.invalid'))
  } else {
    yield cleanPassword()
    yield setAlert(i18n('modals.sendFunds.alert.internalError'))
  }

  console.error(err)
}

function* setInvalidField(fieldName: string, message: string) {
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

function* setAlert(alertMessage: string) {
  yield put({ type: SET_ALERT, alert: alertMessage })
}

function* cleanPassword() {
  yield put({ type: SET_PASSWORD, password: '' })
}

function getTransactionHandler(symbol: string) {
  return (symbol === 'ETH') ? web3.sendETHTransaction : web3.sendContractTransaction
}

function getTransactionData(props: SendFundsData, currency: any) {
  validateTransactionData(props)

  const currentAccountId = select(getCurrentAccountId)

  const { password, amount, recipient, gas, gasPrice, nonce } = props
  const { symbol, contractAddress, decimals, balance } = currency
  const value = getTransactionValue(amount, decimals)

  validateTransactionValue(value, balance, decimals)

  const data = {
    value,
    to: recipient,
    privateKey: keystore.getPrivateKey(password, currentAccountId).replace('0x', ''),
    contractAddress: undefined,
    gasPrice: undefined,
    gasLimit: undefined,
    nonce: undefined,
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

  if (nonce && nonce.length) {
    data.nonce = parseInt(nonce, 10) || 0
    validateTransactionNonce(data.nonce)
  }

  return data
}

function validateTransactionData(props: SendFundsData) {
  const { recipient, amount, gas, gasPrice, nonce } = props

  validateAddress(recipient)
  validateAmount(amount)
  validateGas(gas)
  validateGasPrice(gasPrice)
  validateNonce(nonce)
}

function validateAddress(address: Address) {
  if (!Keystore.isValidAddress(address)) {
    throw new InvalidFieldError('recipient', i18n('modals.sendFunds.error.address.invalid'))
  }
}

function validateAmount(amount: string) {
  if (/[^\d.]/.test(amount)) {
    throw new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.invalid'))
  }
}

function validateGas(gas: string | void) {
  if (gas && /\D/.test(gas)) {
    throw new InvalidFieldError('gas', i18n('modals.sendFunds.error.gas.invalid'))
  }
}

function validateGasPrice(gasPrice: string | void) {
  if (gasPrice && /\D/.test(gasPrice)) {
    throw new InvalidFieldError('gasPrice', i18n('modals.sendFunds.error.gasPrice.invalid'))
  }
}

function validateNonce(nonce: string | void) {
  if (nonce && /\D/.test(nonce)) {
    throw new InvalidFieldError('nonce', i18n('modals.sendFunds.error.gasPrice.invalid'))
  }
}

function validateTransactionValue(value: Bignumber, balance: number, decimals: number) {
  if (value.lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.lessThan0'))
  }

  const balanceUnits = balance * (10 ** decimals)

  if (value.greaterThan(balanceUnits)) {
    throw new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.exceedsBalance'))
  }
}

function validateTransactionGas(gas: Bignumber) {
  if (gas.lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('gas', i18n('modals.sendFunds.error.gas.lessThan0'))
  }
}

function validateTransactionGasPrice(gasPrice: Bignumber) {
  if (gasPrice.lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('gasPrice', i18n('modals.sendFunds.error.gasPrice.lessThan0'))
  }
}

function validateTransactionNonce(nonce: number) {
  if (nonce < 0) {
    throw new InvalidFieldError('nonce', i18n('modals.sendFunds.error.gasPrice.lessThan0'))
  }
}

function getTransactionValue(amount: string, decimals: number) {
  const parsedAmount = parseFloat(amount) || 0
  const fixedAmount = parseInt(parsedAmount.toFixed(18), 10)
  const unitsAmount = fixedAmount * (10 ** decimals)

  return new BigNumber(unitsAmount, 10)
}

function* getCurrency(address: Address) {
  const { items, balances } = yield select(getDigitalAssets)
  const currency = items.filter(c => (c.address === address))[0] || {}

  return {
    symbol: currency.symbol,
    contractAddress: address,
    balance: balances[currency.symbol] || 0,
    decimals: currency.decimals || config.defaultDecimals,
  }
}

export function* watchSendFunds(): Saga<void> {
  yield takeEvery(SEND, onSendFunds)
}
