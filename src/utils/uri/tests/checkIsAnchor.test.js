import { checkIsAnchor } from '../checkIsAnchor'

describe('checkIsAnchor', () => {
  test('is available', () => {
    expect(checkIsAnchor).toBeDefined()
  })

  test('is false if no value specified', () => {
    expect(checkIsAnchor()).toBe(false)
  })

  test('is true for valid anchor values', () => {
    expect(checkIsAnchor('#')).toBe(true)
    expect(checkIsAnchor('#foo')).toBe(true)
    expect(checkIsAnchor('#/some/path')).toBe(true)
    expect(checkIsAnchor('#search?q=eth&ignoreNotFound=1')).toBe(true)
  })

  test('is false for invalid link values', () => {
    expect(checkIsAnchor('http://google.com')).toBe(false)
    expect(checkIsAnchor('https://google.com')).toBe(false)
    expect(checkIsAnchor('file:///User/admin/.ssh/private.key')).toBe(false)
    expect(checkIsAnchor('/wallets')).toBe(false)
    expect(checkIsAnchor('wallets/import')).toBe(false)
    expect(checkIsAnchor('/wallets?utm_source=facebook')).toBe(false)
  })
})
