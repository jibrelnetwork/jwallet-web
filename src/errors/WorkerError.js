// @flow

class WorkerError extends Error {
  constructor(originError, workerType) {
    super(originError)

    this.name = 'WorkerError'
    this.workerType = workerType

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, WorkerError)
    } else {
      this.stack = originError.stack
    }
  }
}

export default WorkerError
