// @flow

import { select, all, put, call, takeEvery } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import keystore from '@jibrelnetwork/jwallet-web-keystore'
import { BigNumber } from 'bignumber.js'

import {
  selectActiveWalletAddress,
} from 'store/selectors/wallets'

import {
  selectDigitalAsset,
  selectDigitalAssetsSend,
} from 'store/selectors/digitalAssets'

import {
  OPEN_VIEW,
  // CLOSE_VIEW,
  SEND_FORM_SUBMIT,
  setField,
  setFieldError,
  clearFieldError,
} from '../modules/digitalAssetsSend'

function* openView(): Saga<void> {
  const activeAddress = yield select(selectActiveWalletAddress)
  yield put(setField('ownerAddress', activeAddress))
  yield put(setField('assetAddress', 'Ethereum'))
}

// function* closeView(): Saga<void> {

// }

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

function* checkValues(): Saga<void> {
  const { formFields }: DigitalAssetSendState = yield select(selectDigitalAssetsSend)
  const {
    ownerAddress,
    recepientAddress,
    assetAddress,
    value,
    // valueFiat,
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
    const amount = new BigNumber(value)
    if (amount.eq(0) || amount.lt(0)) {
      yield put(setFieldError('value', 'Amount to send should be grater than 0'))
    }
  } catch (error) {
    yield put(setFieldError('value', 'Invalid amount value'))
  }

  return yield* checkErrors()
}

function* sendFormSubmit(): Saga<void> {
  yield* trimFields()
  yield* clearErrors()
  yield* checkValues()

  if (!(yield* checkErrors())) {
    yield put(push('/digital-assets/send/confirm'))
  }
}

export function* digitalAssetsSendRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, openView)
  // yield takeEvery(CLOSE_VIEW, closeView)
  yield takeEvery(SEND_FORM_SUBMIT, sendFormSubmit)
}
