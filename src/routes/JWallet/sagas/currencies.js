import Keystore from 'jwallet-web-keystore'
import { delay } from 'redux-saga'
import { find, findIndex, findLastIndex, isEmpty } from 'lodash'
import { all, call, put, select, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { gtm, storage, web3 } from 'services'
import { InvalidFieldError, getDefaultDigitalAssets, searchItems, sortItems } from 'utils'

import {
  selectDigitalAssets,
  selectCurrentNetwork,
  selectCurrentNetworkId,
  selectCurrentKeystoreAddress,
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

import {
  CUSTOM_TOKEN_SET_INVALID_FIELD,
  CUSTOM_TOKEN_CLEAR,
} from '../modules/modals/customToken'

import { TRANSACTIONS_GET } from '../modules/transactions'

const digitalAssetsSearchFields = ['symbol', 'name']
let isGetBalancesLoopLaunched = 0

function* onGetDigitalAssets() {
  const networkId = yield select(selectCurrentNetworkId)
  const defaultDigitalAssets = getDefaultDigitalAssets(networkId)

  let storageDigitalAssets = []
  let balances = {}
  let currentAddress = null

  try {
    const digitalAssetsFromStorage = storage.getDigitalAssets(networkId) || '[]'
    const balancesFromStorage = storage.getDigitalAssetsBalances(networkId) || '{}'
    currentAddress = storage.getDigitalAssetsCurrent(networkId)

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
    yield getBalances()

    return
  }

  // need to set flag to prevent another loops when getBalances is called
  isGetBalancesLoopLaunched += 1
  yield getBalancesLoop()
}

function* onSetDigitalAssets({ items }) {
  const networkId = yield select(selectCurrentNetworkId)

  storage.setDigitalAssets(JSON.stringify(items), networkId)
}

function* onToggleDigitalAsset({ address }) {
  const { items, currentAddress, isActiveAll } = yield select(selectDigitalAssets)

  if (address === null) {
    yield toggleAllDigitalAssets(items, isActiveAll)

    return
  }

  // toggle isActive state of found item
  const newItems = [...items]
  const toggledItem = find(newItems, { address })
  toggledItem.isActive = !toggledItem.isActive

  // need to get new active address is current was toggled off
  const isCurrentOff = ((currentAddress === address) && !toggledItem.isActive)
  const newCurrentAddress = isCurrentOff ? getNextAvailableActiveAddress(newItems) : currentAddress

  // set new isActiveAll state
  const totalItemsLength = newItems.length
  const activeItemsLength = newItems.filter(({ isActive }) => isActive).length
  const newIsActiveAll = (totalItemsLength === activeItemsLength)

  yield setDigitalAssets(newItems, newCurrentAddress)
  yield setActiveAllFlag(newIsActiveAll)
}

function* onSetCurrentDigitalAsset({ currentAddress }) {
  const networkId = yield select(selectCurrentNetworkId)

  storage.setDigitalAssetsCurrent(currentAddress, networkId)

  yield getTransactions()
}

function* onSearchDigitalAssets({ searchQuery }) {
  const { items } = yield select(selectDigitalAssets)

  const foundItems = searchItems(items, searchQuery, digitalAssetsSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield setSearchOptions(foundItemsSymbols, searchQuery)
}

function* onSortDigitalAssets(action) {
  const { items, currentAddress, sortField, sortDirection } = yield select(selectDigitalAssets)
  const newSortField = action.sortField || sortField

  const result = sortItems(items, sortField, newSortField, sortDirection)
  const newItems = placeETHAndJNTFirst(result.items)

  yield setDigitalAssets(newItems, currentAddress)
  yield setSortOptions(result.sortField, result.sortDirection)
}

function* onAddCustomToken({ customTokenData }) {
  try {
    const { items } = yield select(selectDigitalAssets)

    checkCustomTokenData(customTokenData, items)

    const newItems = [...items, getCustomTokenData(customTokenData)]

    yield setDigitalAssets(newItems, customTokenData.address)
    yield onAddCustomTokenSuccess()
  } catch (err) {
    yield onAddCustomTokenError(err)
  }
}

function checkCustomTokenData({ address, name, symbol, decimals }, items) {
  checkCustomTokenAddress(address, items)
  checkCustomTokenName(name)
  checkCustomTokenSymbol(symbol, items)
  checkCustomTokenDecimals(decimals)
}

function checkCustomTokenAddress(address, items) {
  if (!Keystore.isValidAddress(address)) {
    throw (new InvalidFieldError('address', i18n('modals.addCustomToken.error.address.invalid')))
  }

  checkContractAddressUniq(address, items)
}

function checkContractAddressUniq(address, items) {
  items.forEach((token) => {
    if (address.toLowerCase() === token.address.toLowerCase()) {
      throw (new InvalidFieldError('address', i18n('modals.addCustomToken.error.address.exists')))
    }
  })
}

function checkCustomTokenName(name) {
  if (/[^a-zA-Z ]/.test(name) || (name.length < 3) || (name.length > 100)) {
    throw (new InvalidFieldError('name', i18n('modals.addCustomToken.error.name.invalid')))
  }
}

function checkCustomTokenSymbol(symbol, items) {
  if (/[^a-zA-Z]/.test(symbol) || (symbol.length < 3) || (symbol.length > 5)) {
    throw (new InvalidFieldError('symbol', i18n('modals.addCustomToken.error.symbol.invalid')))
  }

  checkContractSymbolUniq(symbol, items)
}

function checkContractSymbolUniq(symbol, items) {
  items.forEach((token) => {
    if (symbol.toLowerCase() === token.symbol.toLowerCase()) {
      throw (new InvalidFieldError('symbol', i18n('modals.addCustomToken.error.symbol.exists')))
    }
  })
}

function checkCustomTokenDecimals(decimals) {
  const decimalsInt = parseInt(decimals, 10) || 0

  if ((decimalsInt <= 0) || (decimalsInt > 18)) {
    throw (new InvalidFieldError('decimals', i18n('modals.addCustomToken.error.decimals.invalid')))
  }
}

function getCustomTokenData({ address, name, symbol, decimals }) {
  return {
    name,
    symbol,
    isLicensed: false,
    isAuthRequired: false,
    isActive: true,
    isCustom: true,
    address: address.toLowerCase(),
    decimals: parseInt(decimals, 10) || 0,
  }
}

function placeETHAndJNTFirst(items) {
  const newItems = [...items]
  const symbolJNT = { symbol: 'JNT' }
  const symbolETH = { symbol: 'ETH' }

  const jntIndex = findIndex(items, symbolJNT)

  if (jntIndex > -1) {
    newItems.splice(jntIndex, 1)
    newItems.unshift(items[jntIndex])
  }

  const ethIndex = findIndex(newItems, symbolETH)

  if (ethIndex > -1) {
    newItems.splice(ethIndex, 1)
    newItems.unshift(items[findIndex(items, symbolETH)])
  }

  return newItems
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
  const storageDigitalAssetsWithoutJNT = removeExistedJNTFromAssets(storageDigitalAssets)

  storageDigitalAssetsWithoutJNT.forEach((item) => {
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

function removeExistedJNTFromAssets(digitalAssets) {
  const jntIndex = findLastIndex(digitalAssets, { symbol: 'JNT' })

  if (jntIndex > -1) {
    const newDigitalAssets = [...digitalAssets]
    newDigitalAssets.splice(jntIndex, 1)

    return newDigitalAssets
  }

  return digitalAssets
}

function* getTransactions() {
  yield put({ type: TRANSACTIONS_GET })
}

function* getBalances() {
  const { items, isLoading } = yield select(selectDigitalAssets)
  const address = yield select(selectCurrentKeystoreAddress)

  if (isLoading || isEmpty(address)) {
    return
  }

  const ethBalance = { ETH: call(web3.getETHBalance, address) }
  const tokensBalances = getTokensBalances(items, address)
  const balances = yield all({ ...ethBalance, ...tokensBalances })

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

  items.forEach(({ symbol, address, decimals, isActive }) => {
    if (!isActive || isEmpty(address)) {
      return
    }

    result[symbol] = call(web3.getTokenBalance, address, owner, decimals)
  })

  return result
}

function* setBalancesToStorage(action) {
  const network = yield select(selectCurrentNetwork)

  if (!network) {
    return
  }

  storage.setDigitalAssetsBalances(JSON.stringify(action.balances || {}), network.id)
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
  gtm.pushAddCustomToken()
  yield put({ type: CUSTOM_TOKEN_CLEAR })
}

function* onAddCustomTokenError({ fieldName, message }) {
  yield put({ type: CUSTOM_TOKEN_SET_INVALID_FIELD, fieldName, message })
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
