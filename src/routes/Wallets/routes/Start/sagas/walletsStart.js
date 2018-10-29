// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWalletsPersist } from 'store/stateSelectors'

import * as walletsStart from '../modules/walletsStart'

function* openView(): Saga<void> {
  const { items }: WalletsPersist = yield select(selectWalletsPersist)

  if (items.length) {
    yield put(push('/wallets'))
  }
}

export function* walletsStartRootSaga(): Saga<void> {
  yield takeEvery(walletsStart.OPEN_VIEW, openView)
}
