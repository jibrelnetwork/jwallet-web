// @flow

import { takeEvery, put } from 'redux-saga/effects'

import {
  OPEN_VIEW,
  clean,
} from '../modules/digitalAssetsSendConfirm'

function* openView(): Saga<void> {
  yield put(clean())
}

export function* digitalAssetsSendConfirmRootSaga(): Saga<void> {
  yield takeEvery(OPEN_VIEW, openView)
}
