// @flow strict

import { DigitalAssetNotFoundError } from '..'

describe('DigitalAssetNotFoundError', () => {
  test('exists', () => {
    expect(DigitalAssetNotFoundError).toBeDefined()
  })

  test('can be thrown', () => {
    const fn = () => {
      throw new DigitalAssetNotFoundError()
    }

    expect(fn).toThrow(DigitalAssetNotFoundError)
  })

  test('has correct name', () => {
    try {
      throw new DigitalAssetNotFoundError()
    } catch (err) {
      expect(err.name).toEqual('DigitalAssetNotFoundError')
    }
  })

  test('can be checked by instanceof', () => {
    try {
      throw new DigitalAssetNotFoundError()
    } catch (err) {
      expect(err instanceof DigitalAssetNotFoundError).toBe(true)
      expect(err instanceof Error).toBe(true)
    }
  })

  test('has stacktrace', () => {
    try {
      throw new DigitalAssetNotFoundError()
    } catch (err) {
      expect(err.stack).toBeDefined()
      expect(err.stack).not.toBeNull()
    }
  })
})
