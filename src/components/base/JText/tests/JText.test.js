import React from 'react'
import { shallow } from 'enzyme'

import JText from '../JText'

describe('JText', () => {
  test('is available', () => {
    expect(JText).toBeDefined()
  })

  test('renders', () => {
    const wrapper = shallow(<JText value='text' />)
    expect(wrapper.text()).toBe('text')
  })
})
