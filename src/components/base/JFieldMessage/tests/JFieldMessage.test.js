import React from 'react'
import { shallow } from 'enzyme'

import { JFieldMessage } from '../JFieldMessage.js'

describe('Render semantic html', () => {
  test('for error theme', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' theme='error' />)
    expect(wrapper.html()).toBe('<span class="core error">Hello world</span>')
  })

  test('without theme prop', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' />)
    expect(wrapper.html()).toBe('<span class="core error">Hello world</span>')
  })

  test('for info theme', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' theme='info' />)
    expect(wrapper.html()).toBe('<span class="core info">Hello world</span>')
  })
})
