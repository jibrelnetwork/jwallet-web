// @flow

import { push } from 'react-router-redux'
import { put, select, takeEvery } from 'redux-saga/effects'

import { selectWalletsItems } from 'store/stateSelectors'

import * as terms from '../modules/terms'

function* goToHome(): Saga<void> {
  const items: Wallets = yield select(selectWalletsItems)

  if (!items.length) {
    yield put(push('/wallets/start'))
  } else {
    yield put(push('/wallets'))
  }
}

export function* termsRootSaga(): Saga<void> {
  yield takeEvery(terms.GO_TO_HOME, goToHome)
}
