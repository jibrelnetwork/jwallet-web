import React from 'react'
import { shallow } from 'enzyme'

import { JFieldMessage } from '../JFieldMessage'
import jFieldMessageStyle from '../jFieldMessage.m.scss'

describe('JFieldMessage', () => {
  it('has no error nor info class if theme is not specified', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' />)
    expect(wrapper.hasClass(jFieldMessageStyle.error)).toBe(false)
    expect(wrapper.hasClass(jFieldMessageStyle.info)).toBe(false)
  })

  it('displays message string', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' />)
    expect(wrapper.text()).toBe('Hello world')
  })

  it('has info class for error theme', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' theme='info' />)
    expect(wrapper.hasClass(jFieldMessageStyle.info)).toBe(true)
  })

  it('has error class for error theme', () => {
    const wrapper = shallow(<JFieldMessage message='Hello world' theme='error' />)
    expect(wrapper.hasClass(jFieldMessageStyle.error)).toBe(true)
  })
})
