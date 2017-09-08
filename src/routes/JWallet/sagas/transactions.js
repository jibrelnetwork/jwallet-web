import { put, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'

import {
  GET_TRANSACTIONS,
  SET_TRANSACTIONS,
} from '../modules/transactions'

const transactionsStub = [{
  type: 'receive',
  symbol: 'ETH',
  status: 'Pending',
  from: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x02360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 0.21234,
  timestamp: (new Date()).setDate(11),
}, {
  type: 'send',
  symbol: 'ETH',
  status: 'Accepted',
  from: '0x03360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x04360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 9.23456,
  timestamp: (new Date()).setDate(1),
}, {
  type: 'receive',
  symbol: 'ETH',
  status: 'Rejected',
  from: '0x05360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x06360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 6.78900009765,
  timestamp: (new Date()).setDate(21),
}, {
  type: 'send',
  symbol: 'ETH',
  status: 'Waiting',
  from: '0x07360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  to: '0x08360d2b7d240ec0643b6d819ba81a09e40e5bcd',
  txHash: '0x7d6302979fa103b64b9645972774a790b8973e50d9b4771ab3c55e292db0cc1d',
  fee: '0.0005 ETH 1.5 JNT',
  amount: 3.12313123213,
  timestamp: (new Date()).setDate(3),
}]

function* getTransactions() {
  yield delay(1000)

  const items = transactionsStub

  yield put({ type: SET_TRANSACTIONS, items })
}

/* eslint-disable import/prefer-default-export */
export function* watchGetTransactions() {
  yield takeEvery(GET_TRANSACTIONS, getTransactions)
}
