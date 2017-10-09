import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { getTokenNameBySymbolName, searchItems, sortItems } from 'utils'

import {
  CURRENCIES_GET_FROM_STORAGE,
  CURRENCIES_SET,
  CURRENCIES_SET_CURRENT,
  CURRENCIES_SET_ACTIVE_ALL,
  CURRENCIES_TOGGLE_ACTIVE,
  CURRENCIES_SEARCH,
  CURRENCIES_SORT,
  CURRENCIES_SET_SEARCH_OPTIONS,
  CURRENCIES_SET_SORT_OPTIONS,
} from '../modules/currencies'

import { GET_TRANSACTIONS } from '../modules/transactions'

const currenciesStub = [{
  symbol: 'ETH',
  balance: 2.12345,
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
  address: '',
}, {
  symbol: 'jUSD',
  balance: 7.8900000001,
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
  address: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
}, {
  symbol: 'jEUR',
  balance: 8.65789999,
  isLicensed: false,
  isAuthRequired: false,
  isActive: false,
  address: '0x06360d2b7d240ec0643b6d819ba81a09e40e5bcd',
}, {
  symbol: 'JNT',
  balance: 9.9999999,
  isLicensed: true,
  isAuthRequired: true,
  isActive: true,
  address: '0x09360d2b7d240ec0643b6d819ba81a09e40e5bcd',
}]

const currenciesSearchFields = ['symbol', 'name', 'balanceFixed', 'licensed', 'transfer']

function getStateCurrencies(state) {
  return state.currencies
}

function* getCurrencies() {
  yield delay(1000)

  const items = currenciesStub.map((item) => {
    const { symbol, balance, isLicensed, isAuthRequired } = item

    return {
      ...item,
      name: getTokenNameBySymbolName(symbol),
      balanceFixed: balance.toFixed(3),
      licensed: isLicensed ? 'Yes' : 'No',
      transfer: isAuthRequired ? 'Not Authorized' : 'Authorized',
    }
  })

  yield put({ type: CURRENCIES_SET, items })
}

function* setCurrentAccount(action) {
  yield put({ type: GET_TRANSACTIONS, currencyIndex: action.index })
}

function* setCurrencies() {
  const { items, currentActiveIndex } = yield select(getStateCurrencies)
  const isCurrentActive = (currentActiveIndex > -1) ? items[currentActiveIndex].isActive : false

  if (isCurrentActive) {
    return
  }

  /**
   * if isActive flag was set to false for current currency
   * need to set next available isActive currency as current
   * if there are no isActive currencies, set currentActiveIndex to -1
   */
  const nextAvailableActiveIndex = getNextAvailableActiveIndex(items)

  yield put({ type: CURRENCIES_SET_CURRENT, index: nextAvailableActiveIndex })
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

function* toggleAccount(action) {
  const { items, isActiveAll } = yield select(getStateCurrencies)
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

  yield put({ type: CURRENCIES_SET, items: newItems })
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

  yield put({ type: CURRENCIES_SET, items: result.items })
  yield put({ type: CURRENCIES_SET_CURRENT, index: newActiveIndex })

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
  yield takeEvery(CURRENCIES_GET_FROM_STORAGE, getCurrencies)
}

export function* watchToggleAccount() {
  yield takeEvery(CURRENCIES_TOGGLE_ACTIVE, toggleAccount)
}

export function* watchSetCurrentAccount() {
  yield takeEvery(CURRENCIES_SET_CURRENT, setCurrentAccount)
}

export function* watchSetActiveAll() {
  yield takeEvery(CURRENCIES_SET, setCurrencies)
}

export function* watchSearchCurrencies() {
  yield takeEvery(CURRENCIES_SEARCH, searchCurrencies)
}

export function* watchSortCurrencies() {
  yield takeEvery(CURRENCIES_SORT, sortCurrencies)
}
