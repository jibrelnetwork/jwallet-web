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

import { GET_TRANSACTIONS, SET_TRANSACTIONS } from '../modules/transactions'

const accountsStub = [{
  symbol: 'ETH',
  balance: 2.12345,
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
}, {
  symbol: 'jUSD',
  balance: 7.8900000001,
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
}, {
  symbol: 'jEUR',
  balance: 8.65789999,
  isLicensed: false,
  isAuthRequired: false,
  isActive: false,
}, {
  symbol: 'JNT',
  balance: 9.9999999,
  isLicensed: true,
  isAuthRequired: true,
  isActive: true,
}]

const accountsSearchFields = ['symbol', 'name', 'balanceFixed', 'licensed', 'transfer']

function getStateAccounts(state) {
  return state.accounts
}

function* getAccounts() {
  yield delay(500)

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

function* setCurrentAccount() {
  yield put({ type: GET_TRANSACTIONS })
}

function* setAccounts(action) {
  const { items } = action

  let isActiveAccount = false

  items.forEach((account) => {
    if (account.isActive) {
      isActiveAccount = true
    }
  })

  if (!isActiveAccount) {
    yield put({ type: SET_TRANSACTIONS, items: [] })
  } else {
    yield put({ type: GET_TRANSACTIONS })
  }
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
  const { items, sortDirection } = accounts

  const result = sortItems(items, oldSortField, sortField, sortDirection)

  yield put({ type: SET_ACCOUNTS, items: result.items })

  yield put({
    type: SET_SORT_ACCOUNTS_OPTIONS,
    sortField: result.sortField,
    sortDirection: result.sortDirection,
  })
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
