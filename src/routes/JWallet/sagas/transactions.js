import { call, put, select, takeEvery } from 'redux-saga/effects'
import isEmpty from 'lodash/isEmpty'

import { etherscan, web3 } from 'services'
import { searchItems, sortItems } from 'utils'

import {
  TRANSACTIONS_GET,
  TRANSACTIONS_SET,
  TRANSACTIONS_SEARCH,
  TRANSACTIONS_SET_SEARCH_OPTIONS,
  TRANSACTIONS_SORT,
  TRANSACTIONS_SET_SORT_OPTIONS,
} from '../modules/transactions'

const transactionsSearchFields = ['status', 'address', 'transactionHash', 'fee', 'amount', 'date']

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
  const transactions = yield call(etherscan.getETHTransactions, address)

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
