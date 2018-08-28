// @flow

import { delay } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import ethereum from 'data/assets/ethereum'
import InvalidFieldError from 'utils/errors/InvalidFieldError'
import { keystore, validate, web3 } from 'services'
import { getTransactionValue, toBigNumber } from 'utils/transactions'
import { getAssetDecimals, checkEthereumAsset } from 'utils/digitalAssets'

import {
  selectWalletId,
  selectSendFunds,
  selectDigitalAssetsItems,
  selectDigitalAssetsBalances,
} from 'store/stateSelectors'

import {
  CLOSE,
  SET_NEXT_STEP,
  STEPS,
  setAlert,
  setCurrentStep,
  setIsSending,
  sendSuccess,
  sendError,
  clean,
} from '../modules/sendFunds'

function* closeSendFunds(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setNextStep(): Saga<void> {
  const { currentStep }: SendFundsData = yield select(selectSendFunds)

  try {
    switch (currentStep) {
      case STEPS.FORM: {
        yield checkData()
        break
      }

      case STEPS.PASSWORD: {
        yield sendFunds()
        break
      }

      default: break
    }
  } catch (err) {
    yield put(sendError(err))
  }
}

function* checkData() {
  yield validateData()
  yield put(setCurrentStep(STEPS.PASSWORD))
}

function* sendFunds() {
  try {
    const sendFundsData: SendFundsData = yield select(selectSendFunds)
    const { assetAddress }: SendFundsData = sendFundsData
    const transactionHandler = getTransactionHandler(assetAddress)
    const transactionData: TXData = yield getTransactionData(sendFundsData)

    yield put(setIsSending(true))
    yield call(transactionHandler, transactionData)
    yield put(sendSuccess(assetAddress))

    // TODO: show notification about successful transaction
  } catch (err) {
    yield handleSendError(err)
  }

  yield put(setIsSending(false))
}

function* handleSendError({ message }: InvalidFieldError) {
  const isPasswordError: boolean = /password/i.test(message)

  if (isPasswordError) {
    throw new InvalidFieldError('password', i18n('general.error.password.invalid'))
  }

  yield put(setAlert(i18n('routes.sendFunds.alert.internalError')))
  yield put(setCurrentStep(STEPS.FORM))

  // TODO: show notification about failed transaction
}

function getTransactionHandler(assetAddress: Address) {
  return checkEthereumAsset(assetAddress) ? web3.sendETHTransaction : web3.sendContractTransaction
}

function* getTransactionData(data: SendFundsData) {
  const { assetAddress, amount, recipient, gas, gasPrice, nonce, password }: SendFundsData = data
  const walletId: WalletId = yield select(selectWalletId)
  const items: DigitalAssets = yield select(selectDigitalAssetsItems)
  const decimals: Decimals = getAssetDecimals(assetAddress, items)

  const txData: TXData = {
    to: recipient,
    value: getTransactionValue(amount, decimals),
    privateKey: keystore.getPrivateKey(password, walletId).replace('0x', ''),
  }

  /* eslint-disable fp/no-mutation */
  if (!checkEthereumAsset(assetAddress)) {
    txData.contractAddress = assetAddress
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
  /* eslint-enable fp/no-mutation */

  return txData
}

function* validateData() {
  const sendFundsData: SendFundsData = yield select(selectSendFunds)
  const { assetAddress }: SendFundsData = sendFundsData
  const ethereumBalance: number = yield getETHBalance()
  const assetBalance: number = yield getAssetBalance(assetAddress)
  const items: DigitalAssets = yield select(selectDigitalAssetsItems)
  const decimals: Decimals = getAssetDecimals(assetAddress, items)

  validate.txData(sendFundsData, ethereumBalance, assetBalance, decimals)
}

function* getAssetBalance(assetAddress: Address) {
  const balances: Balances = yield select(selectDigitalAssetsBalances)

  return balances[assetAddress]
}

function* getETHBalance() {
  return yield getAssetBalance(ethereum.address)
}

export function* watchSendFundsClose(): Saga<void> {
  yield takeEvery(CLOSE, closeSendFunds)
}

export function* watchSendFundsSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}
