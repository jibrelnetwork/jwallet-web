// @flow strict

import {
  put,
  takeEvery,
} from 'redux-saga/effects'

import * as user from 'store/modules/user'
import * as ticker from 'store/modules/ticker'

export function* setFiatCurrency(): Saga<void> {
  yield put(ticker.syncRestart())
}

export function* userRootSaga(): Saga<void> {
  yield takeEvery(user.SET_FIAT_CURRENCY, setFiatCurrency)
}
