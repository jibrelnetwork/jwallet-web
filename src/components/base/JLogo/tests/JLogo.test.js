// @flow strict

import React from 'react'
import { mount } from 'enzyme'

import { JLogo } from '../JLogo'

describe('JLogo', () => {
  test('is available', () => {
    expect(JLogo).toBeDefined()
  })

  test('renders', () => {
    expect(() => mount(<JLogo />)).not.toThrow()
  })

  test('changes image for different theme', () => {
    const blue = mount(<JLogo theme='blue' />)

    expect(blue.find('img').prop('src')).toBe('./logo-blue.svg')

    const white = mount(<JLogo theme='white' />)

    expect(white.find('img').prop('src')).toBe('./logo-white.svg')
  })

  test('passes className', () => {
    const wrapper = mount(
      <JLogo
        className='foo'
      />,
    )

    expect(wrapper.hasClass('foo')).toBe(true)
  })
})
