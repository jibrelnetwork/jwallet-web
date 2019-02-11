// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWalletsPersist } from 'store/selectors/wallets'

import * as notFound from '../modules/notFound'

function* goToHome(): Saga<void> {
  const { items, activeWalletId }: WalletsPersist = yield select(selectWalletsPersist)

  if (!items.length) {
    yield put(push('/wallets/start'))
  } else if (!activeWalletId) {
    yield put(push('/wallets'))
  } else {
    yield put(push('/transactions'))
  }
}

export function* notFoundRootSaga(): Saga<void> {
  yield takeEvery(notFound.GO_TO_HOME, goToHome)
}
