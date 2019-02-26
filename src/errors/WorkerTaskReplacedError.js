// @flow

class WorkerTaskReplacedError extends Error {
  constructor() {
    super()

    this.name = 'WorkerTaskReplacedError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, WorkerTaskReplacedError)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default WorkerTaskReplacedError
