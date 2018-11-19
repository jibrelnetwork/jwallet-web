// @flow

import { takeEvery } from 'redux-saga/effects'

import * as transactions from '../modules/transactions'

function* openView(): Saga<void> {
  //
}

function* closeView(): Saga<void> {
  //
}

export function* transactionsRootSaga(): Saga<void> {
  yield takeEvery(transactions.OPEN_VIEW, openView)
  yield takeEvery(transactions.CLOSE_VIEW, closeView)
}
