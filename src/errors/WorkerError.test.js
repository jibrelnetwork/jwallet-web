// @flow

import JError from './JError'
import WorkerError from './WorkerError'

const MOCK_WORKER_TYPE: 'event-emitter' = 'event-emitter'
const MOCK_WORKER_ERROR_MESSAGE: string = 'MOCK_ERROR_MESSAGE'

const MOCK_WORKER_ERROR_DATA = {
  workerType: MOCK_WORKER_TYPE,
  originError: new Error(MOCK_WORKER_ERROR_MESSAGE),
}

describe('WorkerError', () => {
  test('exists', () => {
    expect(WorkerError).toBeDefined()
  })

  test('can be thrown', () => {
    try {
      throw new WorkerError(MOCK_WORKER_ERROR_DATA, MOCK_WORKER_ERROR_MESSAGE)
    } catch (err) {
      expect(err).toMatchObject(new WorkerError(MOCK_WORKER_ERROR_DATA, MOCK_WORKER_ERROR_MESSAGE))
      expect(err.message).toBe(MOCK_WORKER_ERROR_MESSAGE)
      expect(err.data).toMatchObject(MOCK_WORKER_ERROR_DATA)
      expect(err.data.workerType).toBe(MOCK_WORKER_TYPE)
      expect(err.data.originError).toMatchObject(new Error(MOCK_WORKER_ERROR_MESSAGE))
    }
  })

  test('has correct name', () => {
    try {
      throw new WorkerError(MOCK_WORKER_ERROR_DATA)
    } catch (err) {
      expect(err.name).toEqual('WorkerError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WorkerError(MOCK_WORKER_ERROR_DATA)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(JError)
      expect(err).toBeInstanceOf(WorkerError)
      expect(err instanceof Boolean).toBeFalsy()
    }
  })
})
