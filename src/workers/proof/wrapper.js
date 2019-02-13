// @flow

import PromiseWorker from 'promise-worker'

// eslint-disable-next-line import/default
import ProofWorker from './worker.js'

// $FlowFixMe
const promiseWorker = new PromiseWorker(new ProofWorker())

export function ping(message: string | Object) {
  return promiseWorker.postMessage(message)
}
