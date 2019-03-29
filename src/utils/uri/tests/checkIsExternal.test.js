import { checkIsExternal } from '../checkIsExternal'

describe('checkIsExternal', () => {
  test('is available', () => {
    expect(checkIsExternal).toBeDefined()
  })

  test('is false if no value specified', () => {
    expect(checkIsExternal()).toBe(false)
  })

  test('is true for external urls', () => {
    expect(checkIsExternal('http://google.com')).toBe(true)
    expect(checkIsExternal('https://google.com')).toBe(true)
    expect(checkIsExternal('file:///User/admin/.ssh/private.key')).toBe(true)
    expect(checkIsExternal('mailto:support@jibrel.network')).toBe(true)
  })

  test('is false for internal links and anchors', () => {
    expect(checkIsExternal('/wallets')).toBe(false)
    expect(checkIsExternal('wallets/import')).toBe(false)
    expect(checkIsExternal('/wallets?utm_source=facebook')).toBe(false)
    expect(checkIsExternal('#')).toBe(false)
    expect(checkIsExternal('#foo')).toBe(false)
    expect(checkIsExternal('#/some/path')).toBe(false)
    expect(checkIsExternal('#search?q=eth&ignoreNotFound=1')).toBe(false)
  })
})
