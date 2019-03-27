// @flow

import JError, { type JErrorData } from './JError'

type WorkerTaskErrorData = {|
  +originStack: string,
|}

class WorkerTaskError extends JError<WorkerTaskErrorData> {
  constructor(data: JErrorData<WorkerTaskErrorData>, message: string) {
    super(data, message)
    this.name = 'WorkerTaskError'
  }
}

export default WorkerTaskError
