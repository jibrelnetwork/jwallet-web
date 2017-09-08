import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import { push } from 'react-router-redux'

import {
  GET_KEYS_FROM_CACHE,
  SET_KEYS_FROM_CACHE,
  CLEAR_KEYS,
} from '../modules/keys'

const keysStub = [
  { privateKey: '0x12E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 1.234, code: 'ETH' },
  { privateKey: '0x22E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 5.6789, code: 'jUSD' },
  { privateKey: '0x32E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 0.12321, code: 'jEUR' },
  { privateKey: '0x42E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 9.87654, code: 'jGBP' },
  { privateKey: '0x52E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 1.111111, code: 'jRUB' },
  { privateKey: '0x62E67f8FD2E67f8FD2E67f8FD2E67f8FD2E67f8F4E', balance: 0.000007, code: 'JNT' },
]

function* getKeysFromCache() {
  yield delay(1000)

  const items = keysStub

  if (items && items.length) {
    yield put(push('/jwallet'))
  } else {
    yield put(push('/auth'))
  }

  yield put({ type: SET_KEYS_FROM_CACHE, items })
}

function* clearKeys() {
  yield put(push('/auth'))
}

export function* watchGetKeysFromCache() {
  yield takeEvery(GET_KEYS_FROM_CACHE, getKeysFromCache)
}

export function* watchClearKeys() {
  yield takeEvery(CLEAR_KEYS, clearKeys)
}
