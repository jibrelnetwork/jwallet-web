// @flow

import { delay } from 'redux-saga'
import { call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import ethereum from 'data/assets/ethereum'
import { keystore, validate, web3 } from 'services'

import {
  selectWalletId,
  selectSendFunds,
  selectDigitalAssetsItems,
  selectDigitalAssetsBalances,
} from 'store/stateSelectors'

import {
  isETH,
  toBigNumber,
  getTransactionValue,
  getDigitalAssetByAddress,
  InvalidFieldError,
} from 'utils'

import {
  OPEN,
  CLOSE,
  SET_NEXT_STEP,
  STEPS,
  close,
  setAlert,
  setCurrentStep,
  sendSuccess,
  sendError,
  clean,
} from '../modules/sendFunds'

function* openSendFunds(): Saga<void> {
  try {
    const walletId: ?WalletId = yield select(selectWalletId)
    const { isReadOnly }: Wallet = keystore.getWallet(walletId)

    // sending of funds is not available for read-only wallets
    if (isReadOnly) {
      yield put(close())
    }
  } catch (err) {
    yield put(close())
  }
}

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
    const { assetAddress }: { assetAddress: Address } = sendFundsData
    const transactionHandler = getTransactionHandler(assetAddress)
    const transactionData: TXData = yield getTransactionData(sendFundsData)

    yield call(transactionHandler, transactionData)
    yield put(sendSuccess(assetAddress))

    // TODO: show notification about successful transaction
  } catch (err) {
    yield handleSendError(err)
  }
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
  return isETH(assetAddress) ? web3.sendETHTransaction : web3.sendContractTransaction
}

function* getTransactionData(data: SendFundsData) {
  const { assetAddress, amount, recipient, gas, gasPrice, nonce, password }: SendFundsData = data
  const walletId: WalletId = yield select(selectWalletId)
  const decimals: Decimals = yield getAssetDecimals(assetAddress)

  const txData: TXData = {
    to: recipient,
    value: getTransactionValue(amount, decimals),
    privateKey: keystore.getPrivateKey(password, walletId).replace('0x', ''),
  }

  if (!isETH(assetAddress)) {
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

  return txData
}

function* getAssetDecimals(assetAddress: Address) {
  const items: DigitalAssets = yield select(selectDigitalAssetsItems)
  const asset: ?DigitalAsset = getDigitalAssetByAddress(assetAddress, items)

  return (asset && asset.decimals) ? asset.decimals : config.defaultDecimals
}

function* validateData() {
  const sendFundsData: SendFundsData = yield select(selectSendFunds)
  const { assetAddress }: SendFundsData = sendFundsData
  const ethereumBalance: number = yield getETHBalance()
  const assetBalance: number = yield getAssetBalance(assetAddress)
  const decimals: Decimals = yield getAssetDecimals(assetAddress)

  validate.txData(sendFundsData, ethereumBalance, assetBalance, decimals)
}

function* getAssetBalance(assetAddress: Address) {
  const balances: Balances = yield select(selectDigitalAssetsBalances)

  return balances[assetAddress]
}

function* getETHBalance() {
  return yield getAssetBalance(ethereum.address)
}

export function* watchSendFundsOpen(): Saga<void> {
  yield takeEvery(OPEN, openSendFunds)
}

export function* watchSendFundsClose(): Saga<void> {
  yield takeEvery(CLOSE, closeSendFunds)
}

export function* watchSendFundsSetNextStep(): Saga<void> {
  yield takeEvery(SET_NEXT_STEP, setNextStep)
}
