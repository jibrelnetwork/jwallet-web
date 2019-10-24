// @flow

import JError from './JError'
import WorkerQueueExceededError from './WorkerQueueExceededError'

describe('WorkerQueueExceededError', () => {
  test('exists', () => {
    expect(WorkerQueueExceededError).toBeDefined()
  })

  test('can be thrown', () => {
    try {
      throw new WorkerQueueExceededError()
    } catch (err) {
      expect(err).toMatchObject(new WorkerQueueExceededError())
      expect(err.data).toBeNull()
      expect(err.message).toBe('')
    }
  })

  test('has correct name', () => {
    try {
      throw new WorkerQueueExceededError()
    } catch (err) {
      expect(err.name).toEqual('WorkerQueueExceededError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WorkerQueueExceededError()
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(JError)
      expect(err).toBeInstanceOf(WorkerQueueExceededError)
      expect(err instanceof Number).toBeFalsy()
    }
  })
})
