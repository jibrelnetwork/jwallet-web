import { all, call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import jibrelContractsApi from 'jibrel-contracts-jsapi'

import config from 'config'
import { tokens, searchItems, sortItems, storage, storageKeys } from 'utils'

import {
  CURRENCIES_GET,
  CURRENCIES_SET,
  CURRENCIES_SET_CURRENT,
  CURRENCIES_SET_ACTIVE_ALL,
  CURRENCIES_TOGGLE_ACTIVE,
  CURRENCIES_SEARCH,
  CURRENCIES_SORT,
  CURRENCIES_SET_SEARCH_OPTIONS,
  CURRENCIES_SET_SORT_OPTIONS,
  CURRENCIES_SET_BALANCES,
} from '../modules/currencies'

import { GET_TRANSACTIONS } from '../modules/transactions'

const { getBalanceIntervalTimeout, defaultDecimals } = config
const currenciesSearchFields = ['symbol', 'name']

let getBalanceLaunchId = 0

function getStateCurrencies(state) {
  return state.currencies
}

function getRpcProps(state) {
  const { items, currentActiveIndex } = state.networks
  const { rpcaddr, rpcport, ssl } = items[currentActiveIndex]

  return { rpcaddr, rpcport, ssl }
}

function getKeystoreAddress(state) {
  const { currentAccount, addressesFromMnemonic } = state.keystore
  const { type, address, addressIndex } = currentAccount

  return (type === 'mnemonic') ? addressesFromMnemonic[addressIndex] : address
}

function setCurrenciesToStorage(action) {
  const { items, currentActiveIndex } = action

  storage.setItem(storageKeys.CURRENCIES, JSON.stringify(items || []))
  storage.setItem(storageKeys.CURRENCIES_CURRENT, currentActiveIndex || 0)
}

function* setCurrentCurrencyToStorage(action) {
  const { currentActiveIndex } = action

  storage.setItem(storageKeys.CURRENCIES_CURRENT, currentActiveIndex || 0)
  yield put({ type: GET_TRANSACTIONS, currencyIndex: currentActiveIndex })
}

function setBalancesToStorage(action) {
  storage.setItem(storageKeys.CURRENCIES_BALANCES, JSON.stringify(action.balances || {}))
}

function* setBalances(balances) {
  yield put({ type: CURRENCIES_SET_BALANCES, balances })

  if (getBalanceLaunchId > 1) {
    return
  }

  yield delay(getBalanceIntervalTimeout)
  yield getBalances()
}

function* getCurrenciesFromStorage() {
  let items = tokens.main
  let balances = {}
  let currentActiveIndex = 0

  try {
    const currenciesFromStorage = storage.getItem(storageKeys.CURRENCIES)
    const balancesFromStorage = storage.getItem(storageKeys.CURRENCIES_BALANCES)
    const currencyIndexFromStorage = storage.getItem(storageKeys.CURRENCIES_CURRENT)

    items = currenciesFromStorage ? JSON.parse(currenciesFromStorage) : tokens.main
    balances = balancesFromStorage ? JSON.parse(balancesFromStorage) : {}
    currentActiveIndex = parseInt(currencyIndexFromStorage, 10) || 0
  } catch (e) {
    // console.error(e)
  }

  yield setCurrencies(items, currentActiveIndex)
  yield setBalances(balances)

  // need to increment counter, to prevent another loops when getBalance is called
  getBalanceLaunchId += 1
}

function* getBalances() {
  const { items, isLoading } = yield select(getStateCurrencies)

  if (isLoading) {
    return
  }

  const rpcProps = yield select(getRpcProps)
  const address = yield select(getKeystoreAddress)

  const tokensBalances = getTokensBalances(items, rpcProps, address)

  const balances = yield all({
    ETH: call(getEthBalance, address, rpcProps),
    ...tokensBalances,
  })

  yield setBalances(balances)
}

function getEthBalance(address, rpcProps) {
  return jibrelContractsApi.eth
    .getBalance({ ...rpcProps, address })
    .then(balance => (balance.toNumber() / (10 ** defaultDecimals)))
}

function getTokensBalances(items, rpcProps, owner) {
  const result = {}

  items.forEach((token) => {
    const { symbol, address, decimals } = token

    if (!(address && address.length)) {
      return
    }

    result[symbol] = call(getTokenBalance, address, owner, rpcProps, decimals)
  })

  return result
}

function getTokenBalance(contractAddress, owner, rpcProps, decimals = defaultDecimals) {
  return jibrelContractsApi.contracts.erc20
    .balanceOf({ ...rpcProps, contractAddress, owner })
    .then(balance => (balance.toNumber() / (10 ** decimals)))
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

  let newIsActiveAll = (index === -1) ? !isActiveAll : isActiveAll

  const newItems = items.map((item, i) => {
    const isCurrentActive = (index === i) ? !item.isActive : item.isActive

    return {
      ...item,
      isActive: (index === -1) ? newIsActiveAll : isCurrentActive,
    }
  })

  // check if all is active - set isActiveAll flag to true, otherwise set to false
  if (index !== -1) {
    newIsActiveAll = true

    newItems.forEach((item) => {
      if (!item.isActive) {
        newIsActiveAll = false
      }
    })
  }

  yield setCurrencies(newItems, currentActiveIndex)
  yield put({ type: CURRENCIES_SET_ACTIVE_ALL, isActiveAll: newIsActiveAll })
}

function* searchCurrencies(action) {
  const currencies = yield select(getStateCurrencies)
  const { searchQuery } = action

  const foundItems = searchItems(currencies.items, searchQuery, currenciesSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield put({ type: CURRENCIES_SET_SEARCH_OPTIONS, foundItemsSymbols, searchQuery })
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

  yield put({
    type: CURRENCIES_SET_SORT_OPTIONS,
    sortField: result.sortField,
    sortDirection: result.sortDirection,
  })
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
