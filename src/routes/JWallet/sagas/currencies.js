import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { find, isEmpty } from 'lodash'

import config from 'config'
import { storage, web3 } from 'services'
import { getDefaultDigitalAssets, searchItems, sortItems } from 'utils'

import {
  selectDigitalAssets,
  selectCurrentKeystoreAddress,
  selectCurrentNetworkName,
} from './stateSelectors'

import {
  CURRENCIES_GET,
  CURRENCIES_SET,
  CURRENCIES_GET_BALANCES,
  CURRENCIES_SET_BALANCES,
  CURRENCIES_SET_CURRENT,
  CURRENCIES_SET_ACTIVE_ALL,
  CURRENCIES_TOGGLE_ACTIVE,
  CURRENCIES_SEARCH,
  CURRENCIES_SORT,
  CURRENCIES_SET_SEARCH_OPTIONS,
  CURRENCIES_SET_SORT_OPTIONS,
  CURRENCIES_ADD_CUSTOM,
} from '../modules/currencies'

import { TRANSACTIONS_GET } from '../modules/transactions'
import { CUSTOM_TOKEN_CLEAR } from '../modules/modals/customToken'

const digitalAssetsSearchFields = ['symbol', 'name']
let isGetBalancesLoopLaunched = 0

function* onGetDigitalAssets() {
  const networkName = yield select(selectCurrentNetworkName)

  let defaultDigitalAssets = getDefaultDigitalAssets(networkName)
  let storageDigitalAssets = []
  let balances = {}
  let currentAddress = null

  try {
    const digitalAssetsFromStorage = storage.getDigitalAssets(networkName) || '[]'
    const balancesFromStorage = storage.getDigitalAssetsBalances(networkName) || '{}'
    currentAddress = storage.getDigitalAssetsCurrent(networkName)

    storageDigitalAssets = JSON.parse(digitalAssetsFromStorage)
    balances = JSON.parse(balancesFromStorage)
  } catch (err) {
    console.error(err)
  }

  const freshDigitalAssets = refreshDigitalAssets(defaultDigitalAssets, storageDigitalAssets)

  yield setDigitalAssets(freshDigitalAssets, currentAddress)
  yield setBalances(balances)
  yield onSortDigitalAssets({ sortField: 'symbol' })

  // ignore if getBalances loop was already launched
  if (isGetBalancesLoopLaunched) {
    return
  }

  // need to set flag to prevent another loops when getBalances is called
  isGetBalancesLoopLaunched += 1
  yield getBalancesLoop()
}

function* onSetDigitalAssets(action) {
  const networkName = yield select(selectCurrentNetworkName)

  storage.setDigitalAssets(JSON.stringify(action.items), networkName)
}

function* onToggleDigitalAsset(action) {
  const { items, currentAddress, isActiveAll } = yield select(selectDigitalAssets)
  const toggledAddress = action.address

  if (toggledAddress === null) {
    yield toggleAllDigitalAssets(items, isActiveAll)

    return
  }

  // toggle isActive state of found item
  const newItems = [...items]
  const toggledItem = find(newItems, { address: toggledAddress })
  toggledItem.isActive = !toggledItem.isActive

  // need to get new active address is current was toggled off
  const isCurrentOff = ((currentAddress === toggledAddress) && !toggledItem.isActive)
  const newCurrentAddress = isCurrentOff ? getNextAvailableActiveAddress(newItems) : currentAddress

  // set new isActiveAll state
  const totalItemsLength = newItems.length
  const activeItemsLength = newItems.filter(({ isActive }) => isActive).length
  const newIsActiveAll = (totalItemsLength === activeItemsLength)

  yield setDigitalAssets(newItems, newCurrentAddress)
  yield setActiveAllFlag(newIsActiveAll)
}

function* onSetCurrentDigitalAsset(action) {
  const networkName = yield select(selectCurrentNetworkName)
  const { currentAddress } = action

  storage.setDigitalAssetsCurrent(currentAddress, networkName)

  yield getTransactions()
}

function* onSearchDigitalAssets(action) {
  const { items } = yield select(selectDigitalAssets)
  const { searchQuery } = action

  const foundItems = searchItems(items, searchQuery, digitalAssetsSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield setSearchOptions(foundItemsSymbols, searchQuery)
}

function* onSortDigitalAssets(action) {
  const { items, currentAddress, sortField, sortDirection } = yield select(selectDigitalAssets)
  const newSortField = action.sortField || sortField
  const result = sortItems(items, sortField, newSortField, sortDirection)

  yield setDigitalAssets(result.items, currentAddress)
  yield setSortOptions(result.sortField, result.sortDirection)
}

function* onAddCustomToken(action) {
  try {
    const { items } = yield select(selectDigitalAssets)
    const { address, name, symbol, decimals } = action.customTokenData

    const newItems = [...items, {
      name,
      symbol,
      isLicensed: false,
      isAuthRequired: false,
      isActive: true,
      isCustom: true,
      address: address.toLowerCase(),
      decimals: parseInt(decimals, 10) || 0,
    }]

    yield setDigitalAssets(newItems, address)
    yield onAddCustomTokenSuccess()
  } catch (err) {}
}

function* toggleAllDigitalAssets(items, isActiveAll) {
  const newIsActiveAll = !isActiveAll
  const newItems = items.map(item => ({ ...item, isActive: newIsActiveAll }))
  const newCurrentAddress = newIsActiveAll ? newItems[0].address : null

  yield setDigitalAssets(newItems, newCurrentAddress)
  yield setActiveAllFlag(newIsActiveAll)
}

function refreshDigitalAssets(defaultDigitalAssets, storageDigitalAssets) {
  const freshDigitalAssets = [...defaultDigitalAssets]

  storageDigitalAssets.forEach((item) => {
    const { address, isCustom, isActive } = item

    const defaultDigitalAsset = find(defaultDigitalAssets, { address })
    const isDefault = !!defaultDigitalAsset

    if (isCustom) {
      freshDigitalAssets.push(item)
    } else if (isActive && !isDefault) {
      freshDigitalAssets.push({ ...item, isCustom: true })
    } else {
      defaultDigitalAsset.isActive = isActive
    }
  })

  return freshDigitalAssets
}

function* getTransactions() {
  yield put({ type: TRANSACTIONS_GET })
}

function* getBalances() {
  const { items, isLoading } = yield select(selectDigitalAssets)

  if (isLoading) {
    return
  }

  const address = yield select(selectCurrentKeystoreAddress)

  if (isEmpty(address)) {
    return
  }

  const tokensBalances = getTokensBalances(items, address)

  const balances = yield all({
    ETH: call(web3.getETHBalance, address),
    ...tokensBalances,
  })

  yield setBalances(balances)
}

function* getBalancesLoop() {
  yield getBalances()

  // check that getBalancesLoop was not called more than one time
  if (isGetBalancesLoopLaunched > 1) {
    return
  }

  yield delay(config.getBalancesIntervalTimeout)
  yield getBalancesLoop()
}

function getTokensBalances(items, owner) {
  const result = {}

  items.forEach((token) => {
    const { symbol, address, decimals } = token

    if (!(address && address.length)) {
      return
    }

    result[symbol] = call(web3.getTokenBalance, address, owner, decimals)
  })

  return result
}

function* setBalancesToStorage(action) {
  const networkName = yield select(selectCurrentNetworkName)

  storage.setDigitalAssetsBalances(JSON.stringify(action.balances || {}), networkName)
}

function* setBalances(balances) {
  yield put({ type: CURRENCIES_SET_BALANCES, balances })
}

function* setDigitalAssets(items, currentAddress) {
  yield put({ type: CURRENCIES_SET, items })
  yield setCurrentDigitalAssetAddress(items, currentAddress)
}

function* setCurrentDigitalAssetAddress(items, currentAddress) {
  const currentDigitalAsset = find(items, { address: currentAddress })
  const isAcive = currentDigitalAsset ? currentDigitalAsset.isActive : false
  const newCurrentAddress = isAcive ? currentAddress : getNextAvailableActiveAddress(items)

  yield put({ type: CURRENCIES_SET_CURRENT, currentAddress: newCurrentAddress })
}

function getNextAvailableActiveAddress(items) {
  for (let i = 0; i < items.length; i += 1) {
    const { address, isActive, isAuthRequired } = items[i]

    if (isActive && !isAuthRequired) {
      return address
    }
  }

  return null
}

function* setActiveAllFlag(isActiveAll) {
  yield put({ type: CURRENCIES_SET_ACTIVE_ALL, isActiveAll })
}

function* setSearchOptions(foundItemsSymbols, searchQuery) {
  yield put({ type: CURRENCIES_SET_SEARCH_OPTIONS, foundItemsSymbols, searchQuery })
}

function* setSortOptions(sortField, sortDirection) {
  yield put({ type: CURRENCIES_SET_SORT_OPTIONS, sortField, sortDirection })
}

function* onAddCustomTokenSuccess() {
  yield put({ type: CUSTOM_TOKEN_CLEAR })
}

export function* watchGetDigitalAssets() {
  yield takeEvery(CURRENCIES_GET, onGetDigitalAssets)
}

export function* watchSetDigitalAssets() {
  yield takeEvery(CURRENCIES_SET, onSetDigitalAssets)
}

export function* watchGetBalances() {
  yield takeEvery(CURRENCIES_GET_BALANCES, getBalances)
}

export function* watchSetBalances() {
  yield takeEvery(CURRENCIES_SET_BALANCES, setBalancesToStorage)
}

export function* watchToggleDigitalAsset() {
  yield takeEvery(CURRENCIES_TOGGLE_ACTIVE, onToggleDigitalAsset)
}

export function* watchSetCurrentDigitalAsset() {
  yield takeEvery(CURRENCIES_SET_CURRENT, onSetCurrentDigitalAsset)
}

export function* watchSearchDigitalAssets() {
  yield takeEvery(CURRENCIES_SEARCH, onSearchDigitalAssets)
}

export function* watchSortDigitalAssets() {
  yield takeEvery(CURRENCIES_SORT, onSortDigitalAssets)
}

export function* watchAddCustom() {
  yield takeEvery(CURRENCIES_ADD_CUSTOM, onAddCustomToken)
}
