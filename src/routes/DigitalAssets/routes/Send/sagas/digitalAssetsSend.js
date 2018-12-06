// @flow

import { select, all, put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import keystore from '@jibrelnetwork/jwallet-web-keystore'
import { BigNumber } from 'bignumber.js'

import web3 from 'services/web3'
import { selectActiveWalletAddress } from 'store/selectors/wallets'
import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import {
  OPEN_VIEW,
  SUBMIT_STEP_ONE,
  // setStep,
  setField,
  setFieldError,
  clearFieldError,
  typeof openView as OpenView,
} from '../modules/digitalAssetsSend'

/**
 * Open/close view logic
 */
function* openView(action: ExtractReturn<OpenView>): Saga<void> {
  const activeAddress = yield select(selectActiveWalletAddress)
  yield put(setField('ownerAddress', activeAddress))
  yield put(setField('assetAddress', 'Ethereum'))
}

function* checkErrors(): Saga<boolean> {
  const { invalidFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  return !!(Object.keys(invalidFields).find(fieldName => invalidFields[fieldName] !== ''))
}

function* clearErrors(): Saga<void> {
  const { invalidFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  yield all(Object
    .keys(invalidFields)
    .map(fieldName => put(clearFieldError(fieldName)))
  )
}

function* trimFields(): Saga<void> {
  const { formFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  const fieldNames: Array<$Keys<DigitalAssetSendFormFields>> = Object.keys(formFields)

  yield all(fieldNames.map(fieldName =>
    formFields[fieldName].trim() !== formFields[fieldName]
      ? put(setField(fieldName, formFields[fieldName].trim()))
      : call(() => null))
  )
}

function* validate(): Saga<void> {
  const { formFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  const {
    ownerAddress,
    recepientAddress,
    assetAddress,
    amount,
    // amountFiat,
    // priority,
    // comment,
    // nonce,
  } = formFields

  if (!keystore.checkAddressValid(ownerAddress)) {
    yield put(setFieldError('ownerAddress', 'Invalid owner address'))
  }

  if (!keystore.checkAddressValid(recepientAddress)) {
    yield put(setFieldError('recepientAddress', 'Invalid recepient address'))
  }

  const asset: ?DigitalAsset = yield select(selectDigitalAsset, assetAddress)
  if (!asset) {
    yield put(setFieldError('assetAddress', 'Invalid asset address'))
  }

  try {
    const amountBN = new BigNumber(amount)
    if (amountBN.eq(0) || amountBN.lt(0)) {
      yield put(setFieldError('amount', 'Amount to send should be grater than 0'))
    }
  } catch (error) {
    yield put(setFieldError('amount', 'Invalid amount value'))
  }
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

function* sendFormSubmit(): Saga<void> {
  yield* trimFields()
  yield* clearErrors()
  yield* validate()

  if (!(yield* checkErrors())) {
    yield put(push('/digital-assets/send/confirm'))
  }
}

function* passwordSubmit(): Saga<void> {

}

export function* digitalAssetsSendRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, openView)
  yield takeEvery(, sendFormSubmit)
}
