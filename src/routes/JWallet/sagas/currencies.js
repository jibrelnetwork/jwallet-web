import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import isEmpty from 'lodash/isEmpty'

import config from 'config'
import { storage, web3 } from 'services'
import { getDefaultTokens, searchItems, sortItems } from 'utils'

import {
  selectCurrencies,
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

const currenciesSearchFields = ['symbol', 'name']
let isGetBalancesLoopLaunched = 0

function* getTransactions(currencyIndex = 0) {
  yield put({ type: TRANSACTIONS_GET, currencyIndex })
}

function* getCurrenciesFromStorage() {
  const networkName = yield select(selectCurrentNetworkName)

  let items = getDefaultTokens(networkName)
  let balances = {}
  let currentActiveIndex = 0

  try {
    const currenciesFromStorage = storage.getCurrencies(networkName)
    const balancesFromStorage = storage.getCurrenciesBalances(networkName)
    const currencyIndexFromStorage = storage.getCurrenciesCurrent(networkName)

    items = currenciesFromStorage ? JSON.parse(currenciesFromStorage) : items
    balances = balancesFromStorage ? JSON.parse(balancesFromStorage) : {}
    currentActiveIndex = parseInt(currencyIndexFromStorage, 10) || 0
  } catch (e) {
    console.error(e)
  }

  yield setCurrencies(items, currentActiveIndex)
  yield setBalances(balances)
  yield sortCurrencies({ sortField: 'symbol' })

  // ignore if getBalances loop was already launched
  if (isGetBalancesLoopLaunched) {
    return
  }

  // need to set flag to prevent another loops when getBalances is called
  isGetBalancesLoopLaunched += 1
  yield getBalancesLoop()
}

function* getBalances() {
  const { items, isLoading } = yield select(selectCurrencies)

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

function getTokensBalances(items = [], owner = '') {
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

function* setCurrenciesToStorage(action) {
  const networkName = yield select(selectCurrentNetworkName)

  storage.setCurrencies(JSON.stringify(action.items || []), networkName)
}

function* setCurrentCurrencyToStorage(action) {
  const { currentActiveIndex } = action
  const networkName = yield select(selectCurrentNetworkName)

  storage.setCurrenciesCurrent(currentActiveIndex || 0, networkName)

  yield getTransactions(currentActiveIndex)
}

function* setBalancesToStorage(action) {
  const networkName = yield select(selectCurrentNetworkName)

  storage.setCurrenciesBalances(JSON.stringify(action.balances || {}), networkName)
}

function* setBalances(balances = []) {
  yield put({ type: CURRENCIES_SET_BALANCES, balances })
}

function* setCurrencies(items = [], currentIndex = 0) {
  const isCurrentActive = (currentIndex > -1) ? items[currentIndex].isActive : false

  /**
   * if isActive flag was set to false for current currency
   * need to set next available isActive currency as current
   * if there are no isActive currencies, set currentActiveIndex to -1
   */
  const currentActiveIndex = isCurrentActive ? currentIndex : getNextAvailableActiveIndex(items)

  yield put({ type: CURRENCIES_SET, items })
  yield put({ type: CURRENCIES_SET_CURRENT, currentActiveIndex })
}

function getNextAvailableActiveIndex(items = []) {
  for (let i = 0; i < items.length; i += 1) {
    const { isActive, isAuthRequired } = items[i]

    if (isActive && !isAuthRequired) {
      return i
    }
  }

  return -1
}

function* toggleCurrency(action) {
  const { items, currentActiveIndex, isActiveAll } = yield select(selectCurrencies)
  const { index } = action

  const isAllToggled = (index === -1)
  let newIsActiveAll = isAllToggled ? !isActiveAll : isActiveAll

  const newItems = items.map((item, i) => {
    const isCurrentActive = (index === i) ? !item.isActive : item.isActive

    return {
      ...item,
      isActive: isAllToggled ? newIsActiveAll : isCurrentActive,
    }
  })

  // check if all is active - set isActiveAll flag to true, otherwise set to false
  if (!isAllToggled) {
    newIsActiveAll = true

    newItems.forEach((item) => {
      if (!item.isActive) {
        newIsActiveAll = false
      }
    })
  }

  yield setCurrencies(newItems, currentActiveIndex)
  yield setActiveAllFlag(newIsActiveAll)
}

function* setActiveAllFlag(isActiveAll = false) {
  yield put({ type: CURRENCIES_SET_ACTIVE_ALL, isActiveAll })
}

function* setSearchOptions(foundItemsSymbols = [], searchQuery = '') {
  yield put({ type: CURRENCIES_SET_SEARCH_OPTIONS, foundItemsSymbols, searchQuery })
}

function* setSortOptions(sortField = '', sortDirection = 'ASC') {
  yield put({ type: CURRENCIES_SET_SORT_OPTIONS, sortField, sortDirection })
}

function* searchCurrencies(action) {
  const currencies = yield select(selectCurrencies)
  const { searchQuery } = action

  const foundItems = searchItems(currencies.items, searchQuery, currenciesSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield setSearchOptions(foundItemsSymbols, searchQuery)
}

function* sortCurrencies(action) {
  const currencies = yield select(selectCurrencies)

  const oldSortField = currencies.sortField
  const sortField = action.sortField || oldSortField
  const { items, sortDirection, currentActiveIndex } = currencies

  const currentActiveSymbol = items[currentActiveIndex].symbol

  const result = sortItems(items, oldSortField, sortField, sortDirection)
  const newActiveIndex = getNewActiveIndex(result.items, currentActiveSymbol)

  yield setCurrencies(result.items, newActiveIndex)
  yield setSortOptions(result.sortField, result.sortDirection)
}

function getNewActiveIndex(items = [], symbol = '') {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].symbol === symbol) {
      return i
    }
  }

  return -1
}

function* addCustomToken(action) {
  try {
    const { customTokenData } = action
    const decimals = parseInt(customTokenData.decimals, 10) || 0
    const { items } = yield select(selectCurrencies)
    const newActiveIndex = items.length

    const newItems = [...items, {
      ...customTokenData,
      decimals,
      isLicensed: false,
      isAuthRequired: false,
      isActive: true,
    }]

    yield setCurrencies(newItems, newActiveIndex)
    yield addCustomTokenSuccess()
  } catch (e) {
    addCustomTokenError(e)
  }
}

function* addCustomTokenSuccess() {
  yield put({ type: CUSTOM_TOKEN_CLEAR })
}

function addCustomTokenError() {}

export function* watchGetCurrencies() {
  yield takeEvery(CURRENCIES_GET, getCurrenciesFromStorage)
}

export function* watchSetCurrencies() {
  yield takeEvery(CURRENCIES_SET, setCurrenciesToStorage)
}

export function* watchGetBalances() {
  yield takeEvery(CURRENCIES_GET_BALANCES, getBalances)
}

export function* watchSetBalances() {
  yield takeEvery(CURRENCIES_SET_BALANCES, setBalancesToStorage)
}

export function* watchToggleCurrency() {
  yield takeEvery(CURRENCIES_TOGGLE_ACTIVE, toggleCurrency)
}

export function* watchSetCurrentCurrency() {
  yield takeEvery(CURRENCIES_SET_CURRENT, setCurrentCurrencyToStorage)
}

export function* watchSearchCurrencies() {
  yield takeEvery(CURRENCIES_SEARCH, searchCurrencies)
}

export function* watchSortCurrencies() {
  yield takeEvery(CURRENCIES_SORT, sortCurrencies)
}

export function* watchAddCustom() {
  yield takeEvery(CURRENCIES_ADD_CUSTOM, addCustomToken)
}
