// @flow

import EventEmitter from 'events'

import WorkerError from '../errors/WorkerError'
import EventEmitterWorker from './EventEmitterWorker'

const MOCK_WORKER_EVENT_TIMEOUT: number = 1000
const MOCK_WORKER_TYPE: 'event-emitter' = 'event-emitter'
const MOCK_WORKER_THROW: string = 'MOCK_WORKER_THROW'
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

    if (msgData.payload === MOCK_WORKER_RESULT_OK) {
      setInterval(() => {
        if (!self.onmessage) {
          return
        }

        self.onmessage({ /* WORKER: self.postMessage */
          data: {
            payload: MOCK_WORKER_RESULT_OK,
          },
        })
      }, MOCK_WORKER_EVENT_TIMEOUT)
    }

    if (msgData.payload === MOCK_WORKER_RESULT_FAIL) {
      setInterval(() => {
        try {
          throw new Error(MOCK_WORKER_ERROR)
        } catch (err) {
          if (!self.onerror) {
            return
          }

          self.onerror({ /* WORKER: self.postMessage */
            data: {
              error: true,
              payload: {
                stack: err.stack,
                message: err.message,
              },
            },
          })
        }
      }, MOCK_WORKER_EVENT_TIMEOUT)
    }

    if (msgData.payload === MOCK_WORKER_THROW) {
      throw new Error(MOCK_WORKER_ERROR)
    }
  }
}

const MOCK_WORKER_INSTANCE: Object = new MOCK_WORKER()

describe('EventEmitterWorker', () => {
  test('defined', () => {
    expect(EventEmitterWorker).toBeDefined()
  })

  test('constructor', () => {
    const eeWorker: Object = new EventEmitterWorker()

    expect(eeWorker).toBeInstanceOf(EventEmitterWorker)
    expect(eeWorker).toHaveProperty('subscribe')
    expect(eeWorker).toHaveProperty('unsubscribe')
  })

  test('subscribe success', () => {
    const eeWorker: Object = new EventEmitterWorker()

    const ee: EventEmitter = eeWorker.subscribe(MOCK_WORKER_INSTANCE, {
      payload: MOCK_WORKER_RESULT_OK,
    })

    ee.on('data', (data) => {
      expect(data).toEqual(MOCK_WORKER_RESULT_OK)
    })

    eeWorker.unsubscribe()
  })

  test('executeTask failure', () => {
    const eeWorker: Object = new EventEmitterWorker()

    const ee: EventEmitter = eeWorker.subscribe(MOCK_WORKER_INSTANCE, {
      payload: MOCK_WORKER_RESULT_OK,
    })

    ee.on('error', (err) => {
      expect(err).toMatchObject({
        stack: err.stack,
        message: MOCK_WORKER_ERROR,
      })
    })

    eeWorker.unsubscribe()
  })

  test('subscribe (already listened) throw', () => {
    const eeWorker: Object = new EventEmitterWorker()

    eeWorker.subscribe(MOCK_WORKER_INSTANCE, {
      payload: MOCK_WORKER_RESULT_OK,
    })

    try {
      eeWorker.subscribe(MOCK_WORKER_INSTANCE, {
        payload: MOCK_WORKER_RESULT_OK,
      })
    } catch (err) {
      expect(err).toMatchObject(
        new WorkerError('Worker has been already listened', MOCK_WORKER_TYPE),
      )
    }

    eeWorker.unsubscribe()
  })

  test('subscribe (worker not started) throw', () => {
    const eeWorker: Object = new EventEmitterWorker()

    try {
      eeWorker.subscribe(null, {
        payload: MOCK_WORKER_RESULT_OK,
      })
    } catch (err) {
      expect(err).toMatchObject(
        new WorkerError('Worker is not started', MOCK_WORKER_TYPE),
      )
    }
  })

  test('subscribe (inside worker) throw', () => {
    const eeWorker: Object = new EventEmitterWorker()

    try {
      eeWorker.subscribe(MOCK_WORKER_INSTANCE, {
        payload: MOCK_WORKER_THROW,
      })
    } catch (err) {
      expect(err).toMatchObject(new WorkerError(new Error(MOCK_WORKER_ERROR), MOCK_WORKER_TYPE))
    }

    eeWorker.unsubscribe()
  })

  test('unsubscribe', () => {
    const eeWorker: Object = new EventEmitterWorker()

    eeWorker.subscribe(MOCK_WORKER_INSTANCE, {
      payload: MOCK_WORKER_RESULT_OK,
    })

    eeWorker.unsubscribe()

    expect(eeWorker.ee).toBeNull()
    expect(eeWorker.worker).toBeNull()
  })
})
