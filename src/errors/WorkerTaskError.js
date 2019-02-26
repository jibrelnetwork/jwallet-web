// @flow

type WorkerTaskErrorPayload = {|
  +stack: Object,
  +message: string,
|}

class WorkerTaskError extends Error {
  constructor(error: WorkerTaskErrorPayload) {
    super(error)

    this.name = 'WorkerTaskError'

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, WorkerTaskError)
    } else {
      this.stack = (new Error()).stack
    }
  }
}

export default WorkerTaskError
