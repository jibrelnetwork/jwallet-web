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

    // eslint-disable-next-line max-len
    const expected = '<div class="core white focused"><textarea class="input" rows="1">Hello World</textarea></div>'
    expect(wrapper.html()).toBe(expected)
  })

  test('The `blue` theme is apply class `blue` to textarea', () => {
    const wrapper = shallow(<JTextArea theme='blue' />)

    const expected = '<div class="core blue"><textarea class="input" rows="1"></textarea></div>'
    expect(wrapper.html()).toBe(expected)
  })

  test('className property is apply to textarea', () => {
    const wrapper = shallow(<JTextArea className='test-class' />)

    expect(wrapper.hasClass('test-class')).toBeTruthy()
  })

  test('Showing label for input when JTextArea has props label', () => {
    const wrapper = shallow(<JTextArea label='Label textarea' value='Hello World' />)

    // eslint-disable-next-line max-len
    const expected = '<div class="core white focused"><label class="label" for="label-textarea">Label textarea</label><textarea id="label-textarea" class="input" rows="1">Hello World</textarea></div>'
    expect(wrapper.html()).toBe(expected)
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

    // eslint-disable-next-line max-len
    const expected = '<div class="core white"><textarea aria-label="meow" data-unit="txt-area" random-attribute="wow" row="8" class="input" rows="1"></textarea></div>'
    expect(wrapper.html()).toBe(expected)
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
