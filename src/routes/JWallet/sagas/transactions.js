import { call, put, select, takeEvery } from 'redux-saga/effects'
import isEmpty from 'lodash/isEmpty'

import web3 from 'services/web3'
import { searchItems, sortItems } from 'utils'

import {
  TRANSACTIONS_GET,
  TRANSACTIONS_SET,
  TRANSACTIONS_SEARCH,
  TRANSACTIONS_SET_SEARCH_OPTIONS,
  TRANSACTIONS_SORT,
  TRANSACTIONS_SET_SORT_OPTIONS,
} from '../modules/transactions'

const transactionsStub = [{
  type: 'receive',
  symbol: 'ETH',
  status: 'Pending',
  from: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x02360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x1d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH',
  amount: 0.21234,
  timestamp: (new Date()).setDate(11),
}, {
  type: 'send',
  symbol: 'jUSD',
  status: 'Accepted',
  from: '0x03360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x2d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 jUSD',
  amount: 9.23456,
  timestamp: (new Date()).setDate(1),
}, {
  type: 'receive',
  symbol: 'jEUR',
  status: 'Rejected',
  from: '0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x06360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x3d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 jEUR',
  amount: 6.78900009765,
  timestamp: (new Date()).setDate(21),
}, {
  type: 'send',
  symbol: 'ETH',
  status: 'Waiting',
  from: '0x07360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x08360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x4d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH',
  amount: 3.12313123213,
  timestamp: (new Date()).setDate(3),
}, {
  type: 'send',
  symbol: 'JNT',
  status: 'Waiting',
  from: '0x07360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x09360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x4d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 3.12313123213,
  timestamp: (new Date()).setDate(4),
}]

const transactionsSearchFields = ['symbol', 'status', 'address', 'txHash', 'fee', 'amount', 'date']

function getStateTransactions(state) {
  return state.transactions
}

function getStateCurrentCurrency(state) {
  const { items, currentActiveIndex } = state.currencies

  return items[currentActiveIndex]
}

function getStateCurrentAddress(state) {
  const { currentAccount, addressesFromMnemonic } = state.keystore
  const { type, address, addressIndex } = currentAccount

  return (type === 'mnemonic') ? addressesFromMnemonic.items[addressIndex] : address
}

function* getTransactions() {
  const currentCurrency = yield select(getStateCurrentCurrency)
  const currentAddress = yield select(getStateCurrentAddress)

  if (isEmpty(currentCurrency) || !currentCurrency.isActive) {
    return yield setTransactions()
  }

  const { symbol, address, decimals } = currentCurrency

  if (symbol === 'ETH') {
    return yield getETHTransactions(currentAddress)
  }

  return yield getContractsTransactions(address, currentAddress, decimals)
}

function* getETHTransactions(address) {
  const transactions = yield call(web3.getETHTransactions, address)

  yield setTransactions(transactions)
}

function* getContractsTransactions(contractAddress, owner, decimals) {
  const transactions = yield call(web3.getContractTransactions, contractAddress, owner, decimals)

  yield setTransactions(transactions)
}

function* setTransactions(items = []) {
  yield put({ type: TRANSACTIONS_SET, items })
}

function* setSearchOptions(foundItemsHashes, searchQuery) {
  yield put({ type: TRANSACTIONS_SET_SEARCH_OPTIONS, foundItemsHashes, searchQuery })
}

function* setSortOptions(sortField, sortDirection) {
  yield put({ type: TRANSACTIONS_SET_SORT_OPTIONS, sortField, sortDirection })
}

function* searchTransactions(action) {
  const { searchQuery } = action
  const transactions = yield select(getStateTransactions)

  const foundItems = searchItems(transactions.items, searchQuery, transactionsSearchFields)
  const foundItemsHashes = foundItems.map(i => i.txHash)

  yield setSearchOptions(foundItemsHashes, searchQuery)
}

function* sortTransactions(action) {
  const transactions = yield select(getStateTransactions)

  const oldSortField = transactions.sortField
  const sortField = action.sortField || oldSortField
  const { items, sortDirection } = transactions

  const result = sortItems(items, oldSortField, sortField, sortDirection)

  yield setTransactions(result.items)
  yield setSortOptions(result.sortField, result.sortDirection)
}

export function* watchGetTransactions() {
  yield takeEvery(TRANSACTIONS_GET, getTransactions)
}

export function* watchSearchTransactions() {
  yield takeEvery(TRANSACTIONS_SEARCH, searchTransactions)
}

export function* watchSortTransactions() {
  yield takeEvery(TRANSACTIONS_SORT, sortTransactions)
}
