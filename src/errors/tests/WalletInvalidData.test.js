// @flow

import { WalletInvalidDataError } from '..'

const walletId = '123'

describe('WalletInvalidDataError', () => {
  test('exists', () => {
    expect(WalletInvalidDataError).not.toEqual(undefined)
  })

  test('can be throwed', () => {
    const fn = () => {
      throw new WalletInvalidDataError()
    }

    expect(fn).toThrow(WalletInvalidDataError)
  })

  test('has correct name', () => {
    try {
      throw new WalletInvalidDataError()
    } catch (err) {
      expect(err.name).toEqual('WalletInvalidDataError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WalletInvalidDataError()
    } catch (err) {
      expect(err instanceof WalletInvalidDataError).toBe(true)
      expect(err instanceof Error).toBe(true)
    }
  })

  test('has stacktrace', () => {
    try {
      throw new WalletInvalidDataError()
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })

  test('has walletId and message text', () => {
    try {
      throw new WalletInvalidDataError(walletId)
    } catch (err) {
      expect(err.walletId).toBeDefined()
      expect(err.message).toBe('Invalid wallet data')
    }
  })

  test('has correct message when walletId is not set', () => {
    try {
      throw new WalletInvalidDataError()
    } catch (err) {
      expect(err.walletId).toBeUndefined()
      expect(err.message).toBe('Invalid wallet data')
    }
  })
})
