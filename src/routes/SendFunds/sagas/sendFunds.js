// @flow

import BigNumber from 'bignumber.js'
import Keystore from 'jwallet-web-keystore'
import { find, propEq } from 'ramda'
import { push } from 'react-router-redux'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import { keystore, gtm, web3 } from 'services'
import { InvalidFieldError } from 'utils/errors'
import { ethereum } from 'utils/getDefaultDigitalAssets'
import { selectDigitalAssets, selectKeystore, selectSendFunds } from 'store/stateSelectors'

import {
  SET_ALERT,
  SET_PASSWORD,
  SET_INVALID_FIELD,
  SET_CURRENT_STEP,
  GO_TO_PASSWORD_STEP,
  CLEAN,
  SEND,
  STEPS,
} from '../modules/sendFunds'

declare type AssetData = {
  balance: number,
  decimals: number,
  contractAddress: Address,
}

declare type TXData = {
  to: Address,
  value: BigNumber,
  privateKey: string,
  contractAddress?: Address,
  gasPrice?: BigNumber,
  gasLimit?: BigNumber,
  nonce?: BigNumber,
}

function* onSendFunds(): Saga<void> {
  try {
    const sendFundsData: SendFundsData = yield select(selectSendFunds)
    const { symbol }: { symbol: string } = sendFundsData
    const transactionHandler = getTransactionHandler(symbol)
    const transactionData: TXData = yield getTransactionData(sendFundsData)

    yield call(transactionHandler, transactionData)
    yield onSendFundsSuccess(symbol)
  } catch (err) {
    yield onSendFundsError(err)
  }
}

function* onSendFundsSuccess(symbol: string) {
  const keystoreData: KeystoreData = yield select(selectKeystore)
  const walletId: AccountId = keystoreData.currentAccount.id
  const { customType }: Account = keystore.getWallet(walletId)

  gtm.pushSendFundsSuccess(symbol, customType)

  yield put(push('/'))
  yield put({ type: CLEAN })

  // TODO: show notification about successful transaction
}

function* onSendFundsError(err: { message: string }) {
  const isPasswordError: boolean = /password/i.test(err.message)

  if (isPasswordError) {
    yield setInvalidField('password', i18n('routes.sendFunds.error.password.invalid'))
  } else {
    yield setAlert(i18n('routes.sendFunds.alert.internalError'))
    yield setCurrentStep(STEPS.FORM)
    yield cleanPassword()

    // TODO: show notification about failed transaction
  }

  // console.error(err)
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
  return isETH(symbol) ? web3.sendETHTransaction : web3.sendContractTransaction
}

function* getTransactionData(data: SendFundsData) {
  const keystoreData: KeystoreData = yield select(selectKeystore)
  const { id }: Account = keystoreData.currentAccount
  const { symbol, amount, recipient, gas, gasPrice, nonce, password }: SendFundsData = data
  const { contractAddress, decimals }: AssetData = yield getAsset(symbol)

  const txData: TXData = {
    to: recipient,
    value: getTransactionValue(amount, decimals),
    privateKey: keystore.getPrivateKey(password, id).replace('0x', ''),
  }

  if (!isETH(symbol)) {
    txData.contractAddress = contractAddress
  }

  if (gasPrice) {
    txData.gasPrice = toBigNumber(gasPrice)
  }

  if (gas) {
    txData.gasLimit = toBigNumber(gas)
  }

  if (nonce) {
    txData.nonce = toBigNumber(nonce)
  }

  return txData
}

function isETH(symbol: string): boolean {
  return (symbol === 'ETH')
}

function getTransactionValue(amount: string | number, decimals: number): Bignumber {
  const value: Bignumber = toBigNumber(amount)
  const units: Bignumber = toBigNumber(10)

  const decimalsPower: Bignumber = units.pow(decimals)
  const fixedValue: string = value.times(decimalsPower).toFixed()

  return toBigNumber(fixedValue)
}

function toBigNumber(value: string | number): Bignumber {
  return new BigNumber((parseFloat(value) || 0), 10)
}

function* getAsset(symbol: string) {
  const { items, balances }: DigitalAssetsData = yield select(selectDigitalAssets)
  const asset: DigitalAsset = find(propEq('symbol', symbol))(items) || ethereum

  return {
    balance: balances[symbol],
    decimals: asset.decimals,
    contractAddress: asset.address,
  }
}

function* onGoToPasswordStep(): Saga<void> {
  try {
    yield validateData()
    yield setCurrentStep(STEPS.PASSWORD)
  } catch (err) {
    const { fieldName, message }: { fieldName: string, message: string } = err
    yield setInvalidField(fieldName, message)
  }
}

function* setCurrentStep(currentStep: Index) {
  yield put({ type: SET_CURRENT_STEP, currentStep })
}

function* validateData() {
  const sendFundsData: SendFundsData = yield select(selectSendFunds)
  const { symbol, amount, recipient, gas, gasPrice, nonce }: SendFundsData = sendFundsData

  yield validateETHBalance()
  yield validateAmount(amount, symbol)

  validateAddress(recipient)
  validateGas(gas)
  validateGasPrice(gasPrice)
  validateNonce(nonce)
}

function* validateETHBalance() {
  const { balances }: DigitalAssetsData = yield select(selectDigitalAssets)
  const ethBalance: number = balances.ETH

  if (!ethBalance) {
    throw new InvalidFieldError('amount', i18n('routes.sendFunds.error.amount.emptyETHBalance'))
  }
}

function* validateAmount(amount: string, symbol: string) {
  if (/[^\d.]/.test(amount)) {
    throw new InvalidFieldError('amount', i18n('routes.sendFunds.error.amount.invalid'))
  }

  const { balance, decimals }: AssetData = yield getAsset(symbol)
  const value: BigNumber = getTransactionValue(amount, decimals)

  if (value.lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('amount', i18n('routes.sendFunds.error.amount.lessThan0'))
  }

  const balanceValue: BigNumber = getTransactionValue(balance, decimals)

  if (value.greaterThan(balanceValue)) {
    throw new InvalidFieldError('amount', i18n('routes.sendFunds.error.amount.exceedsBalance'))
  }
}

function validateAddress(address: Address) {
  if (!Keystore.isValidAddress(address)) {
    throw new InvalidFieldError(
      'recipient',
      i18n('routes.sendFunds.error.recipient.invalid'),
    )
  }
}

function validateGas(gas: string | void) {
  if (gas && /\D/.test(gas)) {
    throw new InvalidFieldError('gas', i18n('routes.sendFunds.error.gas.invalid'))
  }

  if (gas && toBigNumber(gas).lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('gas', i18n('routes.sendFunds.error.gas.lessThan0'))
  }
}

function validateGasPrice(gasPrice: string | void) {
  if (gasPrice && /\D/.test(gasPrice)) {
    throw new InvalidFieldError('gasPrice', i18n('routes.sendFunds.error.gasPrice.invalid'))
  }

  if (gasPrice && toBigNumber(gasPrice).lessThanOrEqualTo(0)) {
    throw new InvalidFieldError('gasPrice', i18n('routes.sendFunds.error.gasPrice.lessThan0'))
  }
}

function validateNonce(nonce: string | void) {
  if (nonce && /\D/.test(nonce)) {
    throw new InvalidFieldError('nonce', i18n('routes.sendFunds.error.nonce.invalid'))
  }

  if (nonce && toBigNumber(nonce).lessThan(0)) {
    throw new InvalidFieldError('nonce', i18n('routes.sendFunds.error.nonce.lessThan0'))
  }
}

export function* watchSendFunds(): Saga<void> {
  yield takeEvery(SEND, onSendFunds)
}

export function* watchGoToPasswordStep(): Saga<void> {
  yield takeEvery(GO_TO_PASSWORD_STEP, onGoToPasswordStep)
}
