// @flow

import {
  delay,
  type Channel,
} from 'redux-saga'

import {
  // select,
  put,
  call,
} from 'redux-saga/effects'

export function* getBalancesSchedulerProcess(
  requestQueueCh: Channel<SchedulerTask>
  // networkId: NetworkId
  // currentBlock: BlockInfo
): Saga<void> {
  try {
    while (true) {
      // 1. select network
      // 2. select current address
      // 3. we gave current block
      // 4. select enabled assets
      // 5. push initial balances state to redux
      // 6. push tasks to the scheduler

      yield call(delay, 1000)

      const task: SchedulerTask = {
        module: 'balances',
        method: {
          name: 'getETHBalance',
          payload: {
            blockNumber: 123,
            walletAddress: '123',
          },
        },
        retryCount: 3,
        priority: 0,
      }

      yield put(requestQueueCh, task)

      // console.log('scheduled')
    }
  } finally {
    // canceled...
  }
}

export function* requestBalance(task: SchedulerTask): Saga<void> {
  // console.log('requestBalance', task)
}
