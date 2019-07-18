// @flow

import {
  put,
  select,
  takeEvery,
} from 'redux-saga/effects'

import validatePassword from 'utils/password/validate'
import * as user from 'store/modules/user'
import * as ticker from 'store/modules/ticker'
import * as settingsWorker from 'workers/settings/wrapper'

import * as settings from 'store/modules/settings'

export function* changePaymentPassword({ payload }: Object): Saga<void> {
  yield put(settings.changePaymentPasswordPending(true))

  const validationMessages = validatePassword(payload)

  yield put(settings.validationPasswordForm(validationMessages))

  if (!Object.keys(validationMessages).length) {
    const state = yield select()
    yield settingsWorker.changePassword(state, payload)
  }
}

export function* setFiatCurrency(): Saga<void> {
  yield put(ticker.syncRestart())
}

export function* settingsRootSaga(): Saga<void> {
  yield takeEvery(user.SET_FIAT_CURRENCY, setFiatCurrency)
  yield takeEvery(settings.CHANGE_PAYMENT_PASSWORD, changePaymentPassword)
}
