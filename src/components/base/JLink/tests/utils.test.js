import {
  isAnchor,
  isExternal,
} from '../utils'

describe('isAnchor', () => {
  test('is available', () => {
    expect(isAnchor).toBeDefined()
  })

  test('is false if no value specified', () => {
    expect(isAnchor()).toBe(false)
  })

  test('is true for valid anchor values', () => {
    expect(isAnchor('#')).toBe(true)
    expect(isAnchor('#foo')).toBe(true)
    expect(isAnchor('#/some/path')).toBe(true)
    expect(isAnchor('#search?q=eth&ignoreNotFound=1')).toBe(true)
  })

  test('is false for invalid link values', () => {
    expect(isAnchor('http://google.com')).toBe(false)
    expect(isAnchor('https://google.com')).toBe(false)
    expect(isAnchor('file:///User/admin/.ssh/private.key')).toBe(false)
    expect(isAnchor('/wallets')).toBe(false)
    expect(isAnchor('wallets/import')).toBe(false)
    expect(isAnchor('/wallets?utm_source=facebook')).toBe(false)
  })
})

describe('isExternal', () => {
  test('is available', () => {
    expect(isExternal).toBeDefined()
  })

  test('is false if no value specified', () => {
    expect(isExternal()).toBe(false)
  })

  test('is true for external urls', () => {
    expect(isExternal('http://google.com')).toBe(true)
    expect(isExternal('https://google.com')).toBe(true)
    expect(isExternal('file:///User/admin/.ssh/private.key')).toBe(true)
    expect(isExternal('mailto:support@jibrel.network')).toBe(true)
  })

  test('is false for internal links and anchors', () => {
    expect(isExternal('/wallets')).toBe(false)
    expect(isExternal('wallets/import')).toBe(false)
    expect(isExternal('/wallets?utm_source=facebook')).toBe(false)
    expect(isExternal('#')).toBe(false)
    expect(isExternal('#foo')).toBe(false)
    expect(isExternal('#/some/path')).toBe(false)
    expect(isExternal('#search?q=eth&ignoreNotFound=1')).toBe(false)
  })
})
