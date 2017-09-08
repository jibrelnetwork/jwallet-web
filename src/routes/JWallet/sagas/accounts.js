import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  GET_ACCOUNTS,
  SET_ACCOUNTS,
  SET_CURRENT_ACCOUNT,
  SET_ACTIVE_ALL,
  TOGGLE_ACCOUNT,
} from '../modules/accounts'

import { GET_TRANSACTIONS, SET_TRANSACTIONS } from '../modules/transactions'

const accountsStub = [{
  symbol: 'ETH',
  balance: 2.123,
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
}, {
  symbol: 'jUSD',
  balance: 7.890,
  isLicensed: false,
  isAuthRequired: false,
  isActive: true,
}, {
  symbol: 'jEUR',
  balance: 8.657,
  isLicensed: false,
  isAuthRequired: false,
  isActive: false,
}, {
  symbol: 'JNT',
  balance: 9.999,
  isLicensed: true,
  isAuthRequired: true,
  isActive: true,
}]

function getStateAccounts(state) {
  return state.accounts
}

function* getAccounts() {
  yield delay(500)

  const items = accountsStub

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

export function* toggleAccount(action) {
  if (!action) {
    return
  }

  const accounts = yield select(getStateAccounts)
  const { items, isActiveAll } = accounts
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
