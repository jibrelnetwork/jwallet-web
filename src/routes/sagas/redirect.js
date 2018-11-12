// @flow

import { put, takeEvery } from 'redux-saga/effects'
import { goBack, push } from 'react-router-redux'

import {
  BACK_OR_FALLBACK,
  backOrFallback,
} from '../modules/redirect'

function* backOrFallbackSaga({
  payload: { fallbackUrl },
}: ExtractReturn<typeof backOrFallback>): Saga<void> {
  if (window && window.history && window.history.length > 2) {
    yield put(goBack())
  } else {
    yield put(push(fallbackUrl))
  }
}

export function* redirectRootSaga(): Saga<void> {
  yield takeEvery(BACK_OR_FALLBACK, backOrFallbackSaga)
}
