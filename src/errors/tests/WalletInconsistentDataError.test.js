// @flow

import { WalletInconsistentDataError } from '..'

const walletId = '123'

describe('WalletInconsistentDataError', () => {
  test('exists', () => {
    expect(WalletInconsistentDataError).toBeDefined()
  })

  test('can be thrown', () => {
    const fn = () => {
      throw new WalletInconsistentDataError()
    }

    expect(fn).toThrow(WalletInconsistentDataError)
  })

  test('has correct name', () => {
    try {
      throw new WalletInconsistentDataError()
    } catch (err) {
      expect(err.name).toEqual('WalletInconsistentDataError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new WalletInconsistentDataError()
    } catch (err) {
      expect(err instanceof WalletInconsistentDataError).toBe(true)
      expect(err instanceof Error).toBe(true)
    }
  })

  test('has stacktrace', () => {
    try {
      throw new WalletInconsistentDataError()
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })

  test('has walletId', () => {
    try {
      throw new WalletInconsistentDataError({ walletId }, 'Some message')
    } catch (err) {
      expect(err.data.walletId).toBeDefined()
    }
  })
})
