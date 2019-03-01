// @flow

import { ActiveWalletNotFoundError } from '..'

describe('ActiveWalletNotFoundError', () => {
  test('exists', () => {
    expect(ActiveWalletNotFoundError).not.toEqual(undefined)
  })

  test('can be thrown', () => {
    const fn = () => {
      throw new ActiveWalletNotFoundError()
    }

    expect(fn).toThrow(ActiveWalletNotFoundError)
  })

  test('has correct name', () => {
    try {
      throw new ActiveWalletNotFoundError()
    } catch (err) {
      expect(err.name).toEqual('ActiveWalletNotFoundError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new ActiveWalletNotFoundError()
    } catch (err) {
      expect(err instanceof ActiveWalletNotFoundError).toBe(true)
      expect(err instanceof Error).toBe(true)
    }
  })

  test('has stacktrace', () => {
    try {
      throw new ActiveWalletNotFoundError()
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })
})
