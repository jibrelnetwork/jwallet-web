// @flow strict

import { getAddressName } from '..'

describe('address getAddressName', () => {
  it('is available', () => {
    expect(getAddressName).toBeDefined()
  })

  it('it works with name and index', () => {
    const result: string = getAddressName(
      'My Address',
      1,
    )

    expect(result).toBe('My Address')
  })

  it('it works without name', () => {
    const result: string = getAddressName(
      null,
      1,
    )

    expect(result).toBe('Address 2')
  })

  it('it works with wallet name', () => {
    const result: string = getAddressName(
      'My Address',
      99,
      'My Wallet',
    )

    expect(result).toBe('My Wallet / My Address')
  })
})
