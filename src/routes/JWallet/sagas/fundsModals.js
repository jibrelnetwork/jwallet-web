// @flow

import BigNumber from 'bignumber.js'
import Keystore from 'jwallet-web-keystore'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { keystore, gtm, web3 } from 'services'
import { getKeystoreAccountType, InvalidFieldError } from 'utils'

import {
  selectDigitalAssets,
  selectSendFundsModal,
  selectCurrentAccount,
  selectCurrentAccountId,
} from './stateSelectors'

import {
  SEND_FUNDS_OPEN_MODAL,
  SEND_FUNDS_CLOSE_MODAL,
  SEND_FUNDS_SET_ALERT,
  SEND_FUNDS_SET_PASSWORD,
  SEND_FUNDS_SET_INVALID_FIELD,
  SEND_FUNDS_CLEAN,
  SEND_FUNDS,
} from '../modules/modals/sendFunds'

import { RECEIVE_FUNDS_OPEN_MODAL } from '../modules/modals/receiveFunds'

import {
  CONVERT_FUNDS_SET_FROM_ACCOUNT,
  CONVERT_FUNDS_SET_FROM_ACCOUNT_ID,
  CONVERT_FUNDS_SET_TO_ACCOUNT,
  CONVERT_FUNDS_SET_TO_ACCOUNT_ID,
} from '../modules/modals/convertFunds'

function* onConvertFundsSetFromAccountId(action: { accountId: AccountId }): Saga<void> {
  const { accountId } = action

  yield setAccount(accountId, CONVERT_FUNDS_SET_FROM_ACCOUNT)
}

function* onConvertFundsSetToAccountId(action: { accountId: AccountId }): Saga<void> {
  const { accountId } = action

  yield setAccount(accountId, CONVERT_FUNDS_SET_TO_ACCOUNT)
}

function* onSendFunds(): Saga<void> {
  try {
    const sendFundsData = yield select(selectSendFundsModal)
    validateSendFundsData(sendFundsData)

    const transactionHandler = getTransactionHandler(sendFundsData.symbol)
    const transactionData = yield getTransactionData(sendFundsData)

    yield validateTransactionValue(sendFundsData.symbol, transactionData.value)
    yield call(transactionHandler, transactionData)
    yield sendFundsSuccess(sendFundsData.symbol)
  } catch (err) {
    if (err instanceof InvalidFieldError) {
      yield setInvalidField(err.fieldName, err.message)

      return
    }

    yield sendFundsFail(err)
  }
}

function* setAccount(accountId: AccountId, type: string) {
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

function* sendFundsSuccess(symbol: string) {
  const currentAccountId = yield select(selectCurrentAccountId)
  const accountData = keystore.getAccount({ id: currentAccountId })
  const accountType = getKeystoreAccountType(accountData)

  gtm.pushSendFundsSuccess(symbol, accountType)

  yield put({ type: SEND_FUNDS_CLOSE_MODAL })
  yield put({ type: SEND_FUNDS_CLEAN })
}

function* sendFundsFail(err: { message: string }) {
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
  yield put({ type: SEND_FUNDS_SET_INVALID_FIELD, fieldName, message })
}

function* setAlert(alertMessage: string) {
  yield put({ type: SEND_FUNDS_SET_ALERT, alert: alertMessage })
}

function* cleanPassword() {
  yield put({ type: SEND_FUNDS_SET_PASSWORD })
}

function getTransactionHandler(symbol: string) {
  return isETH(symbol) ? web3.sendETHTransaction : web3.sendContractTransaction
}

function* getTransactionData(data: SendFundsData) {
  const { id, addressIndex } = yield select(selectCurrentAccount)
  const { password, recipient, amount, symbol, gas, gasPrice } = data
  const { contractAddress, decimals } = yield getCurrencyBySymbol(symbol)

  const txData: {
    to: Address,
    value: BigNumber,
    privateKey: string,
    contractAddress?: Address,
    gasPrice?: BigNumber,
    gasLimit?: BigNumber,
  } = {
    to: recipient,
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

function validateSendFundsData(data: SendFundsData) {
  const { recipient, amount, gas, gasPrice } = data

  validateAddress(recipient)
  validateAmount(amount)
  validateGas(gas)
  validateGasPrice(gasPrice)
}

function validateAddress(address: Address) {
  if (!Keystore.isValidAddress(address)) {
    throw (new InvalidFieldError('address', i18n('modals.sendFunds.error.address.invalid')))
  }
}

function validateAmount(amount: string) {
  if (/[^\d.]/.test(amount)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.invalid')))
  }
}

function validateGas(gas: string | void) {
  if (gas && /\D/.test(gas)) {
    throw (new InvalidFieldError('gas', i18n('modals.sendFunds.error.gas.invalid')))
  }
}

function validateGasPrice(gasPrice: string | void) {
  if (gasPrice && /\D/.test(gasPrice)) {
    throw (new InvalidFieldError('gasPrice', i18n('modals.sendFunds.error.gasPrice.invalid')))
  }
}

function* validateTransactionValue(symbol: string, value: Bignumber) {
  if (value.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.lessThan0')))
  }

  const { decimals, balance } = yield getCurrencyBySymbol(symbol)
  const balanceValue = getTransactionValue(balance, decimals)

  if (value.greaterThan(balanceValue)) {
    throw (new InvalidFieldError('amount', i18n('modals.sendFunds.error.amount.exceedsBalance')))
  }
}

function validateTransactionGas(gas: Bignumber) {
  if (gas.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('gas', i18n('modals.sendFunds.error.gas.lessThan0')))
  }
}

function validateTransactionGasPrice(gasPrice: Bignumber) {
  if (gasPrice.lessThanOrEqualTo(0)) {
    throw (new InvalidFieldError('gasPrice', i18n('modals.sendFunds.error.gasPrice.lessThan0')))
  }
}

function getTransactionValue(amount: string, decimals: number) {
  const value = new BigNumber(amount, 10)
  const units = new BigNumber(10, 10)
  const decimalsPower = units.pow(decimals)
  const fixedValue = value.times(decimalsPower).toFixed()

  return new BigNumber(fixedValue, 10)
}

function* getCurrencyBySymbol(symbol: string) {
  const { items, balances } = yield select(selectDigitalAssets)
  const currency = items.filter(c => (c.symbol === symbol))[0]

  return {
    balance: balances[symbol],
    decimals: currency.decimals,
    contractAddress: currency.address,
  }
}

function* onSendOpenModal(): Saga<void> {
  const { balances } = yield select(selectDigitalAssets)
  const ethBalance = balances.ETH

  if (!ethBalance) {
    yield setAlert(i18n('modals.sendFunds.alert.emptyETHBalance'))
  }
}

function* onReceiveOpenModal(): Saga<void> {
  const currentAccountId = yield select(selectCurrentAccountId)

  if (!currentAccountId) {
    return
  }

  const accountData = keystore.getAccount({ id: currentAccountId })
  const accountType = getKeystoreAccountType(accountData)

  gtm.pushReceiveFunds('ReceiveFunds', accountType)
}

function isETH(symbol: string) {
  return (symbol === 'ETH')
}

export function* watchConvertFundsFromAccountId(): Saga<void> {
  yield takeEvery(CONVERT_FUNDS_SET_FROM_ACCOUNT_ID, onConvertFundsSetFromAccountId)
}

export function* watchConvertFundsToAccountId(): Saga<void> {
  yield takeEvery(CONVERT_FUNDS_SET_TO_ACCOUNT_ID, onConvertFundsSetToAccountId)
}

export function* watchSendFunds(): Saga<void> {
  yield takeEvery(SEND_FUNDS, onSendFunds)
}

export function* watchSendOpenModal(): Saga<void> {
  yield takeEvery(SEND_FUNDS_OPEN_MODAL, onSendOpenModal)
}

export function* watchReceiveOpenModal(): Saga<void> {
  yield takeEvery(RECEIVE_FUNDS_OPEN_MODAL, onReceiveOpenModal)
}
