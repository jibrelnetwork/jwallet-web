// @flow

import { ActiveNetworkNotFoundError } from '..'

describe('ActiveNetworkNotFoundError', () => {
  test('exists', () => {
    expect(ActiveNetworkNotFoundError).not.toEqual(undefined)
  })

  test('can be throwed', () => {
    const fn = () => {
      throw new ActiveNetworkNotFoundError()
    }

    expect(fn).toThrow(ActiveNetworkNotFoundError)
  })

  test('has correct name', () => {
    try {
      throw new ActiveNetworkNotFoundError()
    } catch (err) {
      expect(err.name).toEqual('ActiveNetworkNotFoundError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new ActiveNetworkNotFoundError()
    } catch (err) {
      expect(err instanceof ActiveNetworkNotFoundError).toBe(true)
      expect(err instanceof Error).toBe(true)
    }
  })

  test('has stacktrace', () => {
    try {
      throw new ActiveNetworkNotFoundError()
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })
})
