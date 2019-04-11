// @flow strict

import React from 'react'
import { shallow } from 'enzyme'

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
import { LogoHeader } from '../LogoHeader'

describe('LogoHeader', () => {
  test('is available', () => {
    expect(LogoHeader).toBeDefined()
  })

  test('renders', () => {
    const wrapper = shallow(<LogoHeader />)

    expect(wrapper.children()).toHaveLength(1)
    expect(wrapper.hasClass('__logo-header core')).toBe(true)

    const jLogo = wrapper.childAt(0)

    expect(jLogo.prop('theme')).toBe('blue')
    expect(jLogo.prop('className')).toBe('logo')
  })
})
