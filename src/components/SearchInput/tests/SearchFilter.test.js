import React from 'react'
import { shallow } from 'enzyme'

import { SearchFilter } from '../SearchFilter/SearchFilter.js'

describe('SearchFilter', () => {
  it('is available', () => {
    expect(SearchFilter).toBeDefined()
  })

  it('does not display count if it is not specified', () => {
    const wrapper = shallow(<SearchFilter>test</SearchFilter>)

    expect(wrapper.exists('em')).toBe(false)
  })

  it('does not display count if it is 0 or less than 0', () => {
    expect(
      shallow(<SearchFilter activeCount={0}>test</SearchFilter>).exists('em'),
    ).toBe(false)

    expect(
      shallow(<SearchFilter activeCount={-1}>test</SearchFilter>).exists('em'),
    ).toBe(false)

    expect(
      shallow(<SearchFilter activeCount={-18.8}>test</SearchFilter>).exists('em'),
    ).toBe(false)
  })

  it('displays count if it is more than 0', () => {
    expect(
      shallow(<SearchFilter activeCount={1}>test</SearchFilter>).exists('em'),
    ).toBe(true)

    expect(
      shallow(<SearchFilter activeCount={42}>test</SearchFilter>).exists('em'),
    ).toBe(true)
  })
})
