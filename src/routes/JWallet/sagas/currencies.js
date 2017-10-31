import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import config from 'config'
import { storage, web3 } from 'services'
import { getDefaultTokens, searchItems, sortItems } from 'utils'

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
} from '../modules/currencies'

import { TRANSACTIONS_GET } from '../modules/transactions'

const { getBalanceIntervalTimeout, defaultDecimals } = config
const currenciesSearchFields = ['symbol', 'name']

let getBalanceLaunchId = 0

function getStateCurrencies(state) {
  return state.currencies
}

function getKeystoreAddress(state) {
  const { currentAccount, addressesFromMnemonic } = state.keystore
  const { type, address, addressIndex } = currentAccount

  return (type === 'mnemonic') ? addressesFromMnemonic.items[addressIndex] : address
}

function getNetworkName(state) {
  const { items, currentActiveIndex } = state.networks

  return items[currentActiveIndex].title
}

function* getTransactions(currencyIndex) {
  yield put({ type: TRANSACTIONS_GET, currencyIndex })
}

function* getCurrenciesFromStorage() {
  const networkName = yield select(getNetworkName)

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
  yield setBalances(balances, true)

  // need to increment counter, to prevent another loops when getBalance is called
  getBalanceLaunchId += 1
}

function* getBalances() {
  const { items, isLoading } = yield select(getStateCurrencies)

  if (isLoading) {
    return
  }

  const address = yield select(getKeystoreAddress)
  const tokensBalances = getTokensBalances(items, address)

  const balances = yield all({
    ETH: call(web3.getETHBalance, address),
    ...tokensBalances,
  })

  yield setBalances(balances)
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

function* setCurrenciesToStorage(action) {
  const { items, currentActiveIndex } = action
  const networkName = yield select(getNetworkName)

  storage.setCurrencies(JSON.stringify(items || []), networkName)
  storage.setCurrenciesCurrent(currentActiveIndex || 0, networkName)

  yield getTransactions(currentActiveIndex)
}

function* setCurrentCurrencyToStorage(action) {
  const { currentActiveIndex } = action
  const networkName = yield select(getNetworkName)

  storage.setCurrenciesCurrent(currentActiveIndex || 0, networkName)

  yield getTransactions(currentActiveIndex)
}

function* setBalancesToStorage(action) {
  const networkName = yield select(getNetworkName)

  storage.setCurrenciesBalances(JSON.stringify(action.balances || {}), networkName)
}

function* setBalances(balances, isFirstLaunch = false) {
  yield put({ type: CURRENCIES_SET_BALANCES, balances })

  // ignore if getBalance loop was already launched
  if (getBalanceLaunchId > 1) {
    return
  }

  // request balances without delay, if this method launched first time
  if (isFirstLaunch) {
    yield getBalances()
  }

  yield delay(getBalanceIntervalTimeout)
  yield getBalances()
}

function* setCurrencies(items, currentIndex) {
  const isCurrentActive = (currentIndex > -1) ? items[currentIndex].isActive : false

  /**
   * if isActive flag was set to false for current currency
   * need to set next available isActive currency as current
   * if there are no isActive currencies, set currentActiveIndex to -1
   */
  const currentActiveIndex = isCurrentActive ? currentIndex : getNextAvailableActiveIndex(items)

  yield put({ type: CURRENCIES_SET, items, currentActiveIndex })
}

function getNextAvailableActiveIndex(items) {
  for (let i = 0; i < items.length; i += 1) {
    const { isActive, isAuthRequired } = items[i]

    if (isActive && !isAuthRequired) {
      return i
    }
  }

  return -1
}

function* toggleCurrency(action) {
  const { items, currentActiveIndex, isActiveAll } = yield select(getStateCurrencies)
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

function* setActiveAllFlag(isActiveAll) {
  yield put({ type: CURRENCIES_SET_ACTIVE_ALL, isActiveAll })
}

function* setSearchOptions(foundItemsSymbols, searchQuery) {
  yield put({ type: CURRENCIES_SET_SEARCH_OPTIONS, foundItemsSymbols, searchQuery })
}

function* setSortOptions(sortField, sortDirection) {
  yield put({ type: CURRENCIES_SET_SORT_OPTIONS, sortField, sortDirection })
}

function* searchCurrencies(action) {
  const currencies = yield select(getStateCurrencies)
  const { searchQuery } = action

  const foundItems = searchItems(currencies.items, searchQuery, currenciesSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield setSearchOptions(foundItemsSymbols, searchQuery)
}

function* sortCurrencies(action) {
  const currencies = yield select(getStateCurrencies)

  const oldSortField = currencies.sortField
  const sortField = action.sortField || oldSortField
  const { items, sortDirection, currentActiveIndex } = currencies
  const currentActiveSymbol = items[currentActiveIndex].symbol

  const result = sortItems(items, oldSortField, sortField, sortDirection)
  const newActiveIndex = getNewActiveIndex(result.items, currentActiveSymbol)

  yield setCurrencies(result.items, newActiveIndex)
  yield setSortOptions(result.sortField, result.sortDirection)
}

function getNewActiveIndex(items, symbol) {
  for (let i = 0; i < items.length; i += 1) {
    if (items[i].symbol === symbol) {
      return i
    }
  }

  return -1
}

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
