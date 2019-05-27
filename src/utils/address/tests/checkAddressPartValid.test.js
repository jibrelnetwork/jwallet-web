// @flow

import { checkAddressPartValid } from '..'

describe('address checkAddressPartValid', () => {
  it('is available', () => {
    expect(checkAddressPartValid).toBeDefined()
  })

  it('works with valid address', () => {
    expect(checkAddressPartValid('0x70c81aA876Aeb95d610a760D3946D56b66d7b7aF')).toBe(true)
    expect(checkAddressPartValid('70c81aA876Aeb95d610a760D3946D56b66d7b7aF')).toBe(true)
    expect(checkAddressPartValid('70c81aA876Aeb95d610')).toBe(true)
  })

  it('works with invalid address', () => {
    expect(checkAddressPartValid('0x70ZS81aA876Aeb95d610a760D3946D56b66d7b7aF')).toBe(false)
    expect(checkAddressPartValid('70c81aA876Aeb95d610a760D3946D56b66d7b7aF00')).toBe(false)
    expect(checkAddressPartValid('0x70c81aA876Aeb95d610Z')).toBe(false)
  })
})
