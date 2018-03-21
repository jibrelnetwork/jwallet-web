// @flow

import { delay } from 'redux-saga'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import {
  assoc,
  concat,
  compose,
  equals,
  filter,
  findIndex,
  fromPairs,
  nth,
  propEq,
  toLower,
  uniq,
  update,
} from 'ramda'

import config from 'config'
import { keystore, validate, web3 } from 'services'
import { getPopularDigitalAssets, isETH } from 'utils'
import { reset as resetTransactions } from 'routes/Transactions/modules/transactions'

import {
  selectNetworkId,
  selectWalletId,
  selectDigitalAssetsItems,
  selectDigitalAssetsBalances,
} from 'store/stateSelectors'

import {
  INIT,
  OPEN,
  CLOSE,
  SET_ASSETS,
  SET_ASSETS_SUCCESS,
  SET_ACTIVE,
  SET_CURRENT,
  GET_BALANCES,
  SET_BALANCE_BY_ADDRESS,
  SEARCH,
  setAssetsSuccess,
  setCurrent,
  getBalances,
  getBalancesSuccess,
  getBalancesError,
  setBalanceByAddressSuccess,
  searchSuccess,
  searchError,
  clean,
} from '../modules/digitalAssets'

const SEARCH_FIELDS: Array<string> = ['name', 'symbol', 'address']

function* initDigitalAssets(): Saga<void> {
  yield put(getBalances())
}

function* openDigitalAssets(): Saga<void> {
  // Opening of digital-assets/* page - means cleaning of current asset address
  yield put(setCurrent())
  yield put(getBalances())
}

function* closeDigitalAssets(): Saga<void> {
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* setDigitalAssets(action: { payload: { items: ?DigitalAssets } }): Saga<void> {
  const newItems: DigitalAssets = yield mergeDigitalAssets(action.payload.items)
  yield put(setAssetsSuccess(newItems))
}

function* setActiveAsset(action: { payload: { address: Address } }): Saga<void> {
  const items: DigitalAssets = yield select(selectDigitalAssetsItems)
  const assetIndex: number = findIndex(propEq('address', action.payload.address))(items)

  if (assetIndex === -1) {
    return
  }

  const digitalAsset: ?DigitalAsset = nth(assetIndex)(items)

  if (!digitalAsset) {
    return
  }

  const newItems: DigitalAssets = update(
    assetIndex,
    assoc('isActive', !digitalAsset.isActive)(digitalAsset),
  )(items)

  yield put(setAssetsSuccess(newItems))
}

function* setCurrentAsset(): Saga<void> {
  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    return
  }

  yield put(resetTransactions())
}

function* getDigitalAssetsBalances(): Saga<void> {
  yield delay(config.balanceLoadingTimeout)

  const walletId: ?WalletId = yield select(selectWalletId)

  if (!walletId) {
    yield put(getBalancesError(new Error('Wallet ID is not setted')))

    return
  }

  try {
    const owner: Address = keystore.getAddress(walletId)
    const balances: Balances = yield getBalancesByOwner(owner)
    yield put(getBalancesSuccess(balances))
  } catch (err) {
    yield put(getBalancesError(err))
  }
}

function* getBalancesByOwner(owner: Address): Balances {
  const items: DigitalAssets = yield select(selectDigitalAssetsItems)
  const balances: Array<number> = yield all(items.map(i => getBalanceByOwner(i, owner)))

  const addressBalancePairs: AddressBalancePairs = items.map((item: DigitalAsset, i: Index) => {
    return [item.address, balances[i]]
  })

  return fromPairs(addressBalancePairs)
}

function getBalanceByOwner(digitalAsset: DigitalAsset, owner: Address) {
  const { address, decimals }: DigitalAsset = digitalAsset

  return isETH(address)
    ? call(web3.getETHBalance, owner)
    : call(web3.getAssetBalance, address, owner, decimals)
}

function* setBalanceByDigitalAssetAddress(action: {
  payload: { address: Address, balance: number },
}): Saga<void> {
  const balances: Balances = yield select(selectDigitalAssetsBalances)
  const newBalances = assoc(action.payload.address, action.payload.balance)(balances)

  yield put(setBalanceByAddressSuccess(newBalances))
}

function* searchDigitalAssets(action: { payload: { searchQuery: string } }) {
  const { searchQuery }: { searchQuery: string } = action.payload

  try {
    validate.searchQuery(searchQuery)
  } catch (err) {
    yield put(searchError(err))

    return
  }

  const items: DigitalAssets = yield select(selectDigitalAssetsItems)
  const foundItems: Addresses = searchDigitalAssetsByFields(items, searchQuery)

  yield put(searchSuccess(foundItems))
}

function searchDigitalAssetsByFields(items: DigitalAssets, searchQuery: string): Addresses {
  const itemsByFields: DigitalAssets = SEARCH_FIELDS
    .map((field: string): DigitalAssets => {
      return searchDigitalAssetsByField(items, field, searchQuery)
    })
    .reduce((result: DigitalAssets, digitalAssetsByField: DigitalAssets): DigitalAssets => {
      return concat(result, digitalAssetsByField)
    }, [])

  return compose(
    uniq,
    getAddresses,
  )(itemsByFields)
}

function getAddresses(digitalAssets: DigitalAssets): Addresses {
  return digitalAssets.map(({ address }: DigitalAsset): Address => address)
}

function searchDigitalAssetsByField(
  items: DigitalAssets,
  field: string,
  query: string,
): DigitalAssets {
  return filter((item: DigitalAsset): boolean => isDigitalAssetFound(item, field, query))(items)
}

function isDigitalAssetFound(
  digitalAsset: DigitalAsset,
  fieldName: string,
  compareValue: string,
): boolean {
  const fieldValue: string = digitalAsset[fieldName].toLowerCase()
  const foundIndex: number = fieldValue.indexOf(compareValue.toLowerCase())

  return (foundIndex > -1)
}

function* mergeDigitalAssets(digitalAssetsFromStorage: ?DigitalAssets) {
  const networkId: ?NetworkId = yield select(selectNetworkId)
  const popularAssets: DigitalAssets = getPopularDigitalAssets(networkId)

  if (!digitalAssetsFromStorage) {
    return popularAssets
  }

  const filteredAssetsFromStorage = filterAssets(digitalAssetsFromStorage)
  const refreshedPopularAssets = refreshPopularAssets(popularAssets, filteredAssetsFromStorage)

  return concat(refreshedPopularAssets, filteredAssetsFromStorage)
}

function filterAssets(items: DigitalAssets): DigitalAssets {
  return filter((digitalAsset: DigitalAsset): boolean => {
    return filterAsset(digitalAsset)
  })(items)
}

function filterAsset(digitalAsset: DigitalAsset): boolean {
  const { address, name, symbol }: DigitalAsset = digitalAsset

  try {
    validate.customAssetAddress(address)
    validate.customAssetName(name)
    validate.customAssetSymbol(symbol)
  } catch (err) {
    return false
  }

  return true
}

function refreshPopularAssets(popularAssets: DigitalAssets, items: DigitalAssets): DigitalAssets {
  return popularAssets.filter((popularAsset: DigitalAsset) => {
    const indexOfStoredItem: Index = findStoredAssetIndex(popularAsset, items)

    return (indexOfStoredItem === -1)
  })
}

function findStoredAssetIndex(popularAsset: DigitalAsset, items: DigitalAssets): Index {
  return items.map((digitalAsset: DigitalAsset, index: Index): Index => {
    return isAssetEqual(popularAsset, digitalAsset) ? index : -1
  }).reduce((result: Index, index: Index): Index => {
    return (result > -1) ? result : index
  }, -1)
}

function isAssetEqual(a: DigitalAsset, b: DigitalAsset): boolean {
  const { address, name, symbol }: DigitalAsset = a

  return (isEqual(address, b.address) || isEqual(name, b.name) || isEqual(symbol, b.symbol))
}

function isEqual(a: string, b: string): boolean {
  return equals(toLower(a), toLower(b))
}

export function* watchDigitalAssetsInit(): Saga<void> {
  yield takeEvery(INIT, initDigitalAssets)
}

export function* watchDigitalAssetsOpen(): Saga<void> {
  yield takeEvery(OPEN, openDigitalAssets)
}

export function* watchDigitalAssetsClose(): Saga<void> {
  yield takeEvery(CLOSE, closeDigitalAssets)
}

export function* watchDigitalAssetsSetAssets(): Saga<void> {
  yield takeEvery(SET_ASSETS, setDigitalAssets)
}

export function* watchDigitalAssetsSetDigitalAssets(): Saga<void> {
  yield takeEvery(SET_ASSETS_SUCCESS, getDigitalAssetsBalances)
}

export function* watchDigitalAssetsSetActive(): Saga<void> {
  yield takeEvery(SET_ACTIVE, setActiveAsset)
}

export function* watchDigitalAssetsSetCurrent(): Saga<void> {
  yield takeEvery(SET_CURRENT, setCurrentAsset)
}

export function* watchDigitalAssetsGetBalances(): Saga<void> {
  yield takeEvery(GET_BALANCES, getDigitalAssetsBalances)
}

export function* watchDigitalAssetsSetBalanceByAddress(): Saga<void> {
  yield takeEvery(SET_BALANCE_BY_ADDRESS, setBalanceByDigitalAssetAddress)
}

export function* watchDigitalAssetsSearch(): Saga<void> {
  yield takeEvery(SEARCH, searchDigitalAssets)
}
