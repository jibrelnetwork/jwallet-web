// @flow

import { delay } from 'redux-saga'
import { compose, equals, filter, head, toLower } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import ethereum from 'data/assets/ethereum'
import { fileSaver, keystore, qrCode, validate } from 'services'
import { copyToBuffer, getTransactionValue, isETH } from 'utils'

import {
  selectReceiveFunds,
  selectDigitalAssetsItems,
  selectWalletId,
} from 'store/stateSelectors'

import {
  CLOSE,
  SET_ASSET,
  SET_AMOUNT,
  COPY_ADDRESS,
  SAVE_QR_CODE,
  generateSuccess,
  generateError,
  setIsCopied,
  clean,
} from '../modules/receiveFunds'

function* closeReceiveFunds(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* copyAddress(): Saga<void> {
  try {
    const walletId: ?WalletId = yield select(selectWalletId)
    const address: Address = keystore.getAddress(walletId)
    copyToBuffer(address)
    yield put(setIsCopied(true))
    yield delay(config.copyToBufferTimeout)
  } catch (err) {
    // console.error(err)
  }

  yield put(setIsCopied(false))
}

function* generateQRCode(): Saga<void> {
  try {
    const walletId: WalletId = yield select(selectWalletId)
    const { amount, assetAddress }: ReceiveFundsData = yield select(selectReceiveFunds)

    if (!amount) {
      return
    }

    const to: Address = keystore.getAddress(walletId)
    const requisites = yield getRequisites(to, amount, assetAddress)

    qrCode.generate({
      requisites,
      appearance: {},
      selector: '#qr-code',
    })

    const { customType }: Wallet = keystore.getWallet(walletId)

    yield put(generateSuccess(customType))
  } catch (err) {
    yield put(generateError(err))
  }
}

function* getRequisites(to: Address, amount: string, assetAddress: Address) {
  const decimals: Decimals = yield getAssetDecimals(assetAddress)

  validate.txAmount(amount)
  validate.txValueGreaterThan0(amount, decimals)

  const value: Bignumber = getTransactionValue(amount, decimals)

  return isETH(assetAddress) ? { to, value } : {
    to: assetAddress,
    mode: 'erc20__transfer',
    argsDefaults: [{
      value: to,
      name: 'to',
    }, {
      value,
      name: 'value',
    }],
  }
}

function* getAssetDecimals(assetAddress: Address) {
  const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)

  const digitalAsset: DigitalAsset = compose(
    head,
    filter(({ address }: DigitalAsset): boolean => equals(toLower(assetAddress), toLower(address))),
  )(digitalAssets) || ethereum

  return digitalAsset.decimals
}

function saveQRCode(): Saga<void> {
  const canvas = document.querySelector('#qr-code canvas')

  if (!canvas) {
    return
  }

  fileSaver.saveCanvas(canvas, 'jwallet-qrcode')
}

export function* watchReceiveFundsClose(): Saga<void> {
  yield takeEvery(CLOSE, closeReceiveFunds)
}

export function* watchReceiveFundsCopyAddress(): Saga<void> {
  yield takeEvery(COPY_ADDRESS, copyAddress)
}

export function* watchReceiveFundsSetAsset(): Saga<void> {
  yield takeEvery(SET_ASSET, generateQRCode)
}

export function* watchReceiveFundsSetAmount(): Saga<void> {
  yield takeEvery(SET_AMOUNT, generateQRCode)
}

export function* watchReceiveFundsSaveQRCode(): Saga<void> {
  yield takeEvery(SAVE_QR_CODE, saveQRCode)
}
