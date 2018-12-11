// @flow

import { select, all, put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import keystore from '@jibrelnetwork/jwallet-web-keystore'
import { BigNumber } from 'bignumber.js'

import checkETH from 'utils/digitalAssets/checkETH'
import web3 from 'services/web3'
import { getTransactionValue } from 'utils/transactions'
import {
  selectActiveWalletAddress,
  selectActiveWalletId,
} from 'store/selectors/wallets'
import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'
import { selectCurrentNetwork } from 'store/selectors/networks'

import { getPrivateKey } from 'routes/Wallets/sagas'

import * as digitalAssetsSend from '../modules/digitalAssetsSend'

/**
 * Open/close view logic
 */
function* openView(/* action: ExtractReturn<typeof digitalAssetsSend.openView> */): Saga<void> {
  const activeAddress = yield select(selectActiveWalletAddress)
  yield put(digitalAssetsSend.setField('ownerAddress', activeAddress))
  yield put(digitalAssetsSend.setField('assetAddress', 'Ethereum'))
}

function* checkErrors(): Saga<boolean> {
  const { invalidFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  return !!(Object.keys(invalidFields).find(fieldName => invalidFields[fieldName] !== ''))
}

function* clearErrors(): Saga<void> {
  const { invalidFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  yield all(Object
    .keys(invalidFields)
    .map(fieldName => put(digitalAssetsSend.clearFieldError(fieldName)))
  )
}

function* trimFields(): Saga<void> {
  const { formFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  const fieldNames: Array<$Keys<DigitalAssetSendFormFields>> = Object.keys(formFields)

  yield all(fieldNames.map(fieldName =>
    formFields[fieldName].trim() !== formFields[fieldName]
      ? put(digitalAssetsSend.setField(fieldName, formFields[fieldName].trim()))
      : call(() => null))
  )
}

function* validate(): Saga<void> {
  const { formFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  const {
    ownerAddress,
    recepient,
    assetAddress,
    amount,
    // amountFiat,
    // priority,
    // comment,
    // nonce,
  } = formFields

  if (!keystore.checkAddressValid(ownerAddress)) {
    yield put(digitalAssetsSend.setFieldError('ownerAddress', 'Invalid owner address'))
  }

  if (!keystore.checkAddressValid(recepient)) {
    yield put(digitalAssetsSend.setFieldError('recepient', 'Invalid recepient address'))
  }

  const asset: ?DigitalAsset = yield select(selectDigitalAsset, assetAddress)
  if (!asset) {
    yield put(digitalAssetsSend.setFieldError('assetAddress', 'Invalid asset address'))
  }

  const amountBN = new BigNumber(amount)
  if (amountBN.isNaN() || amountBN.eq(0) || amountBN.lt(0)) {
    yield put(digitalAssetsSend.setFieldError('amount', 'Invalid amount value'))
  }
}

type GetTransactionDataPayload = {
  asset: DigitalAsset,
  recepient: Address,
  amount: string,
  gas: string,
  gasPrice: string,
  nonce: string,
  privateKey: string,
}

function getTransactionData(data: GetTransactionDataPayload): TXData {
  const {
    asset,
    recepient,
    amount,
    gasLimit,
    gasPrice,
    nonce,
    privateKey,
  } = data

  const txData: TXData = {
    to: recepient,
    value: getTransactionValue(amount, asset.decimals),
    privateKey,
  }

  /* eslint-disable fp/no-mutation */
  if (!checkETH(asset.address)) {
    txData.contractAddress = asset.address
  }

  if (gasPrice) {
    txData.gasPrice = new BigNumber(gasPrice)
  }

  if (gasLimit) {
    txData.gasLimit = new BigNumber(gasLimit)
  }

  if (nonce) {
    txData.nonce = new BigNumber(nonce)
  }
  /* eslint-enable fp/no-mutation */

  return txData
}

function* submitSendForm(): Saga<void> {
  yield* trimFields()
  yield* clearErrors()
  yield* validate()

  if (!(yield* checkErrors())) {
    yield put(digitalAssetsSend.setStep(digitalAssetsSend.STEP_TWO))
  }
}

function* submitPasswordForm(): Saga<void> {
  const {
    step,
    formFields: {
      recepient,
      amount,
      nonce,
      assetAddress,
      password,
    },
  }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)

  if (password === '') {
    yield put(digitalAssetsSend.setFieldError('password', 'Password is empty'))
    return
  }

  const network: ExtractReturn<typeof selectCurrentNetwork> = yield select(selectCurrentNetwork)
  if (!network) {
    yield put(digitalAssetsSend.setFieldError('password', 'Active network is not set'))
    return
  }

  // it is impossible
  if (step !== digitalAssetsSend.STEP_TWO) {
    yield put(digitalAssetsSend.setFieldError('password', 'Invalid step'))
    return
  }

  const activeWalletId: ?WalletId = yield select(selectActiveWalletId)
  if (!activeWalletId) {
    yield put(digitalAssetsSend.setFieldError('password', 'Active wallet is not selected'))
    return
  }

  const asset: ?DigitalAsset = yield select(selectDigitalAsset, assetAddress)
  if (!asset) {
    yield put(digitalAssetsSend.setFieldError('password', 'Invalid asset'))
    return
  }

  yield put(digitalAssetsSend.setIsProcessing(true))

  try {
    const privateKey: string = (
      yield* getPrivateKey(activeWalletId, password)
    ).substr(2)

    const txData = getTransactionData({
      asset,
      recepient,
      amount,
      privateKey,
      nonce,
    })

    console.log(txData)

    const txHash: string = yield call(web3.sendTransaction, network, asset.address, txData)

    yield put(digitalAssetsSend.setIsProcessing(false))

    console.log('============================')
    console.log('============================')
    console.log('============================')
    console.log(txHash)
    console.log('============================')
    console.log('============================')
    console.log('============================')

    yield put(push(`/transactions/${asset.address}`))
  } catch (err) {
    yield put(digitalAssetsSend.setFieldError('password', err.message))
    yield put(digitalAssetsSend.setIsProcessing(false))
  }
}

export function* digitalAssetsSendRootSaga(): Saga<void> {
  yield takeEvery(digitalAssetsSend.OPEN_VIEW, openView)
  yield takeEvery(digitalAssetsSend.SUBMIT_SEND_FORM, submitSendForm)
  yield takeEvery(digitalAssetsSend.SUBMIT_PASSWORD_FORM, submitPasswordForm)
}
