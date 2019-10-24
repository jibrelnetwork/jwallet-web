import React from 'react'
import {
  shallow,
} from 'enzyme'

import { JIcon } from '../JIcon'
import jIconStyle from '../jIcon.m.scss'

jest.mock('../../../../utils/sprite/iconsUI', () => ({
  'add-usage': {
    width: 32,
    height: 32,
    url: '#add-usage',
  },
}))

describe('JIcon', () => {
  it('is available', () => {
    expect(JIcon).toBeDefined()
  })

  it('renders icon if valid name is specified', () => {
    const wrapper = shallow(<JIcon name='add' />)

    expect(wrapper.exists('svg')).toBe(true)
  })

  it('renders placeholder icon if name is invalid', () => {
    const wrapper = shallow(<JIcon name='some-random-non-existent-name' />)

    expect(wrapper.exists('svg')).toBe(false)
    expect(wrapper.exists('div')).toBe(true)
  })

  it('changes icon color by property', () => {
    const wrapper = shallow(<JIcon name='add' color='sky' />)

    expect(wrapper.find('svg').hasClass(jIconStyle.sky)).toBe(true)
  })

  it('adds specified class name', () => {
    const wrapper = shallow(<JIcon name='add' className='foo' />)

    expect(wrapper.find('svg').hasClass('foo')).toBe(true)
  })
})
