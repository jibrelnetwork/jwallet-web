import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { getTokenNameBySymbolName, searchItems, sortItems } from 'utils'

import {
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  SET_CURRENT_ACCOUNT,
  SET_ACTIVE_ALL,
  TOGGLE_ACCOUNT,
  SEARCH_ACCOUNTS,
  SORT_ACCOUNTS,
  SET_SEARCH_ACCOUNTS_OPTIONS,
  SET_SORT_ACCOUNTS_OPTIONS,
} from '../modules/accounts'

import { GET_TRANSACTIONS } from '../modules/transactions'

const accountsStub = [{
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

const accountsSearchFields = ['symbol', 'name', 'balanceFixed', 'licensed', 'transfer']

function getStateAccounts(state) {
  return state.accounts
}

function* getAccounts() {
  yield delay(1000)

  const items = accountsStub.map((item) => {
    const { symbol, balance, isLicensed, isAuthRequired } = item

    return {
      ...item,
      name: getTokenNameBySymbolName(symbol),
      balanceFixed: balance.toFixed(3),
      licensed: isLicensed ? 'Yes' : 'No',
      transfer: isAuthRequired ? 'Not Authorized' : 'Authorized',
    }
  })

  yield put({ type: SET_ACCOUNTS, items })
}

function* setCurrentAccount(action) {
  yield put({ type: GET_TRANSACTIONS, accountIndex: action.index })
}

function* setAccounts() {
  const { items, currentActiveIndex } = yield select(getStateAccounts)
  const isCurrentActive = (currentActiveIndex > -1) ? items[currentActiveIndex].isActive : false

  if (isCurrentActive) {
    return
  }

  /**
   * if isActive flag was set to false for current account
   * need to set next available isActive account as current
   * if there are no isActive accounts, set currentActiveIndex to -1
   */
  const nextAvailableActiveIndex = getNextAvailableActiveIndex(items)

  yield put({ type: SET_CURRENT_ACCOUNT, index: nextAvailableActiveIndex })
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
  const { items, isActiveAll } = yield select(getStateAccounts)
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

  yield put({ type: SET_ACCOUNTS, items: newItems })
  yield put({ type: SET_ACTIVE_ALL, isActiveAll: newIsActiveAll })
}

function* searchAccounts(action) {
  const accounts = yield select(getStateAccounts)
  const searchQuery = action.searchQuery

  const foundItems = searchItems(accounts.items, searchQuery, accountsSearchFields)
  const foundItemsSymbols = foundItems.map(i => i.symbol)

  yield put({ type: SET_SEARCH_ACCOUNTS_OPTIONS, foundItemsSymbols, searchQuery })
}

function* sortAccounts(action) {
  const accounts = yield select(getStateAccounts)

  const oldSortField = accounts.sortField
  const sortField = action.sortField || oldSortField
  const { items, sortDirection, currentActiveIndex } = accounts
  const currentActiveSymbol = items[currentActiveIndex].symbol

  const result = sortItems(items, oldSortField, sortField, sortDirection)
  const newActiveIndex = getNewActiveIndex(result.items, currentActiveSymbol)

  yield put({ type: SET_ACCOUNTS, items: result.items })
  yield put({ type: SET_CURRENT_ACCOUNT, index: newActiveIndex })

  yield put({
    type: SET_SORT_ACCOUNTS_OPTIONS,
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

export function* watchGetAccounts() {
  yield takeEvery(GET_ACCOUNTS, getAccounts)
}

export function* watchToggleAccount() {
  yield takeEvery(TOGGLE_ACCOUNT, toggleAccount)
}

export function* watchSetCurrentAccount() {
  yield takeEvery(SET_CURRENT_ACCOUNT, setCurrentAccount)
}

export function* watchSetActiveAll() {
  yield takeEvery(SET_ACCOUNTS, setAccounts)
}

export function* watchSearchAccounts() {
  yield takeEvery(SEARCH_ACCOUNTS, searchAccounts)
}

export function* watchSortAccounts() {
  yield takeEvery(SORT_ACCOUNTS, sortAccounts)
}
