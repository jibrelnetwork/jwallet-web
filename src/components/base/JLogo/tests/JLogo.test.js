// @flow strict

import React from 'react'
import { mount } from 'enzyme'

jest.mock('react-router5', () => ({
  withRouter: function withRouter(BaseComponent) {
    const ReactForMock = require('react')

    return function WithRouter(props) {
      return ReactForMock.createElement(
        BaseComponent, {
          ...props,
          router: {
            matchUrl: () => null,
          },
        },
      )
    }
  },
}))

// eslint-disable-next-line import/first
import { JLogo } from '../JLogo'

describe('JLogo', () => {
  test('is available', () => {
    expect(JLogo).toBeDefined()
  })

  test('renders', () => {
    const wrapper = mount(<JLogo />)

    expect(wrapper.children()).toHaveLength(1)
    expect(wrapper.prop('className')).toBe('')
    expect(wrapper.prop('theme')).toBe('white')

    const jLink = wrapper.childAt(0)

    expect(jLink.prop('href')).toBe('/')
    expect(jLink.hasClass('__j-logo')).toBe(true)
  })

  test('renders (specified theme)', () => {
    const wrapper = mount(<JLogo theme='blue' />)

    expect(wrapper.prop('theme')).toBe('blue')

    const span = wrapper.find('span')

    expect(span.hasClass('image blue')).toBe(true)
  })

  test('renders (specified className)', () => {
    const wrapper = mount(
      <JLogo
        theme='blue'
        className='foo'
      />,
    )

    expect(wrapper.prop('className')).toBe('foo')

    const jLink = wrapper.childAt(0)

    expect(jLink.hasClass('foo')).toBe(true)
  })
})
