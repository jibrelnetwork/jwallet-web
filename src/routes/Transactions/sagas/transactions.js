// @flow

import { delay } from 'redux-saga'
import { concat, compose, filter, uniq } from 'ramda'
import { call, cancel, fork, put, select, take, takeEvery } from 'redux-saga/effects'

import config from 'config'
import { getAssetDecimals, isETH } from 'utils'
import { etherscan, keystore, validate, web3 } from 'services'
import { setBalanceByAddress } from 'routes/DigitalAssets/modules/digitalAssets'
import { selectDigitalAssets, selectTransactionsItems, selectWalletId } from 'store/stateSelectors'

import {
  OPEN,
  CLOSE,
  GET,
  GET_CANCEL,
  SEARCH,
  setLoading,
  getCancel,
  getSuccess,
  setBlockExporerError,
  searchSuccess,
  searchError,
  clean,
} from '../modules/transactions'

const SEARCH_FIELDS: Array<string> = ['status', 'address', 'transactionHash', 'amount']

function* openTransactions(): Saga<void> {
  const getTransactionsTask = yield fork(getTransactions)
  yield take(GET_CANCEL)
  yield cancel(getTransactionsTask)
}

function* closeTransactions(): Saga<void> {
  yield put(getCancel())
  yield delay(config.delayBeforeFormClean)
  yield put(clean())
}

function* getTransactions(): Saga<void> {
  try {
    while (true) {
      yield put(setLoading(true))

      const walletId: ?WalletId = yield select(selectWalletId)

      if (!walletId) {
        yield delay(config.walletIdInitTimeout)
        continue
      }

      const { items, currentAddress } = yield select(selectDigitalAssets)
      const owner: Address = keystore.getAddress(walletId)
      const decimals: Decimals = getAssetDecimals(currentAddress, items)

      const txs: Transactions = yield getTransactionsByOwner(owner, 'Ethereum', decimals)
      const balance: number = yield getBalanceByOwner(owner, 'Ethereum', decimals)

      yield put(getSuccess(txs))
      yield put(setBalanceByAddress(currentAddress, balance))

      yield put(setLoading(false))
      yield delay(config.getTransactionsIntervalTimeout)
    }
  } catch (err) {
    // console.error(err)
    yield put(setLoading(false))
  }
}

function* getTransactionsByOwner(owner: Address, contractAddress: Address, decimals: number) {
  return isETH(contractAddress)
    ? yield getETHTransactions(owner)
    : yield getContractsTransactions(owner, contractAddress, decimals)
}

function* getETHTransactions(owner: Address) {
  try {
    return yield call(etherscan.getETHTransactions, owner)
  } catch (err) {
    yield put(setBlockExporerError(true))

    throw err
  }
}

function* getContractsTransactions(owner: Address, contractAddress: Address, decimals: number) {
  return yield call(web3.getContractTransactions, contractAddress, owner, decimals)
}

function* getBalanceByOwner(owner: Address, contractAddress: Address, decimals: number) {
  return isETH(contractAddress)
    ? yield call(web3.getETHBalance, owner)
    : yield call(web3.getAssetBalance, contractAddress, owner, decimals)
}

function* searchTransactions(action: { payload: { searchQuery: string } }): Saga<void> {
  const { searchQuery }: { searchQuery: string } = action.payload

  try {
    validate.searchQuery(searchQuery)
  } catch (err) {
    yield put(searchError(err))

    return
  }

  const items: Transactions = yield select(selectTransactionsItems)
  const foundTransactions: Hashes = searchTransactionsByFields(items, searchQuery)

  yield put(searchSuccess(foundTransactions))
}

function searchTransactionsByFields(items: Transactions, searchQuery: string): Hashes {
  const itemsByFields: Transactions = SEARCH_FIELDS
    .map((field: string): Transactions => {
      return searchTransactionsByField(items, field, searchQuery)
    })
    .reduce((result: Transactions, transactionsByField: Transactions): Transactions => {
      return concat(result, transactionsByField)
    }, [])

  return compose(
    uniq,
    getHashes,
  )(itemsByFields)
}

function getHashes(transactions: Transactions): Hashes {
  return transactions.map(({ transactionHash }: Transaction): Hash => transactionHash)
}

function searchTransactionsByField(
  items: Transactions,
  field: string,
  query: string,
): Transactions {
  return filter((item: Transaction): boolean => isTransactionFound(item, field, query))(items)
}

function isTransactionFound(
  transaction: Transaction,
  fieldName: string,
  compareValue: string,
): boolean {
  const fieldValue: string = transaction[fieldName].toLowerCase()
  const foundIndex: number = fieldValue.indexOf(compareValue.toLowerCase())

  return (foundIndex > -1)
}

export function* watchTransactionsOpen(): Saga<void> {
  yield takeEvery(OPEN, openTransactions)
}

export function* watchTransactionsClose(): Saga<void> {
  yield takeEvery(CLOSE, closeTransactions)
}

export function* watchTransactionsGet(): Saga<void> {
  yield takeEvery(GET, getTransactions)
}

export function* watchTransactionsSearch(): Saga<void> {
  yield takeEvery(SEARCH, searchTransactions)
}
