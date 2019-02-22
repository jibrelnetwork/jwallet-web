// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'
import { mapKeys } from 'lodash-es'

import assetsData from 'data/assets'

import {
  selectDigitalAsset,
  selectDigitalAssetsItems,
} from 'store/selectors/digitalAssets'
import { getAddressChecksum } from 'utils/address'

import * as blocks from 'routes/modules/blocks'
import * as ticker from 'routes/modules/ticker'

import * as digitalAssets from '../modules/digitalAssets'

function mergeItems(items: DigitalAssets): DigitalAssets {
  // FIXME: use current network id instead
  // FIXME: remove eslint disable after new rules are applied
  /* eslint-disable no-param-reassign, fp/no-mutation */
  const defaultItems: DigitalAssets = assetsData.mainnet.reduce((
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
  /* eslint-enable no-param-reassign, fp/no-mutation */

  const itemsWithChecksum: DigitalAssets = mapKeys(
    items,
    (item, address) => getAddressChecksum(address)
  )

  // FIXME: remove eslint disable after new rules are applied
  /* eslint-disable no-param-reassign, fp/no-mutation */
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
  /* eslint-enable no-param-reassign, fp/no-mutation */

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

  const mergedItems: DigitalAssets = mergeItems(existingItems)
  const itemsWithETH: DigitalAssets = addETHAsset(mergedItems)

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
