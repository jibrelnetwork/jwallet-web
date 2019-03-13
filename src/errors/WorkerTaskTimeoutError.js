// @flow

import JError from './JError'

class WorkerTaskTimeoutError extends JError<{||}> {
  constructor(message: string) {
    super(message)
    this.name = 'WorkerTaskTimeoutError'
  }
}

export default WorkerTaskTimeoutError
