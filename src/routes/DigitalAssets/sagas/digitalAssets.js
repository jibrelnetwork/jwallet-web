// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import assetsData from 'data/assets'

import {
  selectDigitalAsset,
  selectDigitalAssetsItems,
} from 'store/selectors/digitalAssets'

import * as blocks from 'routes/modules/blocks'

import * as digitalAssets from '../modules/digitalAssets'

function findByAddress(items: DigitalAssets, address: AssetAddress): ?DigitalAsset {
  const addressToLower: string = address.toLowerCase()

  const foundAddress: ?AssetAddress = Object
    .keys(items)
    .find((assetAddress: AssetAddress): boolean => (assetAddress.toLowerCase() === addressToLower))

  return foundAddress ? items[foundAddress] : null
}

function mergeItems(items: DigitalAssets): DigitalAssets {
  const defaultItems: DigitalAssets = assetsData.mainnet.reduce((
    result: DigitalAssets,
    item: DigitalAsset,
  ): DigitalAssets => ({
    ...result,
    [item.blockchainParams.address]: item,
  }), {})

  const existingItems: DigitalAssets = Object.keys(items).reduce((
    result: DigitalAssets,
    address: AssetAddress,
  ): DigitalAssets => {
    const foundItem: ?DigitalAsset = findByAddress(items, address)

    return {
      ...result,
      [address]: {
        ...foundItem,
        isCustom: foundItem ? foundItem.isCustom : true,
      },
    }
  }, {})

  return {
    ...defaultItems,
    ...existingItems,
  }
}

function addETHAsset(items: DigitalAssets): DigitalAssets {
  const defaultETHAddress: AssetAddress = assetsData.ethereum.blockchainParams.address

  const foundETHAsset: ?DigitalAsset = assetsData.mainnet
    .find((item: DigitalAsset) => (item.blockchainParams.type === 'ethereum'))

  if (!foundETHAsset) {
    return {
      ...items,
      [defaultETHAddress]: assetsData.ethereum,
    }
  }

  return {
    ...items,
    [defaultETHAddress]: {
      ...foundETHAsset,
      blockchainParams: {
        ...foundETHAsset.blockchainParams,
        address: defaultETHAddress,
      },
    },
  }
}

function* init(): Saga<void> {
  const existingItems: ExtractReturn<typeof selectDigitalAssetsItems> =
    yield select(selectDigitalAssetsItems)

  const isInited: boolean = (Object.keys(existingItems).length > 0)

  if (!isInited) {
    const mergedItems: DigitalAssets = mergeItems(existingItems)
    const itemsWithETH: DigitalAssets = addETHAsset(mergedItems)

    yield put(digitalAssets.setInitialItems(itemsWithETH))
  }
}

function* setAssetIsActive(): Saga<void> {
  yield put(blocks.syncRestart())
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
}

export function* digitalAssetsRootSaga(): Saga<void> {
  yield takeEvery(digitalAssets.INIT, init)
  yield takeEvery(digitalAssets.SET_ASSET_IS_ACTIVE, setAssetIsActive)
  yield takeEvery(digitalAssets.DELETE_CUSTOM_ASSET, deleteCustomAsset)
}
