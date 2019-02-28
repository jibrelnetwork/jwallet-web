// @flow

type WorkerErrorData = string | Error
type WorkerType = 'promise' | 'event-emitter'

class WorkerError extends Error {
  workerType: WorkerType

  constructor(originError: WorkerErrorData, workerType: WorkerType) {
    super(originError)

    this.name = 'WorkerError'
    this.workerType = workerType

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, WorkerError)
    } else {
      this.stack = (typeof originError === 'string')
        ? (new Error(originError)).stack
        : originError.stack
    }
  }
}

export default WorkerError
