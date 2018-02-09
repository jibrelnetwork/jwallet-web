// @flow

import Keystore from 'jwallet-web-keystore'
import { append, equals, gt, lt, toLower } from 'ramda'
import { put, select, takeEvery } from 'redux-saga/effects'

import gtm from 'services/gtm'
import { InvalidFieldError } from 'utils/errors'

import { CURRENCIES_SET } from 'routes/JWallet/modules/currencies'
import { SET_INVALID_FIELD, CLEAN, ADD } from '../modules/addCustomAsset'

function selectDigitalAssetsItems(state: { currencies: { items: DigitalAssets } }): DigitalAssets {
  return state.currencies.items
}

function* onAddCustomAsset(action: { customAssetData: CustomAssetData }): Saga<void> {
  try {
    const { customAssetData }: { customAssetData: CustomAssetData } = action
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)

    validateCustomAssetData(customAssetData, digitalAssets)

    yield put({
      type: CURRENCIES_SET,
      items: append(getCustomAssetData(customAssetData), digitalAssets),
    })

    yield onAddCustomAssetSuccess()
  } catch (err) {
    yield onAddCustomAssetError(err)
  }
}

function* onAddCustomAssetSuccess() {
  gtm.pushAddCustomToken()
  yield put({ type: CLEAN })
}

function* onAddCustomAssetError(err: { fieldName: string, message: string }) {
  const { fieldName, message }: { fieldName: string, message: string } = err
  yield put({ type: SET_INVALID_FIELD, fieldName, message })
}

function validateCustomAssetData(customAssetData: CustomAssetData, digitalAssets: DigitalAssets) {
  const { address, name, symbol, decimals }: CustomAssetData = customAssetData

  validateCustomAssetAddress(address, digitalAssets)
  validateCustomAssetName(name)
  validateCustomAssetSymbol(symbol, digitalAssets)
  validateCustomAssetDecimals(decimals)
}

function validateCustomAssetAddress(address: Address, digitalAssets: DigitalAssets) {
  if (!Keystore.isValidAddress(address)) {
    throw new InvalidFieldError('address', i18n('modals.addCustomToken.error.address.invalid'))
  }

  validateCustomAssetAddressUniq(address, digitalAssets)
}

function validateCustomAssetAddressUniq(address: Address, digitalAssets: DigitalAssets) {
  digitalAssets.forEach((digitalAsset: DigitalAsset) => {
    const isEqual: boolean = equals(toLower(address), toLower(digitalAsset.address))

    if (isEqual) {
      throw new InvalidFieldError('address', i18n('modals.addCustomToken.error.address.exists'))
    }
  })
}

function validateCustomAssetName(name: string) {
  const isInvalid: boolean = /[^a-zA-Z ]/.test(name)
  const isShort: boolean = lt(name.length, 3)
  const isLong: boolean = gt(name.length, 100)

  if (isInvalid || isShort || isLong) {
    throw new InvalidFieldError('name', i18n('modals.addCustomToken.error.name.invalid'))
  }
}

function validateCustomAssetSymbol(symbol: string, digitalAssets: DigitalAssets) {
  const isInvalid: boolean = /[^a-zA-Z ]/.test(symbol)
  const isShort: boolean = lt(symbol.length, 3)
  const isLong: boolean = gt(symbol.length, 5)

  if (isInvalid || isShort || isLong) {
    throw new InvalidFieldError('symbol', i18n('modals.addCustomToken.error.symbol.invalid'))
  }

  validateCustomAssetSymbolUniq(symbol, digitalAssets)
}

function validateCustomAssetSymbolUniq(symbol: string, digitalAssets: DigitalAssets) {
  digitalAssets.forEach((digitalAsset: DigitalAsset) => {
    const isEqual: boolean = equals(toLower(symbol), toLower(digitalAsset.symbol))

    if (isEqual) {
      throw new InvalidFieldError('symbol', i18n('modals.addCustomToken.error.symbol.exists'))
    }
  })
}

function validateCustomAssetDecimals(decimals: string) {
  const decimalsInt: number = parseInt(decimals, 10) || 0
  const isLess: boolean = lt(decimalsInt, 1)
  const isGreater: boolean =  gt(decimalsInt, 18)

  if (isLess || isGreater) {
    throw new InvalidFieldError('decimals', i18n('modals.addCustomToken.error.decimals.invalid'))
  }
}

function getCustomAssetData(customAssetData: CustomAssetData): DigitalAsset {
  const { name, symbol, address, decimals }: CustomAssetData = customAssetData

  return {
    name,
    symbol,
    address: toLower(address),
    decimals: parseInt(decimals, 10) || 0,
    isActive: true,
    isCustom: true,
    isCurrent: true,
    isLicensed: false,
    isAuthRequired: false,
  }
}

export function* watchAddCustomAsset(): Saga<void> {
  yield takeEvery(ADD, onAddCustomAsset)
}
