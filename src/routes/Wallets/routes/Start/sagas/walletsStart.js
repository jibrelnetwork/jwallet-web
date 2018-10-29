// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWallets } from 'store/stateSelectors'

import * as walletsStart from '../modules/walletsStart'

function* openView(): Saga<void> {
  const { persist }: WalletsState = yield select(selectWallets)

  if (persist.items.length) {
    yield put(push('/wallets'))
  }
}

export function* walletsStartRootSaga(): Saga<void> {
  yield takeEvery(walletsStart.OPEN_VIEW, openView)
}
