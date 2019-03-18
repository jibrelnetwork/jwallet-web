// @flow

import JError from './JError'
import WorkerTaskTimeoutError from './WorkerTaskTimeoutError'

const MOCK_WORKER_TASK_TIMEOUT_ERROR_MESSAGE: string = 'MOCK_ERROR_MESSAGE'

describe('WorkerTaskTimeoutError', () => {
  test('exists', () => {
    expect(WorkerTaskTimeoutError).toBeDefined()
  })

  test('can be thrown', () => {
    try {
      throw new WorkerTaskTimeoutError(MOCK_WORKER_TASK_TIMEOUT_ERROR_MESSAGE)
    } catch (err) {
      expect(err).toMatchObject(new WorkerTaskTimeoutError(MOCK_WORKER_TASK_TIMEOUT_ERROR_MESSAGE))
      expect(err.data).toBeNull()
      expect(err.message).toBe(MOCK_WORKER_TASK_TIMEOUT_ERROR_MESSAGE)
    }
  })

  test('has correct name', () => {
    try {
      throw new WorkerTaskTimeoutError(MOCK_WORKER_TASK_TIMEOUT_ERROR_MESSAGE)
    } catch (err) {
      expect(err.name).toEqual('WorkerTaskTimeoutError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WorkerTaskTimeoutError(MOCK_WORKER_TASK_TIMEOUT_ERROR_MESSAGE)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(JError)
      expect(err).toBeInstanceOf(WorkerTaskTimeoutError)
      expect(err instanceof RegExp).toBeFalsy()
    }
  })
})
