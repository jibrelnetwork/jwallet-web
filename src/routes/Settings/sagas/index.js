// @flow
import { takeEvery } from 'redux-saga/effects'

import { paymentPasswordChange } from './paymentPassword'
import { CHANGE_PAYMENT_PASSWORD } from '../modules/settings'

function* settingsRootSaga(): Saga<void> {
  yield takeEvery(CHANGE_PAYMENT_PASSWORD, paymentPasswordChange)
}

export default {
  settingsRootSaga,
}
