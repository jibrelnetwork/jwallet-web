// @flow

class WorkerTaskTimeoutError extends Error {
  constructor(message: string) {
    super(message)

    this.name = 'WorkerTaskTimeoutError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, WorkerTaskTimeoutError)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default WorkerTaskTimeoutError
