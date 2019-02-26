// @flow

class WorkerQueueExceededError extends Error {
  constructor() {
    super()

    this.name = 'WorkerQueueExceededError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, WorkerQueueExceededError)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default WorkerQueueExceededError
