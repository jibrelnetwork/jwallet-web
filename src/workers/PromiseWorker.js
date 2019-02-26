// @flow

import uuidv4 from 'uuid/v4'
import Promise from 'bluebird'

import {
  WorkerError,
  WorkerTaskError,
  WorkerTaskReplacedError,
  WorkerQueueExceededError,
} from 'errors'

type PromiseWorkerQueue = { [string]: ?Promise }

type PromiseWorkerTaskResult = {|
  +payload: Object,
  +taskId: string,
  +error: boolean,
|}

type PromiseWorkerTaskPayload = {|
  +payload: Object,
  +taskName: string,
  +errorMessage?: string,
  +transfer?: ArrayBuffer,
|}

const TASK_TIMEOUT = 30 * 1000
const MAX_QUEUE_LENGTH = 1000
const WORKER_TYPE = 'promise'

class PromiseWorker {
  queue: PromiseWorkerQueue
  worker: ?Object

  constructor(Worker: Function) {
    this.queue = {}
    this.startListen(Worker)
  }

  handleError = (err: Error) => {
    throw new WorkerError(err, WORKER_TYPE)
  }

  handleTask = ({
    error,
    taskId,
    payload,
  }: PromiseWorkerTaskResult) => {
    const task: ?Promise = this.queue[taskId]

    if (!task) {
      return
    }

    if (error) {
      task.reject(new WorkerTaskError(payload))
    } else {
      task.resolve(payload)
    }

    this.removeTask(taskId)
  }

  startListen = (Worker: Function) => {
    this.worker = new Worker()
    this.worker.onerror = err => this.handleError(err)
    this.worker.onmessage = msg => this.handleTask(msg.data)
  }

  addTask = (taskId: string, task: Promise) => {
    const queueLength = Object.keys(this.queue).length
    const existedTask = this.queue[taskId]

    if (queueLength > MAX_QUEUE_LENGTH) {
      task.reject(new WorkerQueueExceededError())
    } else if (existedTask) {
      existedTask.reject(new WorkerTaskReplacedError())
    }

    this.queue[taskId] = task
    setTimeout(() => this.removeTask(taskId), TASK_TIMEOUT)
  }

  removeTask = (taskId: string) => {
    this.queue = Object
      .keys(this.queue)
      .reduce((reduceResult: PromiseWorkerQueue, currentTaskId: string) => {
        if (taskId === currentTaskId) {
          return reduceResult
        }

        /**
         * @FIXME
         */
        /* eslint-disable fp/no-mutation, no-param-reassign */
        reduceResult[currentTaskId] = this.queue[currentTaskId]
        /* eslint-enable fp/no-mutation, no-param-reassign */

        return reduceResult
      }, {})
  }

  executeTask = ({
    payload,
    taskName,
    transfer,
    errorMessage,
  }: PromiseWorkerTaskPayload) => {
    const taskId: string = uuidv4()

    const msgData = {
      taskId,
      payload,
      taskName,
    }

    if (!this.worker) {
      throw new WorkerError('Worker was terminated', WORKER_TYPE)
    } else if (transfer) {
      this.worker.postMessage(msgData, transfer)
    } else {
      this.worker.postMessage(msgData)
    }

    const timeoutErrorMessage = errorMessage || `Worker did not respond within ${TASK_TIMEOUT}ms`
    const task: Promise = new Promise().timeout(TASK_TIMEOUT, timeoutErrorMessage)
    this.addTask(taskId, task)

    return task
  }

  terminate = () => {
    this.queue = {}

    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }

  restart = (Worker: Function) => {
    this.terminate()
    this.startListen(Worker)
  }
}

export default PromiseWorker
