// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import { fileSaver, gtm, qrCode } from 'services'

import {
  getCurrentAddress,
  getKeystoreAccountType,
  getTransactionValue,
  InvalidFieldError,
} from 'utils'

import {
  selectDigitalAssetItem,
  selectKeystore,
  selectReceiveFunds,
} from 'store/stateSelectors'

import {
  SET_ASSET,
  SET_AMOUNT,
  SET_INVALID_FIELD,
  COPY_ADDRESS,
  SAVE_QR_CODE,
} from '../modules/receiveFunds'

function* onCopyAddress(): Saga<void> {
  const keystoreData: KeystoreData = yield select(selectKeystore)
  const address = getCurrentAddress(keystoreData)
  const addressEl = createAddressEl(address)
  selectAddress(addressEl)
  copyAddress()
  cleanSelection(addressEl)
}

function copyAddress() {
  try {
    window.document.execCommand('copy')
  } catch (err) {
    // console.error(err)
  }
}

function createAddressEl(address) {
  const addressEl = window.document.createElement('div')
  addressEl.style.position = 'absolute'
  addressEl.style.top = '-5000px'
  addressEl.innerHTML = address

  if (window.document.body) {
    window.document.body.appendChild(addressEl)
  }

  return addressEl
}

function selectAddress(el) {
  const range = window.document.createRange()
  range.selectNodeContents(el)

  const selection = window.getSelection()
  selection.removeAllRanges()
  selection.addRange(range)
}

function cleanSelection(el) {
  const selection = window.getSelection()
  selection.removeAllRanges()
  el.remove()
}

function* onGenerateQRCode(): Saga<void> {
  try {
    const keystoreData: KeystoreData = yield select(selectKeystore)
    const { amount, symbol }: ReceiveFundsData = yield select(selectReceiveFunds)

    if (!amount) {
      return
    }

    const to: Address = getCurrentAddress(keystoreData)
    const value: Bignumber = yield getValue(amount, symbol)

    validateValue(value)

    qrCode.generate({
      requisites: { to, value },
      appearance: {},
      selector: '#qr-code',
    })

    yield onGenerateQRCodeSuccess()
  } catch (err) {
    yield onGenerateQRCodeError(err)
  }
}

function* onGenerateQRCodeSuccess() {
  const { currentAccount }: KeystoreData = yield select(selectKeystore)
  const accountType: string = getKeystoreAccountType(currentAccount)

  gtm.pushReceiveFunds('QRCodeGenerate', accountType)
}

function* onGenerateQRCodeError(err: InvalidFieldError) {
  // console.error(err)

  const { fieldName, message }: InvalidFieldError = err

  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

function* getValue(amount: string, symbol: string) {
  const { decimals }: DigitalAsset = yield select(selectDigitalAssetItem, symbol)

  return getTransactionValue(amount, decimals)
}

function validateValue(value: Bignumber) {
  if (value.lte(0)) {
    throw new InvalidFieldError('amount', i18n('routes.receiveFunds.error.amount.invalid'))
  }
}

function onSaveQRCode(): Saga<void> {
  const canvas = document.querySelector('#qr-code canvas')

  if (!canvas) {
    return
  }

  fileSaver.saveCanvas(canvas, 'jwallet-qrcode')
}

export function* watchCopyAddress(): Saga<void> {
  yield takeEvery(COPY_ADDRESS, onCopyAddress)
}

export function* watchGenerateCode(): Saga<void> {
  yield takeEvery(SET_ASSET, onGenerateQRCode)
  yield takeEvery(SET_AMOUNT, onGenerateQRCode)
}

export function* watchSaveQRCode(): Saga<void> {
  yield takeEvery(SAVE_QR_CODE, onSaveQRCode)
}
