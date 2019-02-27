// @flow

import uuidv4 from 'uuid/v4'
import Promise from 'bluebird'

import {
  WorkerError,
  WorkerTaskError,
  WorkerTaskTimeoutError,
  WorkerTaskReplacedError,
  WorkerQueueExceededError,
} from 'errors'

type PromiseWorkerTask = {|
  +reject: Function,
  +resolve: Function,
  +errorMessage: ?string,
|}

type PromiseWorkerQueue = { [string]: ?PromiseWorkerTask }

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

  constructor(worker: Object) {
    this.queue = {}
    this.startListen(worker)
  }

  handleError = (err: Error) => {
    throw new WorkerError(err, WORKER_TYPE)
  }

  handleTask = ({
    error,
    taskId,
    payload,
  }: PromiseWorkerTaskResult) => {
    const task: ?PromiseWorkerTask = this.queue[taskId]

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

  startListen = (worker: Object) => {
    this.worker = worker
    this.worker.onerror = err => this.handleError(err)
    this.worker.onmessage = msg => this.handleTask(msg.data)
  }

  endListen = () => {
    if (this.worker) {
      this.worker.onerror = null
      this.worker.onmessage = null
    }
  }

  addTask = (taskId: string, task: PromiseWorkerTask) => {
    const queueLength = Object.keys(this.queue).length
    const existedTask = this.queue[taskId]

    if (queueLength > MAX_QUEUE_LENGTH) {
      task.reject(new WorkerQueueExceededError())
    } else if (existedTask) {
      existedTask.reject(new WorkerTaskReplacedError())
    }

    this.queue[taskId] = task

    setTimeout(() => {
      this.removeTask(taskId)
      const timeoutErrorMsg = task.errorMessage || `Worker did not respond within ${TASK_TIMEOUT}ms`
      task.reject(new WorkerTaskTimeoutError(timeoutErrorMsg))
    }, TASK_TIMEOUT)
  }

  removeTask = (taskId: string) => {
    const taskIds: string[] = Object.keys(this.queue)

    this.queue = taskIds.reduce((reduceResult: PromiseWorkerQueue, currentTaskId: string) => {
      if (taskId === currentTaskId) {
        return reduceResult
      }

      reduceResult[currentTaskId] = this.queue[currentTaskId]

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

    return new Promise((resolve, reject) => this.addTask(taskId, {
      reject,
      resolve,
      errorMessage,
    }))
  }

  terminate = () => {
    this.queue = {}
    this.endListen()

    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }

  restart = (worker: Object) => {
    if (this.worker === worker) {
      throw new WorkerError('Can not restart the same worker instance', WORKER_TYPE)
    }

    this.terminate()
    this.startListen(worker)
  }
}

export default PromiseWorker
