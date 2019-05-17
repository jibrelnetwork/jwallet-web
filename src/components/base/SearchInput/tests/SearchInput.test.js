import React from 'react'
import { shallow } from 'enzyme'
import sinon from 'sinon'

import { SearchInput } from '../SearchInput.js'
import searchInputStyle from '../searchInput.m.scss'

describe('SearchInput', () => {
  it('is available', () => {
    expect(SearchInput).toBeDefined()
  })

  // FIXME: Hooks are currently not supported by enzyme
  // related issue: https://github.com/airbnb/enzyme/issues/2011
  xit('changes wrapper class name on input focus', () => {
    const wrapper = shallow(<SearchInput />)

    wrapper.find('input').prop('onFocus')()

    expect(wrapper.hasClass(searchInputStyle.focused)).toBe(true)
  })

  it('calls onChange handler on value change', () => {
    const onChange = sinon.spy()
    const wrapper = shallow(<SearchInput value='Meow' onChange={onChange} />)

    expect(onChange.callCount).toBe(0)

    wrapper.find('input').simulate('change', { target: { value: 'test' } })

    expect(onChange.callCount).toBe(1)
  })

  it('passes className to wrapper element', () => {
    const wrapper = shallow(<SearchInput className='test' />)

    expect(wrapper.hasClass('test')).toBe(true)
  })

  it('does not show additional items container if no children passed', () => {
    expect(
      shallow(<SearchInput />).exists('aside'),
    ).toBe(false)
  })

  it('shows additional items container if children are passed', () => {
    expect(
      shallow(<SearchInput>test</SearchInput>).exists('aside'),
    ).toBe(true)
  })
})
