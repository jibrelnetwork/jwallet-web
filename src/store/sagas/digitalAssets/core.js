// @flow

import { mapKeys } from 'lodash-es'

import {
  put,
  call,
  select,
  takeEvery,
} from 'redux-saga/effects'

import {
  ethereum,
  getAssetsMainnet,
} from 'data/assets'

import {
  selectDigitalAsset,
  selectDigitalAssetsItems,
} from 'store/selectors/digitalAssets'
import { getAddressChecksum } from 'utils/address'

import * as blocks from 'store/modules/blocks'
import * as ticker from 'store/modules/ticker'
import * as digitalAssets from 'store/modules/digitalAssets'

function mergeItems(
  items: DigitalAssets,
  assetsMainnet: DigitalAsset[],
): DigitalAssets {
  // FIXME: use current network id instead
  const defaultItems: DigitalAssets = assetsMainnet.reduce((
    reduceResult: DigitalAssets,
    item: DigitalAsset,
  ): DigitalAssets => {
    const { address }: DigitalAssetBlockchainParams = item.blockchainParams

    if (!address) {
      return reduceResult
    }

    const addressWithChecksum: AssetAddress = getAddressChecksum(address)

    reduceResult[addressWithChecksum] = {
      ...item,
      isActive: false,
      blockchainParams: {
        ...item.blockchainParams,
        address: addressWithChecksum,
      },
    }

    return reduceResult
  }, {})

  const itemsWithChecksum: DigitalAssets = mapKeys(
    items,
    (item, address) => getAddressChecksum(address),
  )

  const existingItems: DigitalAssets = Object.keys(itemsWithChecksum).reduce((
    reduceResult: DigitalAssets,
    addressWithChecksum: AssetAddress,
  ): DigitalAssets => {
    const foundExistingItem: ?DigitalAsset = items[addressWithChecksum]
    const foundDefaultItem: ?DigitalAsset = defaultItems[addressWithChecksum]

    // Ignore nonexistent items
    if (!foundExistingItem) {
      return reduceResult
    }

    // Update from default item if it exists
    if (foundDefaultItem) {
      reduceResult[addressWithChecksum] = {
        ...foundExistingItem,
        ...foundDefaultItem,
        isCustom: false,
        isActive: !!foundExistingItem.isActive,
      }

      return reduceResult
    }

    // Remove (ignore) inactive items that are not in default list and not marked as custom
    if (!foundExistingItem.isActive && !foundExistingItem.isCustom) {
      return reduceResult
    }

    // Active items that are not in default list are converted to custom
    reduceResult[addressWithChecksum] = {
      ...foundExistingItem,
      isCustom: true,
    }

    return reduceResult
  }, {})

  return {
    ...defaultItems,
    ...existingItems,
  }
}

function addETHAsset(
  items: DigitalAssets,
  assetsMainnet: DigitalAsset[],
): DigitalAssets {
  const defaultETHAddress: AssetAddress = ethereum.blockchainParams.address

  const foundETHAsset: ?DigitalAsset = assetsMainnet
    .find((item: DigitalAsset) => (item.blockchainParams.type === 'ethereum'))

  if (!foundETHAsset) {
    return {
      ...items,
      [defaultETHAddress]: ethereum,
    }
  }

  const { blockchainParams }: DigitalAsset = foundETHAsset

  return {
    ...items,
    [defaultETHAddress]: {
      ...foundETHAsset,
      blockchainParams: {
        ...blockchainParams,
        address: defaultETHAddress,
      },
      isActive: true,
    },
  }
}

function* init(): Saga<void> {
  const existingItems: ExtractReturn<typeof selectDigitalAssetsItems> =
    yield select(selectDigitalAssetsItems)

  const assetsMainnet: DigitalAsset[] = yield call(getAssetsMainnet)
  const mergedItems: DigitalAssets = mergeItems(existingItems, assetsMainnet)
  const itemsWithETH: DigitalAssets = addETHAsset(mergedItems, assetsMainnet)

  yield put(digitalAssets.setInitialItems(itemsWithETH))
}

function* setAssetIsActive(): Saga<void> {
  yield put(blocks.syncRestart())
  yield put(ticker.syncRestart())
}

function* deleteCustomAsset(
  action: ExtractReturn<typeof digitalAssets.deleteCustomAsset>,
): Saga<void> {
  const { assetAddress } = action.payload

  const foundAsset: ExtractReturn<typeof selectDigitalAssetsItems> =
    yield select(selectDigitalAsset, assetAddress)

  if (!(foundAsset && foundAsset.isCustom)) {
    return
  }

  yield put(digitalAssets.deleteAssetRequest(assetAddress))
  yield put(blocks.syncRestart())
  yield put(ticker.syncRestart())
}

export function* digitalAssetsRootSaga(): Saga<void> {
  yield takeEvery(digitalAssets.INIT, init)
  yield takeEvery(digitalAssets.SET_ASSET_IS_ACTIVE, setAssetIsActive)
  yield takeEvery(digitalAssets.DELETE_CUSTOM_ASSET, deleteCustomAsset)
}
