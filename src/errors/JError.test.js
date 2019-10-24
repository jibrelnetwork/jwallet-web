// @flow

import JError, { type JErrorData } from './JError'

type MockErrorData = {|
  +foo: string,
|}

class MockError extends JError<MockErrorData> {
  constructor(data?: JErrorData<MockErrorData>, message?: string) {
    super(data, message)
    this.name = 'MockError'
  }
}

const MOCK_ERROR_DATA: MockErrorData = {
  foo: 'bar',
}

const MOCK_ERROR_MESSAGE = 'MOCK_ERROR_MESSAGE'

describe('JError', () => {
  test('exists', () => {
    expect(JError).toBeDefined()
  })

  test('can be thrown', () => {
    try {
      throw new MockError(MOCK_ERROR_DATA)
    } catch (err) {
      expect(err).toMatchObject(new MockError(MOCK_ERROR_DATA))
      expect(err.data).toMatchObject(MOCK_ERROR_DATA)
      expect(err.data.wrong).toBeUndefined()
    }
  })

  test('has correct name', () => {
    try {
      throw new MockError(MOCK_ERROR_DATA)
    } catch (err) {
      expect(err.name).toEqual('MockError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new MockError(MOCK_ERROR_DATA)
    } catch (err) {
      expect(err).toBeInstanceOf(Error)
      expect(err).toBeInstanceOf(JError)
      expect(err).toBeInstanceOf(MockError)
      expect(err instanceof String).toBeFalsy()
    }
  })

  test('has stacktrace', () => {
    try {
      throw new MockError(MOCK_ERROR_DATA)
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })

  test('has message', () => {
    try {
      throw new MockError(MOCK_ERROR_DATA, MOCK_ERROR_MESSAGE)
    } catch (err) {
      expect(err.message).toBe(MOCK_ERROR_MESSAGE)
    }
  })

  test('pass message in first param', () => {
    try {
      throw new MockError(MOCK_ERROR_MESSAGE)
    } catch (err) {
      expect(err.message).toBe(MOCK_ERROR_MESSAGE)
    }
  })

  test('throw without params', () => {
    try {
      throw new MockError()
    } catch (err) {
      expect(err.data).toBeNull()
      expect(err.message).toBe('')
    }
  })
})
