import React from 'react'
import sinon from 'sinon'

import {
  shallow,
  mount,
} from 'enzyme'

import { JTextArea } from '../JTextArea.js'

describe('Render', () => {
  test('default props', () => {
    const wrapper = shallow(<JTextArea value='Hello World' />)

    expect(wrapper.prop('className')).toBe('__textarea core white')
    expect(wrapper.find('textarea').prop('rows')).toBe(1)
  })

  test('The `blue` theme is apply class `blue` to textarea', () => {
    const wrapper = shallow(<JTextArea theme='blue' />)

    expect(wrapper.hasClass('blue')).toBe(true)
  })

  test('className property is apply to textarea', () => {
    const wrapper = shallow(<JTextArea className='test-class' />)

    expect(wrapper.hasClass('test-class')).toBe(true)
  })

  test('Showing label for input when JTextArea has props label', () => {
    const labelText = 'Label textarea'
    const wrapper = shallow(<JTextArea label={labelText} value='Hello World' />)

    expect(wrapper.find('label').text()).toBe(labelText)
  })

  test('html attributes are apply to textarea', () => {
    const wrapper = shallow(
      <JTextArea
        aria-label='meow'
        data-unit='txt-area'
        random-attribute='wow'
        row={8}
      />,
    )

    expect(wrapper.find('textarea').prop('row')).toBe(8)
    expect(wrapper.find('textarea').prop('rows')).toBe(1)
    expect(wrapper.find('textarea').prop('className')).toBe('input')
    expect(wrapper.find('textarea').prop('aria-label')).toBe('meow')
    expect(wrapper.find('textarea').prop('data-unit')).toBe('txt-area')
    expect(wrapper.find('textarea').prop('random-attribute')).toBe('wow')
  })

  test('onChange handler is call on change value in textarea', () => {
    const onTextAreaChange = sinon.spy()
    const wrapper = mount(<JTextArea value='Meow' onChange={onTextAreaChange} />)
    const txtArea = wrapper.find('textarea')

    expect(onTextAreaChange.callCount).toBe(0)
    txtArea.simulate('change', { target: { value: 'HAHAHAHAHHAAHHAHAHAHAHA' } })

    expect(onTextAreaChange.callCount).toBe(1)
  })
})
