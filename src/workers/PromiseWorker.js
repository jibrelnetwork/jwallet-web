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

/**
 * Private methods for PromiseWorker
 */

function removeTask(self: Object, taskId: string) {
  const taskIds: string[] = Object.keys(self.queue)

  self.queue = taskIds.reduce((reduceResult: PromiseWorkerQueue, currentTaskId: string) => {
    if (taskId === currentTaskId) {
      return reduceResult
    }

    reduceResult[currentTaskId] = self.queue[currentTaskId]

    return reduceResult
  }, {})
}

function addTask(self: Object, taskId: string, task: PromiseWorkerTask) {
  const queueLength = Object.keys(self.queue).length
  const existedTask = self.queue[taskId]

  if (queueLength > MAX_QUEUE_LENGTH) {
    task.reject(new WorkerQueueExceededError())
  } else if (existedTask) {
    existedTask.reject(new WorkerTaskReplacedError())
  }

  self.queue[taskId] = task

  setTimeout(() => {
    removeTask(self, taskId)
    const timeoutErrorMsg = task.errorMessage || `Worker did not respond within ${TASK_TIMEOUT}ms`
    task.reject(new WorkerTaskTimeoutError(timeoutErrorMsg))
  }, TASK_TIMEOUT)
}

function handleError(err: Error) {
  throw new WorkerError(err, WORKER_TYPE)
}

function handleTask(self, {
  error,
  taskId,
  payload,
}: PromiseWorkerTaskResult) {
  const task: ?PromiseWorkerTask = self.queue[taskId]

  if (!task) {
    return
  }

  if (error) {
    task.reject(new WorkerTaskError(payload))
  } else {
    task.resolve(payload)
  }

  removeTask(self, taskId)
}

function startListen(self: Object, worker: Object) {
  if (self.worker) {
    throw new WorkerError('Worker has been already started', WORKER_TYPE)
  }

  self.worker = worker
  self.worker.onerror = err => handleError(err)
  self.worker.onmessage = msg => handleTask(self, msg.data)
}

function endListen(self: Object) {
  if (!self.worker) {
    return
  }

  self.worker.onerror = null
  self.worker.onmessage = null
}

class PromiseWorker {
  worker: ?Object
  queue: PromiseWorkerQueue

  constructor(worker: Object) {
    this.queue = {}
    startListen(this, worker)
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

    return new Promise((resolve, reject) => addTask(this, taskId, {
      reject,
      resolve,
      errorMessage,
    }))
  }

  terminate = () => {
    this.queue = {}
    endListen(this)

    if (this.worker) {
      this.worker.terminate()
      this.worker = null
    }
  }

  restart = (newWorker: Object) => {
    if (this.worker === newWorker) {
      throw new WorkerError('Can not restart the same worker instance', WORKER_TYPE)
    }

    this.terminate()
    startListen(this, newWorker)
  }
}

export default PromiseWorker
