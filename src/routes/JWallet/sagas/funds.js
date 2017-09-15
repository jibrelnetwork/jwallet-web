import { put, select, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import config from 'config'

import {
  SEND_FUNDS,
  SET_SEND_FUNDS_PINCODE,
  SET_SEND_FUNDS_IS_PINCODE_INCORRECT,
} from '../modules/funds'

function getSendFundsFormData(state) {
  return state.funds.sendFormData
}

function* sendFunds() {
  const data = yield select(getSendFundsFormData)

  yield checkPincode(data.pincode)
}

function* checkPincode() {
  // some checking of pincode

  yield setIncorrectPincodeFlag()
}

function* setIncorrectPincodeFlag() {
  yield put({ type: SET_SEND_FUNDS_IS_PINCODE_INCORRECT, isPincodeIncorrect: true })

  yield delay(config.resetIncorrectPincodeTimeout)

  yield put({ type: SET_SEND_FUNDS_IS_PINCODE_INCORRECT, isPincodeIncorrect: false })
  yield put({ type: SET_SEND_FUNDS_PINCODE, pincode: '' })
}

export function* watchSendFunds() { // eslint-disable-line import/prefer-default-export
  yield takeEvery(SEND_FUNDS, sendFunds)
}
