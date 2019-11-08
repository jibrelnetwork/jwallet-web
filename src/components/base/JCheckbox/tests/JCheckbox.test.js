// @flow strict

import React from 'react'
import sinon from 'sinon'
import { mount } from 'enzyme'

import JCheckbox from '../JCheckbox'

const onCheckboxChange = sinon.spy()

describe('JCheckbox', () => {
  test('is available', () => {
    expect(JCheckbox).toBeDefined()
  })

  test('has correct defaultProps', () => {
    const wrapper = mount(
      <JCheckbox
        onChange={onCheckboxChange}
        name='test'
      >
        test
      </JCheckbox>,
    )

    expect(wrapper.prop('isChecked')).toBe(false)
  })

  test('onChange handler is called on checkbox check', () => {
    const wrapper = mount(
      <JCheckbox
        onChange={onCheckboxChange}
        name='test'
      >
        test
      </JCheckbox>,
    )

    const checkboxEl = wrapper.find('input')

    expect(onCheckboxChange.callCount).toBe(0)
    checkboxEl.simulate('change')
    expect(onCheckboxChange.callCount).toBe(1)
  })

  test('has children as text', () => {
    const children = 'Some text'

    const wrapper = mount(
      <JCheckbox
        onChange={onCheckboxChange}
        name='clickme'
      >
        {children}
      </JCheckbox>,
    )

    const labelEl = wrapper.find('label')

    expect(labelEl).toBeDefined()
    expect(labelEl.text()).toBe(children)
  })

  test('has children as some node text', () => {
    const wrapper = mount(
      <JCheckbox
        onChange={onCheckboxChange}
        name='clickme'
      >
        <span className='span'>Hello world</span>
      </JCheckbox>,
    )

    const nodeEl = wrapper.find('.span')

    expect(nodeEl).toBeDefined()
    expect(nodeEl.text()).toBe('Hello world')
  })

  test('pass isChecked to checkbox and checks it', () => {
    const wrapper = mount(
      <JCheckbox
        onChange={onCheckboxChange}
        name='clickme'
        isChecked
      >
        foo
      </JCheckbox>,
    )

    const inputEl = wrapper.find({ type: 'checkbox' })

    expect(inputEl).toBeDefined()
    expect(inputEl.props().defaultChecked).toBe(true)
  })
})
