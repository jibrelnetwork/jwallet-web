import { call, put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import isEmpty from 'lodash/isEmpty'

import config from 'config'
import { etherscan, web3 } from 'services'
import { searchItems, sortItems } from 'utils'

import {
  selectCurrentDigitalAsset,
  selectCurrentKeystoreAddress,
  selectTransactions,
} from './stateSelectors'

import {
  TRANSACTIONS_GET,
  TRANSACTIONS_SET,
  TRANSACTIONS_SEARCH,
  TRANSACTIONS_SET_SEARCH_OPTIONS,
  TRANSACTIONS_SORT,
  TRANSACTIONS_SET_SORT_OPTIONS,
  TRANSACTIONS_SET_BLOCK_EXPLORER_ERROR,
} from '../modules/transactions'

const transactionsSearchFields = ['status', 'address', 'transactionHash', 'fee', 'amount', 'date']
let isGetTransactionsLoopLaunched = 0

function* onGetTransactions() {
  yield getTransactions()

  // ignore if getTransactionsLoop was already launched
  if (isGetTransactionsLoopLaunched) {
    return
  }

  // otherwise set flag to prevent another loops when getTransactions is called
  isGetTransactionsLoopLaunched += 1

  yield getTransactionsLoop()
}

function* onSearchTransactions(action) {
  const { searchQuery } = action
  const transactions = yield select(selectTransactions)

  const foundItems = searchItems(transactions.items, searchQuery, transactionsSearchFields)
  const foundItemsHashes = foundItems.map(i => i.txHash)

  yield setSearchOptions(foundItemsHashes, searchQuery)
}

function* onSortTransactions(action) {
  const transactions = yield select(selectTransactions)

  const oldSortField = transactions.sortField
  const sortField = action.sortField || oldSortField
  const { items, sortDirection } = transactions

  const result = sortItems(items, oldSortField, sortField, sortDirection)

  yield setTransactions(result.items)
  yield setSortOptions(result.sortField, result.sortDirection)
}

function* getTransactionsLoop() {
  yield getTransactions()

  // check that getTransactionsLoop was not called more than one time
  if (isGetTransactionsLoopLaunched > 1) {
    return
  }

  yield delay(config.getTransactionsIntervalTimeout)
  yield getTransactionsLoop()
}

function* getTransactions() {
  const currentDigitalAsset = yield select(selectCurrentDigitalAsset)
  const currentAddress = yield select(selectCurrentKeystoreAddress)

  if (isEmpty(currentAddress) || isEmpty(currentDigitalAsset) || !currentDigitalAsset.isActive) {
    yield setTransactions()

    return
  }

  const { address, symbol, decimals } = currentDigitalAsset

  const transactions = (symbol === 'ETH')
    ? yield getETHTransactions(currentAddress)
    : yield getContractsTransactions(address, currentAddress, decimals)

  yield setTransactions(transactions)
}

function* getETHTransactions(address) {
  try {
    return yield call(etherscan.getETHTransactions, address)
  } catch (err) {
    yield put({ type: TRANSACTIONS_SET_BLOCK_EXPLORER_ERROR })

    return []
  }
}

function* getContractsTransactions(contractAddress, owner, decimals) {
  return yield call(web3.getContractTransactions, contractAddress, owner, decimals)
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

export function* watchGetTransactions() {
  yield takeEvery(TRANSACTIONS_GET, onGetTransactions)
}

export function* watchSearchTransactions() {
  yield takeEvery(TRANSACTIONS_SEARCH, onSearchTransactions)
}

export function* watchSortTransactions() {
  yield takeEvery(TRANSACTIONS_SORT, onSortTransactions)
}
