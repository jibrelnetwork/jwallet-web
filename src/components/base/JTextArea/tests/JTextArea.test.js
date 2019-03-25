import React from 'react'
import sinon from 'sinon'
import {
  shallow,
  mount,
} from 'enzyme'

import { JTextArea } from '../JTextArea.js'

describe('Render', () => {
  test('Semantic html', () => {
    const wrapper = shallow(<JTextArea value='Hello World' />)

    expect(wrapper.html()).toBe('<textarea class="core blue">Hello World</textarea>')
  })

  test('The `blue` theme is apply class `blue` to textarea', () => {
    const wrapper = shallow(<JTextArea theme='blue' />)

    expect(wrapper.html()).toBe('<textarea class="core blue"></textarea>')
  })

  test('className property is apply to textarea', () => {
    const wrapper = shallow(<JTextArea className='test-class' />)

    expect(wrapper.hasClass('test-class')).toBeTruthy()
  })

  test('html attributes are apply to textarea', () => {
    const wrapper = shallow(
      <JTextArea
        aria-label='meow'
        data-unit='txt-area'
        random-attribute='wow'
        row={8}
      />)

    // eslint-disable-next-line max-len
    expect(wrapper.html()).toBe('<textarea aria-label="meow" data-unit="txt-area" random-attribute="wow" row="8" class="core blue"></textarea>')
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
