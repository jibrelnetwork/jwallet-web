// @flow

import JError from './JError'

class WorkerQueueExceededError extends JError<{||}> {
  constructor() {
    super()
    this.name = 'WorkerQueueExceededError'
  }
}

export default WorkerQueueExceededError
