// @flow

import { getAddressName } from '..'

describe('address getAddressName', () => {
  it('is available', () => {
    expect(getAddressName).toBeDefined()
  })

  it('it works with name and index', () => {
    const withName = getAddressName('My Address', 1)
    expect(withName).toBe('My Address')
  })

  it('it works without name and index', () => {
    const withName = getAddressName(null, 1)
    expect(withName).toBe('Address 2')
  })
})
