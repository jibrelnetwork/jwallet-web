// @flow strict

import { delay } from 'redux-saga'

import {
  put,
  call,
  takeEvery,
} from 'redux-saga/effects'

import * as toasts from 'store/modules/toasts'

const ONE_SECOND: number = 1000
const TOAST_DELAY: number = 3 * ONE_SECOND

export function* onShowToast(action: ExtractReturn<typeof toasts.showToast>): Saga<void> {
  const { type } = action.payload

  if (type !== 'base') {
    return
  }

  yield call(delay, TOAST_DELAY)
  yield put(toasts.hideToast())
}

export function* toastsRootSaga(): Saga<void> {
  yield takeEvery(toasts.SHOW, onShowToast)
}
