import { delay } from 'redux-saga'
import { put, select, takeEvery } from 'redux-saga/effects'

import { START_TIMER, SET_SECONDS } from '../modules/modals/alphaWarning'
import { selectAlphaWarningModalData } from './stateSelectors'

const ONE_SECOND = 1000 // in ms

function* onStartTimer(): Saga<void> {
  yield onTick()
}

function* onTick() {
  const { seconds } = yield select(selectAlphaWarningModalData)

  if (!seconds) {
    return
  }

  yield delay(ONE_SECOND)
  yield put({ type: SET_SECONDS, seconds: (seconds - 1) })
  yield onTick()
}

export function* watchStartTimer(): Saga<void> {
  yield takeEvery(START_TIMER, onStartTimer)
}
