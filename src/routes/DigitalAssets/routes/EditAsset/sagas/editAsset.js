// @flow

import { put, select, takeEvery } from 'redux-saga/effects'

import {
  selectEditAsset,
  selectDigitalAsset,
} from 'store/stateSelectors'

import {
  setField,
  setFieldError,
  clearFieldError,
  openView,
  OPEN_VIEW,
  SUBMIT_ASSET_FORM,
} from '../modules/editAsset'

import {
  updateAsset,
} from '../../../modules/digitalAssets'

function* clearFieldsError(): Saga<void> {
  yield put(clearFieldError('name'))
  yield put(clearFieldError('symbol'))
  yield put(clearFieldError('decimals'))
}

function* onAssetFormSumbit(): Saga<void> {
  const {
    formFields: {
      address,
      name,
      symbol,
      decimals,
    },
  }: ExtractReturn<typeof selectEditAsset> = yield select(selectEditAsset)

  const contractName = name.trim()
  const contractSymbol = symbol.trim()
  const contractDecimals = parseInt(decimals, 10)

  yield* clearFieldsError()

  // Check, do we have this asset
  const foundAsset: ?DigitalAsset = yield select(selectDigitalAsset, address)
  if (!(foundAsset && foundAsset.isCustom)) {
    yield put(setFieldError('address', 'Asset not found'))
    return
  }

  if (contractName.length === 0) {
    yield put(setFieldError('name', 'Valid digital asset name is required'))
  }

  if (contractSymbol.length === 0 || contractSymbol.length > 10) {
    yield put(setFieldError('symbol', 'Valid digital asset symbol is required'))
  }

  if (Number.isNaN(contractDecimals) ||
    contractDecimals <= 0 ||
    contractDecimals > 127) {
    yield put(
      setFieldError('decimals', 'Digital asset decimals should be a number between 1...127')
    )
  }

  const {
    invalidFields: {
      address: addressError,
      name: nameError,
      symbol: symbolError,
      decimals: decimalsError,
    },
  }: ExtractReturn<typeof selectEditAsset> = yield select(selectEditAsset)

  if (addressError === '' &&
      nameError === '' &&
      symbolError === '' &&
      decimalsError === '') {
    yield put(updateAsset(foundAsset.address, contractName, contractSymbol, contractDecimals))
  }
}

function* editAssetOpen({ payload: { assetAddress } }: ExtractReturn<typeof openView>): Saga<void> {
  // Check, do we have this asset
  const foundAsset: ?DigitalAsset = yield select(selectDigitalAsset, assetAddress)
  if (!(foundAsset && foundAsset.isCustom)) {
    // TODO: redirect here
    return
  }

  const {
    address,
    name,
    symbol,
    decimals,
  } = foundAsset

  yield put(setField('address', address))
  yield put(setField('name', name))
  yield put(setField('symbol', symbol))
  yield put(setField('decimals', decimals.toString()))
}

export function* editAssetRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, editAssetOpen)
  yield takeEvery(SUBMIT_ASSET_FORM, onAssetFormSumbit)
}
