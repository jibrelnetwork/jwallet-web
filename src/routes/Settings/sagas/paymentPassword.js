// @flow
import { select, put } from 'redux-saga/effects'
import { validatePassword } from 'utils/password'
import * as settingsWorker from 'workers/settings/wrapper'

import { VALIDATION_PASSWORD_FORM } from '../modules/settings'

export function* paymentPasswordCheck({ payload }: Object): Saga<void> {
  const validationMessages = validatePassword(payload)

  yield put({ type: VALIDATION_PASSWORD_FORM, payload: validationMessages })
  if (Object.keys(validationMessages).length === 0) {
    const state = yield select()
    const isValid = yield settingsWorker.checkPassword(state, payload.passwordOld)
    if (isValid) {
      // TODO: make some naughy things
    }
  }
}
