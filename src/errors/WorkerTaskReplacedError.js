// @flow

import JError from './JError'

class WorkerTaskReplacedError extends JError<{||}> {
  constructor() {
    super()
    this.name = 'WorkerTaskReplacedError'
  }
}

export default WorkerTaskReplacedError
