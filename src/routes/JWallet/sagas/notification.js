import { put, takeEvery } from 'redux-saga/effects'

import storage from 'services/storage'

import {
  NOTIFICATION_CHECK,
  NOTIFICATION_OPEN,
  NOTIFICATION_CLOSE,
} from '../modules/notification'

function* onCheckNotification() {
  try {
    const isClosed = (storage.getNotificationSaleClosed() === '1')

    if (!isClosed) {
      yield put({ type: NOTIFICATION_OPEN })
    }
  } catch (err) {
    console.error(err)
  }
}

function* onCloseNotification() {
  try {
    storage.setNotificationSaleClosed('1')
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
