import {
  mapValues,
  every,
} from 'lodash-es'
import { checkETH } from 'utils/digitalAssets'

import {
  put,
  select,
} from 'redux-saga/es/effects'

import {
  selectInitialBlockNumber,
} from 'services/sync/blockchain/selectors/blocks'

import {
  selectCurrentAddress, selectCurrentAddressCreatedBlockNumber,
  selectCurrentAssets,
  selectCurrentNetworkId,
  selectDBInstance,
} from 'services/sync/blockchain/selectors/config'

import {
  storeSavedBlocksStart, getSavedBlocksRange, storeSavedBlocksEnd,
} from 'services/sync/blockchain/db/meta'
import {
  storeTransactions,
} from 'services/sync/blockchain/db/transactions'
import {
  setAssetsSyncParameters,
} from 'services/sync/blockchain/modules/historical'
import { selectAssetsSyncRanges } from 'services/sync/blockchain/selectors/historical'

import {
  getEvents,
  getTransactions,
} from './utils'

export function* initHistoricalSyncParameters() {
  const db = yield select(selectDBInstance)
  const assets = yield select(selectCurrentAssets)
  const initialBlockNumber = yield select(selectInitialBlockNumber)

  const assetsAddresses = Object.keys(assets)

  const assetsSavedBlocksRanges = yield Promise.all(
    assetsAddresses
      .map(address => getSavedBlocksRange(db, address)),
  )

  const assetsSyncRanges = assetsSavedBlocksRanges.reduce((reduceResult, savedBlocksRange, idx) => {
    const address = assetsAddresses[idx]

    reduceResult[address] = {
      start: assets[address].blockchainParams.deploymentBlockNumber || 0,
      end: savedBlocksRange.start || initialBlockNumber,
      isSynced: savedBlocksRange.start <= assets[address].blockchainParams.deploymentBlockNumber,
    }

    return reduceResult
  }, {})

  yield put(setAssetsSyncParameters(assetsSyncRanges))
}

export function* loadTransactionsFromBlockExplorer() {
  console.time('sync')

  const db = yield select(selectDBInstance)
  const networkId = yield select(selectCurrentNetworkId)
  const ownerAddress = yield select(selectCurrentAddress)
  const assetsSyncRanges = yield select(selectAssetsSyncRanges)
  const addressCreatedBlockNumber = yield select(selectCurrentAddressCreatedBlockNumber)

  const assetsSequence = Object.keys(assetsSyncRanges)

  const synced = mapValues(assetsSyncRanges, rng => rng.isSynced)
  const pages = mapValues(assetsSyncRanges, () => 1)

  do {
    yield Promise
      .all(assetsSequence.map(async (assetAddress) => {
        if (synced[assetAddress]) {
          return true
        }

        const response = await (checkETH(assetAddress)
          ? getTransactions(
            networkId,
            ownerAddress,
            assetsSyncRanges[assetAddress].end,
            pages[assetAddress],
          )
          : getEvents(
            db,
            networkId,
            assetAddress,
            ownerAddress,
            assetsSyncRanges[assetAddress].end,
            pages[assetAddress],
            Math.max(
              assetsSyncRanges[assetAddress].start,
              addressCreatedBlockNumber,
            ),
          )
        )

        const {
          isLast,
          lowestBlock,
          result,
        } = response

        await storeTransactions(
          db,
          result,
        )

        if (isLast) {
          // eslint-disable-next-line fp/no-mutation
          synced[assetAddress] = true

          await storeSavedBlocksStart(db, assetAddress, 0)
        } else {
          await storeSavedBlocksStart(db, assetAddress, lowestBlock)
        }

        if (pages[assetAddress] === 1) {
          await storeSavedBlocksEnd(db, assetAddress, assetsSyncRanges[assetAddress].end)
        }

        // eslint-disable-next-line fp/no-mutation, operator-assignment
        pages[assetAddress] = pages[assetAddress] + 1

        return true
      }))
  } while (!every(synced))

  console.timeEnd('sync')
}
