// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWalletsItems } from 'store/selectors/wallets'
import * as walletsStart from 'store/modules/walletsStart'

function* openView(): Saga<void> {
  const items: Wallets = yield select(selectWalletsItems)

  if (items.length) {
    yield put(push('/wallets'))
  }
}

export function* walletsStartRootSaga(): Saga<void> {
  yield takeEvery(walletsStart.OPEN_VIEW, openView)
}
