import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { getFormattedDateString, searchItems, sortItems } from 'utils'

import {
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
  SEARCH_TRANSACTIONS,
  SORT_TRANSACTIONS,
  SET_SEARCH_TRANSACTIONS_OPTIONS,
  SET_SORT_TRANSACTIONS_OPTIONS,
} from '../modules/transactions'

const transactionsStub = [{
  type: 'receive',
  symbol: 'ETH',
  status: 'Pending',
  from: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x02360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x1d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 0.21234,
  timestamp: (new Date()).setDate(11),
}, {
  type: 'send',
  symbol: 'ETH',
  status: 'Accepted',
  from: '0x03360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x2d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 9.23456,
  timestamp: (new Date()).setDate(1),
}, {
  type: 'receive',
  symbol: 'ETH',
  status: 'Rejected',
  from: '0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x06360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x3d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 6.78900009765,
  timestamp: (new Date()).setDate(21),
}, {
  type: 'send',
  symbol: 'ETH',
  status: 'Waiting',
  from: '0x07360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x08360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x4d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 3.12313123213,
  timestamp: (new Date()).setDate(3),
}]

const transactionsSearchFields = ['symbol', 'status', 'address', 'txHash', 'fee', 'amount', 'date']

function getStateTransactions(state) {
  return state.transactions
}

function* getTransactions() {
  yield delay(1000)

  const items = transactionsStub.map((item) => {
    const { type, from, to, amount, timestamp } = item

    return {
      ...item,
      address: (type === 'send') ? to : from,
      amountFixed: amount.toFixed(3),
      date: getFormattedDateString(new Date(timestamp), 'hh:mm MM/DD/YYYY'),
    }
  })

  yield put({ type: SET_TRANSACTIONS, items })
}

function* searchTransactions(action) {
  const transactions = yield select(getStateTransactions)
  const searchQuery = action.searchQuery

  const foundItems = searchItems(transactions.items, searchQuery, transactionsSearchFields)
  const foundItemsHashes = foundItems.map(i => i.txHash)

  yield put({ type: SET_SEARCH_TRANSACTIONS_OPTIONS, foundItemsHashes, searchQuery })
}

function* sortTransactions(action) {
  const transactions = yield select(getStateTransactions)

  const oldSortField = transactions.sortField
  const sortField = action.sortField || oldSortField
  const { items, sortDirection } = transactions

  const result = sortItems(items, oldSortField, sortField, sortDirection)

  yield put({ type: SET_TRANSACTIONS, items: result.items })

  yield put({
    type: SET_SORT_TRANSACTIONS_OPTIONS,
    sortField: result.sortField,
    sortDirection: result.sortDirection,
  })
}

/* eslint-disable import/prefer-default-export */
export function* watchGetTransactions() {
  yield takeEvery(GET_TRANSACTIONS, getTransactions)
}

export function* watchSearchTransactions() {
  yield takeEvery(SEARCH_TRANSACTIONS, searchTransactions)
}

export function* watchSortTransactions() {
  yield takeEvery(SORT_TRANSACTIONS, sortTransactions)
}
