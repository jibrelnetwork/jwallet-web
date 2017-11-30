import { put, takeEvery } from 'redux-saga/effects'

import {
  NOTIFICATION_CHECK,
  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
} from '../modules/notification'

function* onCheckNotification() {
  try {
    const isClosed = (sessionStorage.getItem('saleNotificationClosed') === '1')

    if (!isClosed) {
      yield put({ type: NOTIFICATION_OPEN })
    }
  } catch (err) {
    console.error(err)
  }
}

function onCloseNotification() {
  try {
    sessionStorage.setItem('saleNotificationClosed', '1')
  } catch (err) {
    console.error(err)
  }
}

export function* watchCheckNotification() {
  yield takeEvery(NOTIFICATION_CHECK, onCheckNotification)
}

export function* watchCloseNotification() {
  yield takeEvery(NOTIFICATION_CLOSE, onCloseNotification)
}
