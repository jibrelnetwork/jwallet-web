// @flow

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

function* onGetDigitalAssets(): Saga<void> {
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

function* onSetDigitalAssets(action: { items: DigitalAssets }): Saga<void> {
  const networkId = yield select(selectCurrentNetworkId)

  storage.setDigitalAssets(JSON.stringify(action.items), networkId)
}

function* onToggleDigitalAsset(action: { address: Address | null }): Saga<void> {
  const { items, currentAddress, isActiveAll } = yield select(selectDigitalAssets)

  if (action.address === null) {
    yield toggleAllDigitalAssets(items, isActiveAll)

    return
  }

  // toggle isActive state of found item
  const newItems = [...items]
  const toggledItem = find(newItems, { address: action.address })
  toggledItem.isActive = !toggledItem.isActive

  // need to get new active address is current was toggled off
  const isCurrentOff = ((currentAddress === action.address) && !toggledItem.isActive)
  const newCurrentAddress = isCurrentOff ? getNextAvailableActiveAddress(newItems) : currentAddress

  // set new isActiveAll state
  const totalItemsLength = newItems.length
  const activeItemsLength = newItems.filter(({ isActive }) => isActive).length
  const newIsActiveAll = (totalItemsLength === activeItemsLength)

  yield setDigitalAssets(newItems, newCurrentAddress)
  yield setActiveAllFlag(newIsActiveAll)
}

function* onSetCurrentDigitalAsset(action: { currentAddress: Address }): Saga<void> {
  const networkId = yield select(selectCurrentNetworkId)

  storage.setDigitalAssetsCurrent(action.currentAddress, networkId)

  yield getTransactions()
}

function* onSearchDigitalAssets(action: { searchQuery: string }): Saga<void> {
  const { items } = yield select(selectDigitalAssets)

  const foundItems = searchItems(items, action.searchQuery, digitalAssetsSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield setSearchOptions(foundItemsSymbols, action.searchQuery)
}

function* onSortDigitalAssets(action: { sortField: string }): Saga<void> {
  const { items, currentAddress, sortField, sortDirection } = yield select(selectDigitalAssets)
  const newSortField = action.sortField || sortField

  const result = sortItems(items, sortField, newSortField, sortDirection)
  const newItems = placeETHAndJNTFirst(result.items)

  yield setDigitalAssets(newItems, currentAddress)
  yield setSortOptions(result.sortField, result.sortDirection)
}

function* onAddCustomToken(action: { customTokenData: CustomAssetData }): Saga<void> {
  try {
    const { items } = yield select(selectDigitalAssets)

    checkCustomTokenData(action.customTokenData, items)

    const newItems = [...items, getCustomTokenData(action.customTokenData)]

    yield setDigitalAssets(newItems, action.customTokenData.address)
    yield onAddCustomTokenSuccess()
  } catch (err) {
    yield onAddCustomTokenError(err)
  }
}

function checkCustomTokenData(tokenData: CustomAssetData, items: DigitalAssets) {
  checkCustomTokenAddress(tokenData.address, items)
  checkCustomTokenName(tokenData.name)
  checkCustomTokenSymbol(tokenData.symbol, items)
  checkCustomTokenDecimals(tokenData.decimals)
}

function checkCustomTokenAddress(address: Address, items: DigitalAssets) {
  if (!Keystore.isValidAddress(address)) {
    throw (new InvalidFieldError('address', i18n('routes.addCustomAsset.error.address.invalid')))
  }

  checkContractAddressUniq(address, items)
}

function checkContractAddressUniq(address: Address, items: DigitalAssets) {
  items.forEach((token) => {
    if (address.toLowerCase() === token.address.toLowerCase()) {
      throw (new InvalidFieldError('address', i18n('routes.addCustomAsset.error.address.exists')))
    }
  })
}

function checkCustomTokenName(name: string) {
  if (/[^a-zA-Z ]/.test(name) || (name.length < 3) || (name.length > 100)) {
    throw (new InvalidFieldError('name', i18n('routes.addCustomAsset.error.name.invalid')))
  }
}

function checkCustomTokenSymbol(symbol: string, items: DigitalAssets) {
  if (/[^a-zA-Z]/.test(symbol) || (symbol.length < 3) || (symbol.length > 5)) {
    throw (new InvalidFieldError('symbol', i18n('routes.addCustomAsset.error.symbol.invalid')))
  }

  checkContractSymbolUniq(symbol, items)
}

function checkContractSymbolUniq(symbol: string, items: DigitalAssets) {
  items.forEach((token) => {
    if (symbol.toLowerCase() === token.symbol.toLowerCase()) {
      throw (new InvalidFieldError('symbol', i18n('routes.addCustomAsset.error.symbol.exists')))
    }
  })
}

function checkCustomTokenDecimals(decimals: string) {
  const decimalsInt = parseInt(decimals, 10) || 0

  if ((decimalsInt <= 0) || (decimalsInt > 18)) {
    throw (new InvalidFieldError('decimals', i18n('routes.addCustomAsset.error.decimals.invalid')))
  }
}

function getCustomTokenData(tokenData: CustomAssetData): DigitalAsset {
  return {
    name: tokenData.name,
    symbol: tokenData.symbol,
    isLicensed: false,
    isAuthRequired: false,
    isActive: true,
    isCustom: true,
    isCurrent: true,
    address: tokenData.address.toLowerCase(),
    decimals: parseInt(tokenData.decimals, 10) || 0,
  }
}

function placeETHAndJNTFirst(items: DigitalAssets): DigitalAssets {
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

function* toggleAllDigitalAssets(items: DigitalAssets, isActiveAll: boolean) {
  const newIsActiveAll = !isActiveAll
  const newItems = items.map(item => ({ ...item, isActive: newIsActiveAll }))
  const newCurrentAddress = newIsActiveAll ? newItems[0].address : null

  yield setDigitalAssets(newItems, newCurrentAddress)
  yield setActiveAllFlag(newIsActiveAll)
}

function refreshDigitalAssets(
  defaultDigitalAssets: DigitalAssets,
  storageDigitalAssets: DigitalAssets,
): Array<any> {
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

function removeExistedJNTFromAssets(digitalAssets: DigitalAssets): DigitalAssets {
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

function* getBalances(): Saga<void> {
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

function getTokensBalances(items: DigitalAssets, owner: Address) {
  const result = {}

  items.forEach(({ symbol, address, decimals, isActive }) => {
    if (!isActive || isEmpty(address)) {
      return
    }

    result[symbol] = call(web3.getTokenBalance, address, owner, decimals)
  })

  return result
}

function* setBalancesToStorage(action): Saga<void> {
  const network = yield select(selectCurrentNetwork)

  if (!network) {
    return
  }

  storage.setDigitalAssetsBalances(JSON.stringify(action.balances || {}), network.id)
}

function* setBalances(balances) {
  yield put({ type: CURRENCIES_SET_BALANCES, balances })
}

function* setDigitalAssets(items: DigitalAssets, currentAddress: Address | null) {
  yield put({ type: CURRENCIES_SET, items })
  yield setCurrentDigitalAssetAddress(items, currentAddress)
}

function* setCurrentDigitalAssetAddress(items: DigitalAssets, currentAddress: Address | null) {
  const currentDigitalAsset = find(items, { address: currentAddress })
  const isAcive = currentDigitalAsset ? currentDigitalAsset.isActive : false
  const newCurrentAddress = isAcive ? currentAddress : getNextAvailableActiveAddress(items)

  yield put({ type: CURRENCIES_SET_CURRENT, currentAddress: newCurrentAddress })
}

function getNextAvailableActiveAddress(items: DigitalAssets): Address | null {
  for (let i = 0; i < items.length; i += 1) {
    const { address, isActive, isAuthRequired } = items[i]

    if (isActive && !isAuthRequired) {
      return address
    }
  }

  return null
}

function* setActiveAllFlag(isActiveAll: boolean) {
  yield put({ type: CURRENCIES_SET_ACTIVE_ALL, isActiveAll })
}

function* setSearchOptions(foundItemsSymbols: Array<string>, searchQuery: string) {
  yield put({ type: CURRENCIES_SET_SEARCH_OPTIONS, foundItemsSymbols, searchQuery })
}

function* setSortOptions(sortField: string, sortDirection: string) {
  yield put({ type: CURRENCIES_SET_SORT_OPTIONS, sortField, sortDirection })
}

function* onAddCustomTokenSuccess() {
  gtm.pushAddCustomToken()
  yield put({ type: CUSTOM_TOKEN_CLEAR })
}

function* onAddCustomTokenError(action: { fieldName: string, message: string }) {
  yield put({
    type: CUSTOM_TOKEN_SET_INVALID_FIELD,
    fieldName: action.fieldName,
    message: action.message,
  })
}

export function* watchGetDigitalAssets(): Saga<void> {
  yield takeEvery(CURRENCIES_GET, onGetDigitalAssets)
}

export function* watchSetDigitalAssets(): Saga<void> {
  yield takeEvery(CURRENCIES_SET, onSetDigitalAssets)
}

export function* watchGetBalances(): Saga<void> {
  yield takeEvery(CURRENCIES_GET_BALANCES, getBalances)
}

export function* watchSetBalances(): Saga<void> {
  yield takeEvery(CURRENCIES_SET_BALANCES, setBalancesToStorage)
}

export function* watchToggleDigitalAsset(): Saga<void> {
  yield takeEvery(CURRENCIES_TOGGLE_ACTIVE, onToggleDigitalAsset)
}

export function* watchSetCurrentDigitalAsset(): Saga<void> {
  yield takeEvery(CURRENCIES_SET_CURRENT, onSetCurrentDigitalAsset)
}

export function* watchSearchDigitalAssets(): Saga<void> {
  yield takeEvery(CURRENCIES_SEARCH, onSearchDigitalAssets)
}

export function* watchSortDigitalAssets(): Saga<void> {
  yield takeEvery(CURRENCIES_SORT, onSortDigitalAssets)
}

export function* watchAddCustom(): Saga<void> {
  yield takeEvery(CURRENCIES_ADD_CUSTOM, onAddCustomToken)
}
