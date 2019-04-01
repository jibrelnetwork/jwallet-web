import React from 'react'
import {
  shallow,
  mount,
} from 'enzyme'
import sinon from 'sinon'

import createRouter5 from 'router5'
import browserPlugin from 'router5-plugin-browser'
import { RouterProvider } from 'react-router5'

import { JLink } from '../JLink'

const TEST_ROUTES = [
  {
    name: 'some-path',
    path: '/some/path',
  },
]

describe('JLink', () => {
  test('is available', () => {
    expect(JLink).toBeDefined()
  })

  test('renders valid <a> element for anchor link', () => {
    const wrapper = shallow(<JLink href='#the-anchor'>link</JLink>)

    expect(wrapper.text()).toBe('link')
    expect(wrapper.find('a').length).toBe(1)
    expect(wrapper.find('a').prop('href')).toBe('#the-anchor')
  })

  test('renders valid <a> element for external link', () => {
    const wrapper = shallow(<JLink href='https://google.com'>link</JLink>)

    expect(wrapper.text()).toBe('link')
    expect(wrapper.find('a').length).toBe(1)
    expect(wrapper.find('a').prop('href')).toBe('https://google.com')
    expect(wrapper.find('a').prop('target')).toBe('_blank')
    expect(wrapper.find('a').prop('rel')).toBe('noopener noreferrer')
  })

  test('renders valid <a> element for internal link', () => {
    const router = createRouter5(TEST_ROUTES, {
      allowNotFound: true,
    })
    router.usePlugin(browserPlugin())

    const wrapper = mount(
      <RouterProvider router={router}>
        <div>
          <JLink href='/some/path'>some path</JLink>
        </div>
      </RouterProvider>,
    )

    expect(wrapper.text()).toBe('some path')
    expect(wrapper.find('a').length).toBe(1)
    expect(wrapper.find('a').prop('href')).toBe('/some/path')
    expect(wrapper.find('a').prop('target')).toBeUndefined()
  })

  test('calls router on internal link click', () => {
    const router = createRouter5(TEST_ROUTES, {
      allowNotFound: true,
    })
    const canActivateSomePathFake = sinon.fake.returns(true)
    router.canActivate('some-path', canActivateSomePathFake)
    router.usePlugin(browserPlugin())

    const wrapper = mount(
      <RouterProvider router={router}>
        <div>
          <JLink href='/some/path'>some path</JLink>
        </div>
      </RouterProvider>,
    )

    wrapper.find('a').simulate('click')

    expect(canActivateSomePathFake.callCount).toBe(1)
  })

  test('passes className to DOM element', () => {
    const wrapper = shallow(<JLink href='#' className='test'>test</JLink>)

    expect(wrapper.find('a').prop('className')).toEqual(expect.stringContaining('test'))
  })
})
