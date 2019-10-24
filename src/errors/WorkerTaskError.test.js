// @flow

import JError from './JError'
import WorkerTaskError from './WorkerTaskError'

const MOCK_WORKER_TASK_ERROR_MESSAGE: string = 'MOCK_ERROR_MESSAGE'
const MOCK_WORKER_TASK_ERROR_ORIGIN_STACK = (new Error(MOCK_WORKER_TASK_ERROR_MESSAGE)).stack

const MOCK_WORKER_TASK_ERROR_DATA = {
  originStack: MOCK_WORKER_TASK_ERROR_ORIGIN_STACK,
}

describe('WorkerTaskError', () => {
  test('exists', () => {
    expect(WorkerTaskError).toBeDefined()
  })

  test('can be thrown', () => {
    try {
      throw new WorkerTaskError(MOCK_WORKER_TASK_ERROR_DATA, MOCK_WORKER_TASK_ERROR_MESSAGE)
    } catch (err) {
      expect(err).toMatchObject(
        new WorkerTaskError(MOCK_WORKER_TASK_ERROR_DATA, MOCK_WORKER_TASK_ERROR_MESSAGE),
      )

      expect(err.message).toBe(MOCK_WORKER_TASK_ERROR_MESSAGE)
      expect(err.data).toMatchObject(MOCK_WORKER_TASK_ERROR_DATA)
      expect(err.data.originStack).toBe(MOCK_WORKER_TASK_ERROR_ORIGIN_STACK)
    }
  })

  test('has correct name', () => {
    try {
      throw new WorkerTaskError(MOCK_WORKER_TASK_ERROR_DATA, MOCK_WORKER_TASK_ERROR_MESSAGE)
    } catch (err) {
      expect(err.name).toEqual('WorkerTaskError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WorkerTaskError(MOCK_WORKER_TASK_ERROR_DATA, MOCK_WORKER_TASK_ERROR_MESSAGE)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(JError)
      expect(err).toBeInstanceOf(WorkerTaskError)
      expect(err instanceof Number).toBeFalsy()
    }
  })
})
