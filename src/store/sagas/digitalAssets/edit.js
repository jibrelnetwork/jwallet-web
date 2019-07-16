// @flow

import { i18n } from 'i18n/lingui'
import { router5BackOrFallbackFunctionCreator } from 'utils/browser'

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import {
  selectEditAsset,
  selectDigitalAsset,
} from 'store/selectors/digitalAssets'

import {
  setField,
  setFieldError,
  clearFieldError,
  OPEN_VIEW,
  SUBMIT_ASSET_FORM,
  typeof openView as openViewType,
} from 'store/modules/editAsset'

import {
  updateAsset,
} from 'store/modules/digitalAssets'

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
    yield put(setFieldError('address', i18n._(
      'AssetsItemAdd.errors.notfound',
      null,
      { defaults: 'Asset not found' },
    )))

    return
  }

  if (contractName.length === 0) {
    yield put(setFieldError('name', i18n._(
      'AssetsItemAdd.errors.nameInvalid',
      null,
      { defaults: 'Valid digital asset name is required' },
    )))
  }

  if (contractSymbol.length === 0 || contractSymbol.length > 10) {
    yield put(setFieldError('symbol', i18n._(
      'AssetsItemAdd.errors.symbolInvalid',
      null,
      { defaults: 'Valid digital asset symbol is required' },
    )))
  }

  if (Number.isNaN(contractDecimals) ||
    contractDecimals < 0 ||
    contractDecimals > 127) {
    yield put(
      setFieldError('decimals', i18n._(
        'AssetsItemAdd.errors.decimalsInvalid',
        null,
        { defaults: 'Digital asset decimals should be a number between 0...127' },
      )),
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

  if (
    !addressError &&
    !nameError &&
    !symbolError &&
    !decimalsError
  ) {
    const foundAssetAddress: AssetAddress = foundAsset.blockchainParams.address

    yield put(updateAsset(foundAssetAddress, contractName, contractSymbol, contractDecimals))
    const state = yield select()

    router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet',
    )()
  }
}

function* editAssetOpen({ payload: { assetAddress } }: ExtractReturn<openViewType>): Saga<void> {
  // Check, do we have this asset
  const foundAsset: ?DigitalAsset = yield select(selectDigitalAsset, assetAddress)

  if (!(foundAsset && foundAsset.isCustom)) {
    const state = yield select()

    router5BackOrFallbackFunctionCreator(
      state.router.previousRoute,
      'Wallet',
    )()

    return
  }

  const {
    name,
    symbol,
    blockchainParams: {
      address,
      decimals,
    },
  } = foundAsset

  yield put(setField('address', address))
  yield put(setField('name', name))
  yield put(setField('symbol', symbol))
  yield put(setField('decimals', decimals.toString()))
}

export function* digitalAssetsEditRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, editAssetOpen)
  yield takeEvery(SUBMIT_ASSET_FORM, onAssetFormSumbit)
}
