// @flow strict

// eslint-disable-next-line import/default
import ScryptWorker from './worker'
import PromiseWorker from '../PromiseWorker'

export const scryptWorkerInstance = new PromiseWorker(new ScryptWorker())
