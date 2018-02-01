// @flow

import Keystore from 'jwallet-web-keystore'
import { put, select, takeEvery } from 'redux-saga/effects'

import gtm from 'services/gtm'
import { InvalidFieldError } from 'utils/errors'

import { CURRENCIES_SET } from 'routes/JWallet/modules/currencies'
import { SET_INVALID_FIELD, CLEAR, ADD } from '../modules/addCustomAsset'

function selectDigitalAssetsItems(state: { currencies: { items: DigitalAssets } }): DigitalAssets {
  return state.currencies.items
}

function* onAddCustomAsset(action: { customAssetData: CustomAssetData }) {
  try {
    const { customAssetData } = action
    const digitalAssets = yield select(selectDigitalAssetsItems)

    validateCustomAssetData(customAssetData, digitalAssets)

    const newDigitalAssets: DigitalAssets = [...digitalAssets, getCustomAssetData(customAssetData)]

    yield put({ type: CURRENCIES_SET, items: newDigitalAssets })
    yield onAddCustomAssetSuccess()
  } catch (err) {
    yield onAddCustomAssetError(err)
  }
}

function validateCustomAssetData(customAssetData: CustomAssetData, digitalAssets: DigitalAssets) {
  const { address, name, symbol, decimals } = customAssetData

  validateCustomAssetAddress(address, digitalAssets)
  validateCustomAssetName(name)
  validateCustomAssetSymbol(symbol, digitalAssets)
  validateCustomAssetDecimals(decimals)
}

function validateCustomAssetAddress(address: Address, digitalAssets: DigitalAssets) {
  if (!Keystore.isValidAddress(address)) {
    throw (new InvalidFieldError('address', i18n('modals.addCustomToken.error.address.invalid')))
  }

  validateCustomAssetAddressUniq(address, digitalAssets)
}

function validateCustomAssetAddressUniq(address: Address, digitalAssets: DigitalAssets) {
  digitalAssets.forEach((digitalAsset) => {
    if (address.toLowerCase() === digitalAsset.address.toLowerCase()) {
      throw (new InvalidFieldError('address', i18n('modals.addCustomToken.error.address.exists')))
    }
  })
}

function validateCustomAssetName(name: string) {
  if (/[^a-zA-Z ]/.test(name) || (name.length < 3) || (name.length > 100)) {
    throw (new InvalidFieldError('name', i18n('modals.addCustomToken.error.name.invalid')))
  }
}

function validateCustomAssetSymbol(symbol: string, digitalAssets: DigitalAssets) {
  if (/[^a-zA-Z]/.test(symbol) || (symbol.length < 3) || (symbol.length > 5)) {
    throw (new InvalidFieldError('symbol', i18n('modals.addCustomToken.error.symbol.invalid')))
  }

  validateCustomAssetSymbolUniq(symbol, digitalAssets)
}

function validateCustomAssetSymbolUniq(symbol: string, digitalAssets: DigitalAssets) {
  digitalAssets.forEach((digitalAsset) => {
    if (symbol.toLowerCase() === digitalAsset.symbol.toLowerCase()) {
      throw (new InvalidFieldError('symbol', i18n('modals.addCustomToken.error.symbol.exists')))
    }
  })
}

function validateCustomAssetDecimals(decimals: string) {
  const decimalsInt: number = parseInt(decimals, 10) || 0

  if ((decimalsInt <= 0) || (decimalsInt > 18)) {
    throw (new InvalidFieldError('decimals', i18n('modals.addCustomToken.error.decimals.invalid')))
  }
}

function getCustomAssetData(customAssetData: CustomAssetData): DigitalAsset {
  const { name, symbol, address, decimals } = customAssetData

  return {
    name,
    symbol,
    address: address.toLowerCase(),
    decimals: parseInt(decimals, 10) || 0,
    isActive: true,
    isCustom: true,
    isCurrent: true,
    isLicensed: false,
    isAuthRequired: false,
  }
}

function* onAddCustomAssetSuccess() {
  gtm.pushAddCustomToken()
  yield put({ type: CLEAR })
}

function* onAddCustomAssetError(err: { fieldName: string, message: string }) {
  const { fieldName, message } = err
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

export function* watchAddCustomAsset(): Saga<void> {
  yield takeEvery(ADD, onAddCustomAsset)
}
