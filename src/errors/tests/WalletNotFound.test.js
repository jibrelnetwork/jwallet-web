// @flow

import { WalletNotFoundError } from '..'

const walletId = '123'

describe('WalletNotFoundError', () => {
  test('exists', () => {
    expect(WalletNotFoundError).not.toEqual(undefined)
  })

  test('can be throwed', () => {
    const fn = () => {
      throw new WalletNotFoundError()
    }

    expect(fn).toThrow(WalletNotFoundError)
  })

  test('has correct name', () => {
    try {
      throw new WalletNotFoundError()
    } catch (err) {
      expect(err.name).toEqual('WalletNotFoundError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WalletNotFoundError()
    } catch (err) {
      expect(err instanceof WalletNotFoundError).toBe(true)
      expect(err instanceof Error).toBe(true)
    }
  })

  test('has stacktrace', () => {
    try {
      throw new WalletNotFoundError()
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })

  test('has walletId and message text', () => {
    try {
      throw new WalletNotFoundError(walletId)
    } catch (err) {
      expect(err.walletId).toBeDefined()
      expect(err.message).toBe(`Wallet ${walletId} not found`)
    }
  })

  test('has correct message when walletId is not set', () => {
    try {
      throw new WalletNotFoundError()
    } catch (err) {
      expect(err.walletId).toBeUndefined()
      expect(err.message).toBe('Wallet null not found')
    }
  })
})
