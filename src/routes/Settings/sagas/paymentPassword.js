// @flow
import { select, put } from 'redux-saga/effects'
import { validatePassword } from 'utils/password'
import * as settingsWorker from 'workers/settings/wrapper'

import {
  CHANGE_PAYMENT_PASSWORD_PENDING,
  VALIDATION_PASSWORD_FORM,
} from '../modules/settings'

export function* paymentPasswordChange({ payload }: Object): Saga<void> {
  yield put({ type: CHANGE_PAYMENT_PASSWORD_PENDING, payload: true })
  const validationMessages = validatePassword(payload)

  yield put({ type: VALIDATION_PASSWORD_FORM, payload: validationMessages })
  if (Object.keys(validationMessages).length === 0) {
    const state = yield select()
    yield settingsWorker.changePassword(state, payload)
  }
}
