// @flow

import JError from './JError'
import WorkerTaskReplacedError from './WorkerTaskReplacedError'

describe('WorkerTaskReplacedError', () => {
  test('exists', () => {
    expect(WorkerTaskReplacedError).toBeDefined()
  })

  test('can be thrown', () => {
    try {
      throw new WorkerTaskReplacedError()
    } catch (err) {
      expect(err).toMatchObject(new WorkerTaskReplacedError())
      expect(err.data).toBeNull()
      expect(err.message).toBe('')
    }
  })

  test('has correct name', () => {
    try {
      throw new WorkerTaskReplacedError()
    } catch (err) {
      expect(err.name).toEqual('WorkerTaskReplacedError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WorkerTaskReplacedError()
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(JError)
      expect(err).toBeInstanceOf(WorkerTaskReplacedError)
      expect(err instanceof Date).toBeFalsy()
    }
  })
})
