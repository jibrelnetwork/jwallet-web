// @flow

import JError, { type JErrorData } from './JError'

type WorkerType = 'promise' | 'event-emitter'

type WorkerErrorData = {|
  +originError?: Error,
  +workerType: WorkerType,
|}

class WorkerError extends JError<WorkerErrorData> {
  constructor(data: JErrorData<WorkerErrorData>, message?: string) {
    super(data, message)
    this.name = 'WorkerError'
  }
}

export default WorkerError
