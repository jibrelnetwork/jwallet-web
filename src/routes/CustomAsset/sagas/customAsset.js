// @flow

import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import validate from 'services/validate'
import { selectDigitalAssetsItems, selectCustomAsset } from 'store/stateSelectors'

import {
  CLOSE,
  ADD,
  SET_EDIT_ADDRESS,
  EDIT,
  REMOVE,
  addSuccess,
  addError,
  setEditAddressSuccess,
  setEditAddressError,
  editSuccess,
  editError,
  removeSuccess,
  removeError,
  clean,
} from '../modules/customAsset'

function* closeAddCustomAsset(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* addCustomAsset(): Saga<void> {
  try {
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)
    const customAssetData: CustomAssetData = yield select(selectCustomAsset)

    validate.customAssetData(customAssetData, digitalAssets)
    const updatedAssets: DigitalAssets = digitalAssets.concat(getCustomAssetData(customAssetData))

    yield put(addSuccess(updatedAssets))
  } catch (err) {
    yield put(addError(err))
  }
}

function* setEditAddress(action: { payload: { address: Address } }): Saga<void> {
  try {
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)

    const foundAsset: DigitalAsset = digitalAssets
      .filter(({ address, isCustom }: DigitalAsset): boolean => {
        if (address === action.payload.address) {
          if (!isCustom) {
            throw new Error('Digital asset is not custom')
          }

          return true
        }

        return false
      })[0]

    if (!foundAsset) {
      throw new Error('Digital asset is not found')
    }

    yield put(setEditAddressSuccess(foundAsset))
  } catch (err) {
    yield put(setEditAddressError(err))
  }
}

function* editCustomAsset(): Saga<void> {
  try {
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)
    const customAssetData: CustomAssetData = yield select(selectCustomAsset)
    const { address, name, symbol, decimals }: CustomAssetData = customAssetData

    const digitalAssetsWithoutCurrent = digitalAssets.filter((item: DigitalAsset): boolean => {
      return (item.address !== address)
    })

    validate.customAssetName(name)
    validate.customAssetPropUniq('name', name, digitalAssetsWithoutCurrent)
    validate.customAssetSymbol(symbol)
    validate.customAssetPropUniq('symbol', symbol, digitalAssetsWithoutCurrent)
    validate.customAssetDecimals(decimals)

    const updatedAssets: DigitalAssets = digitalAssets.map((item: DigitalAsset): DigitalAsset => {
      if (customAssetData.address === item.address) {
        if (!item.isCustom) {
          throw new Error('It is impossible to edit not custom asset')
        }

        return getCustomAssetData(customAssetData)
      }

      return item
    })

    yield put(editSuccess(updatedAssets))
  } catch (err) {
    yield put(editError(err))
  }
}

function* removeCustomAsset(): Saga<void> {
  try {
    const digitalAssets: DigitalAssets = yield select(selectDigitalAssetsItems)
    const { address }: CustomAssetData = yield select(selectCustomAsset)

    const updatedAssets: DigitalAssets = digitalAssets.filter((asset: DigitalAsset): boolean => {
      return (asset.address !== address)
    })

    yield put(removeSuccess(updatedAssets))
  } catch (err) {
    yield put(removeError(err))
  }
}

function getCustomAssetData(customAssetData: CustomAssetData): DigitalAsset {
  const { name, symbol, address, decimals }: CustomAssetData = customAssetData

  return {
    name,
    symbol,
    address,
    decimals: parseInt(decimals, 10) || 0,
    isActive: true,
    isCustom: true,
  }
}

export function* watchCustomAssetClose(): Saga<void> {
  yield takeEvery(CLOSE, closeAddCustomAsset)
}

export function* watchCustomAssetAdd(): Saga<void> {
  yield takeEvery(ADD, addCustomAsset)
}

export function* watchCustomAssetSetEditAddress(): Saga<void> {
  yield takeEvery(SET_EDIT_ADDRESS, setEditAddress)
}

export function* watchCustomAssetEdit(): Saga<void> {
  yield takeEvery(EDIT, editCustomAsset)
}

export function* watchCustomAssetRemove(): Saga<void> {
  yield takeEvery(REMOVE, removeCustomAsset)
}
