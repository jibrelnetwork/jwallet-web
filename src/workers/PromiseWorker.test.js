// @flow

import PromiseWorker from './PromiseWorker'

import {
  WorkerError,
  WorkerTaskError,
} from '../errors'

const MOCK_WORKER_MSG_TIMEOUT: number = 1000
const MOCK_WORKER_TYPE: 'promise' = 'promise'
const MOCK_WORKER_ERROR: string = 'MOCK_WORKER_ERROR'
const MOCK_WORKER_RESULT_OK: string = 'MOCK_WORKER_RESULT_OK'
const MOCK_WORKER_RESULT_FAIL: string = 'MOCK_WORKER_RESULT_FAIL'

class MOCK_WORKER {
  onerror: ?Function
  onmessage: ?Function

  constructor() {
    this.onerror = null
    this.onmessage = null
  }

  terminate = () => {}

  postMessage /* WORKER: self.onmessage */ = (msgData: Object /* WORKER: msg */) => {
    const self = this /* WORKER: instance context is accessible by "self" var */

    const {
      taskId,
      taskName,
      // payload,
    } = msgData /* WORKER: msg.data */

    switch (taskName) {
      case 'taskOk': {
        // process payload from msg

        setTimeout(() => {
          if (!self.onmessage) {
            return
          }

          self.onmessage({ /* WORKER: self.postMessage */
            data: {
              taskId,
              payload: MOCK_WORKER_RESULT_OK,
            },
          })
        }, MOCK_WORKER_MSG_TIMEOUT)

        break
      }

      case 'taskFail': {
        // process payload from msg

        setTimeout(() => {
          try {
            throw new Error(MOCK_WORKER_RESULT_FAIL)
          } catch (err) {
            if (!self.onmessage) {
              return
            }

            self.onmessage({ /* WORKER: self.postMessage */
              data: {
                taskId,
                error: true,
                payload: {
                  stack: err.stack,
                  message: err.message,
                },
              },
            })
          }
        }, MOCK_WORKER_MSG_TIMEOUT)

        break
      }

      case 'taskThrow': {
        // process payload from msg

        if (!self.onerror) {
          return
        }

        self.onerror(new Error(MOCK_WORKER_ERROR)) /* WORKER: throw new Error(MOCK_WORKER_ERROR) */

        break
      }

      case 'taskAfterTerminate': {
        // process payload from msg

        if (!self.onmessage) {
          return
        }

        self.onmessage({ /* WORKER: self.postMessage */
          data: {
            taskId,
            payload: MOCK_WORKER_RESULT_OK,
          },
        })

        break
      }

      default:
        break
    }
  }
}

const MOCK_WORKER_INSTANCE: Object = new MOCK_WORKER()

describe('PromiseWorker', () => {
  test('defined', () => {
    expect(PromiseWorker).toBeDefined()
  })

  test('constructor success', () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    expect(promiseWorker).toBeInstanceOf(PromiseWorker)
    expect(promiseWorker).toHaveProperty('executeTask')
    expect(promiseWorker).toHaveProperty('terminate')
    expect(promiseWorker).toHaveProperty('restart')

    promiseWorker.terminate()
  })

  test('constructor throw', () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    expect(promiseWorker).toBeInstanceOf(PromiseWorker)

    try {
      /* eslint-disable-next-line no-unused-vars */
      const anotherPromiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)
    } catch (err) {
      expect(err).toMatchObject(
        new WorkerError('Worker has been already listened', MOCK_WORKER_TYPE),
      )
    }

    promiseWorker.terminate()
  })

  test('executeTask success', async () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    await promiseWorker.executeTask({ taskName: 'taskOk' }).then((response) => {
      expect(response).toBeDefined()
      expect(response).toEqual(MOCK_WORKER_RESULT_OK)
    })

    promiseWorker.terminate()
  })

  test('executeTask failure', async () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    await promiseWorker.executeTask({ taskName: 'taskFail' }).catch((err) => {
      expect(err).toBeDefined()

      expect(err).toMatchObject(new WorkerTaskError({
        stack: err.stack,
        message: MOCK_WORKER_RESULT_FAIL,
      }))
    })

    promiseWorker.terminate()
  })

  test('executeTask throw', () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    try {
      promiseWorker.executeTask({ taskName: 'taskThrow' })
    } catch (err) {
      expect(err).toMatchObject(new WorkerError(new Error(MOCK_WORKER_ERROR), MOCK_WORKER_TYPE))
    }

    promiseWorker.terminate()
  })

  test('terminate', () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)
    promiseWorker.terminate()

    try {
      promiseWorker.executeTask({ taskName: 'taskOk' })
    } catch (err) {
      expect(err).toMatchObject(new WorkerError('Worker was terminated', MOCK_WORKER_TYPE))
    }
  })

  test('restart (running) success', async () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    const newMockWorkerInstance: Object = new MOCK_WORKER()
    promiseWorker.restart(newMockWorkerInstance)

    await promiseWorker.executeTask({ taskName: 'taskOk' }).then((response) => {
      expect(response).toBeDefined()
      expect(response).toEqual(MOCK_WORKER_RESULT_OK)
    })

    promiseWorker.terminate()
  })

  test('restart (terminated) success', async () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    promiseWorker.terminate()

    const newMockWorkerInstance: Object = new MOCK_WORKER()
    promiseWorker.restart(newMockWorkerInstance)

    await promiseWorker.executeTask({ taskName: 'taskOk' }).then((response) => {
      expect(response).toBeDefined()
      expect(response).toEqual(MOCK_WORKER_RESULT_OK)
    })

    promiseWorker.terminate()
  })

  test('restart throw', () => {
    const promiseWorker: Object = new PromiseWorker(MOCK_WORKER_INSTANCE)

    try {
      promiseWorker.restart(MOCK_WORKER_INSTANCE)
    } catch (err) {
      expect(err).toMatchObject(
        new WorkerError('Can not restart the same worker instance', MOCK_WORKER_TYPE),
      )
    }

    promiseWorker.terminate()
  })
})
