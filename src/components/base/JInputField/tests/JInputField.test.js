import React from 'react'
import {
  shallow,
  mount,
} from 'enzyme'

import { JInputField } from '../JInputField'
import { JFieldMessage } from '../../JFieldMessage/JFieldMessage'

const finalFormInputMock = {
  name: 'foo',
  onChange: () => null,
  onFocus: () => null,
  onBlur: () => null,
  value: 'abc',
}

describe('JInputField', () => {
  test('is available', () => {
    expect(JInputField).toBeDefined()
  })

  test('has correct defaultProps', () => {
    const wrapper = mount(
      <JInputField />,
    )

    expect(wrapper.prop('theme')).toBe('white')
    expect(wrapper.prop('type')).toBe('text')
    expect(wrapper.prop('isDisabled')).toBe(false)
    expect(wrapper.prop('validateType')).toBe('touched')
    expect(wrapper.prop('infoMessage')).toBe(null)
    expect(wrapper.prop('label')).toBe('')
    expect(wrapper.prop('placeholder')).toBe('')
    expect(wrapper.prop('meta')).toBeDefined()
    expect(wrapper.prop('input')).toBeDefined()
  })

  test('html attributes are applies to input', () => {
    const wrapper = shallow(
      <JInputField
        aria-label='meow'
      />,
    )

    const inputEl = wrapper.find('input')
    expect(inputEl.prop('aria-label')).toBe('meow')
  })

  test('has label', () => {
    const wrapper = shallow(
      <JInputField
        label='Hi'
      />,
    )

    const labelEl = wrapper.find('.label')
    expect(labelEl.html()).toBe('<label class="label" for="hiId">Hi</label>')
  })

  test('can be disabled', () => {
    const wrapper = shallow(
      <JInputField
        isDisabled
      />,
    )

    const wrapEl = wrapper.find('div.wrap')
    const inputEl = wrapper.find('input')

    expect(wrapEl.hasClass('disabled')).toBe(true)
    expect(inputEl.prop('disabled')).toBe(true)
  })

  test('can show infoMessage', () => {
    const wrapper = shallow(
      <JInputField
        infoMessage='Hi'
      />,
    )

    const messageEl = wrapper.find(JFieldMessage)
    expect(messageEl.prop('theme')).toBe('info')
    expect(messageEl.prop('message')).toBe('Hi')
  })

  test('can show error message', () => {
    const wrapper = shallow(
      <JInputField
        meta={{
          error: 'Hi',
          touched: true,
        }}
        validateType='touched'
      />,
    )

    const messageEl = wrapper.find(JFieldMessage)
    expect(messageEl.prop('theme')).toBe('error')
    expect(messageEl.prop('message')).toBe('Hi')
  })

  test('has error and info messages, but shows error message', () => {
    const wrapper = shallow(
      <JInputField
        meta={{
          error: 'Hi',
          touched: true,
        }}
        validateType='touched'
        infoMessage='Info'
      />,
    )

    const messageEl = wrapper.find(JFieldMessage)
    expect(messageEl.prop('theme')).toBe('error')
    expect(messageEl.prop('message')).toBe('Hi')
  })

  test('pass FinalForm input to input el', () => {
    const wrapper = shallow(
      <JInputField
        input={finalFormInputMock}
      />,
    )

    const inputEl = wrapper.find('input')

    expect(inputEl.prop('name')).toBe(finalFormInputMock.name)
    expect(inputEl.prop('onChange')).toBe(finalFormInputMock.onChange)
    expect(inputEl.prop('onBlur')).toBe(finalFormInputMock.onBlur)
    expect(inputEl.prop('onFocus')).toBe(finalFormInputMock.onFocus)
    expect(inputEl.prop('value')).toBe(finalFormInputMock.value)
  })

  test('active when meta.active', () => {
    const wrapper = shallow(
      <JInputField
        meta={{
          active: true,
        }}
      />,
    )

    const wrapEl = wrapper.find('div.wrap')
    expect(wrapEl.hasClass('active')).toBe(true)
  })

  test('active when has value', () => {
    const wrapper = shallow(
      <JInputField
        input={finalFormInputMock}
      />,
    )

    const wrapEl = wrapper.find('div.wrap')
    expect(wrapEl.hasClass('active')).toBe(true)
  })

  test('active when has label and placeholder', () => {
    const wrapper = shallow(
      <JInputField
        label='Hi'
        placeholder='... and enter value'
      />,
    )

    const wrapEl = wrapper.find('div.wrap')
    expect(wrapEl.hasClass('active')).toBe(true)
  })

  test('set focus on label click', () => {
    const wrapper = mount(
      <JInputField
        label='Click me'
      />,
    )

    const focusedElBeforeClick = document.activeElement
    expect(focusedElBeforeClick instanceof HTMLBodyElement).toBe(true)

    const labelEl = wrapper.find('.label')
    labelEl.simulate('click')

    const focusedElAfterClick = document.activeElement
    expect(focusedElAfterClick instanceof HTMLInputElement).toBe(true)
  })
})
