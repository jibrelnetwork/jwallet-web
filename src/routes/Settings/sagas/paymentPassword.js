// @flow
import { put } from 'redux-saga/effects'
import { checkPassword } from 'utils/password'

export function* paymentPasswordCheck(action: Object): Saga<void> {
  const payload = checkPassword(action.payload)
  yield put({ type: '@settings/VALIDATION_PASSWORD_FORM', payload })
}
