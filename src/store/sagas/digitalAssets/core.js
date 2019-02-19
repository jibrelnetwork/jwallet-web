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
import { getAddressChecksum } from 'utils/address'

import * as blocks from 'store/modules/blocks'
import * as ticker from 'store/modules/ticker'
import * as digitalAssets from 'store/modules/digitalAssets'

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
  ): DigitalAssets => {
    const { address }: DigitalAssetBlockchainParams = item.blockchainParams

    if (!address) {
      return result
    }

    const addressWithChecksum: AssetAddress = getAddressChecksum(address)

    return {
      ...result,
      [addressWithChecksum]: {
        ...item,
        isActive: false,
        blockchainParams: {
          ...item.blockchainParams,
          address: addressWithChecksum,
        },
      },
    }
  }, {})

  const existingItems: DigitalAssets = Object.keys(items).reduce((
    result: DigitalAssets,
    address: AssetAddress,
  ): DigitalAssets => {
    const addressWithChecksum: AssetAddress = getAddressChecksum(address)
    const foundItem: ?DigitalAsset = findByAddress(items, addressWithChecksum)

    return {
      ...result,
      [addressWithChecksum]: {
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

  const isInited: boolean = (Object.keys(existingItems).length > 0)

  if (!isInited) {
    const mergedItems: DigitalAssets = mergeItems(existingItems)
    const itemsWithETH: DigitalAssets = addETHAsset(mergedItems)

    yield put(digitalAssets.setInitialItems(itemsWithETH))
  }
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
