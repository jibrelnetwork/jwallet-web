import React from 'react'
import sinon from 'sinon'
import {
  mount,
} from 'enzyme'

import { JCheckbox } from '../JCheckbox'

describe('JCheckbox', () => {
  test('is available', () => {
    expect(JCheckbox).toBeDefined()
  })

  test('has correct defaultProps', () => {
    const wrapper = mount(
      <JCheckbox />,
    )

    expect(wrapper.prop('isChecked')).toBe(false)
  })

  test('onChange handler is call on checkbox check', () => {
    const onCheckboxChange = sinon.spy()
    const wrapper = mount(<JCheckbox name='foo' onChange={onCheckboxChange} />)

    const checkboxEl = wrapper.find('input')

    expect(onCheckboxChange.callCount).toBe(0)
    checkboxEl.simulate('change')

    expect(onCheckboxChange.callCount).toBe(1)
  })

  test('has children as text', () => {
    const wrapper = mount(<JCheckbox name='clickme'>Some text</JCheckbox>)

    const labelEl = wrapper.find('label')
    expect(labelEl).toBeDefined()

    expect(labelEl.text()).toBe('Some text')
  })

  test('has children as some node text', () => {
    const wrapper = mount(
      <JCheckbox name='clickme'>
        <span className='some-node-inside-cb'>Hello world</span>
      </JCheckbox>,
    )

    const nodeEl = wrapper.find('.some-node-inside-cb')
    expect(nodeEl).toBeDefined()
    expect(nodeEl.text()).toBe('Hello world')
  })

  test('pass isChecked to checkbox and checks it', () => {
    const wrapper = mount(
      <JCheckbox name='clickme' isChecked>foo</JCheckbox>,
    )

    const inputEl = wrapper.find({ type: 'checkbox' })
    expect(inputEl).toBeDefined()
    expect(inputEl.props().defaultChecked).toBe(true)
  })
})
