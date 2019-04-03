import React from 'react'
import {
  shallow,
  mount,
} from 'enzyme'

import { JFieldMessage } from 'components/base'

import { SendAmountField } from '../SendAmountField'

const finalFormInputMock = {
  name: 'foo',
  onChange: () => null,
  onFocus: () => null,
  onBlur: () => null,
  value: 'abc',
}

describe('SendAmountField', () => {
  test('is available', () => {
    expect(SendAmountField).toBeDefined()
  })

  test('has correct defaultProps', () => {
    const wrapper = mount(
      <SendAmountField />,
    )

    expect(wrapper.prop('validateType')).toBe('touched')
    expect(wrapper.prop('fiatCurrency')).toBe('USD')
    expect(wrapper.prop('infoMessage')).toBe('')
    expect(wrapper.prop('className')).toBe('')
    expect(wrapper.prop('label')).toBe('Amount')
    expect(wrapper.prop('meta')).toBeDefined()
    expect(wrapper.prop('input')).toBeDefined()
  })

  test('has label', () => {
    const wrapper = shallow(
      <SendAmountField
        label='Hi'
      />,
    )

    const labelEl = wrapper.find('.label')
    expect(labelEl.html()).toBe('<label for="amountInputId" class="label">Hi</label>')
  })

  test('can show infoMessage', () => {
    const wrapper = shallow(
      <SendAmountField
        infoMessage='Hi'
      />,
    )

    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const messageEl = wrapper.find(JFieldMessage)
    expect(messageEl.prop('theme')).toBe('info')
    expect(messageEl.prop('message')).toBe('Hi')
  })

  test('can show error message', () => {
    const wrapper = shallow(
      <SendAmountField
        meta={{
          error: 'Hi',
          touched: true,
        }}
        validateType='touched'
      />,
    )

    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const messageEl = wrapper.find(JFieldMessage)
    expect(messageEl.prop('theme')).toBe('error')
    expect(messageEl.prop('message')).toBe('Hi')
  })

  test('has error and info messages, but shows error message', () => {
    const wrapper = shallow(
      <SendAmountField
        meta={{
          error: 'Hi',
          touched: true,
        }}
        validateType='touched'
        infoMessage='Info'
      />,
    )

    // eslint-disable-next-line unicorn/no-fn-reference-in-iterator
    const messageEl = wrapper.find(JFieldMessage)
    expect(messageEl.prop('theme')).toBe('error')
    expect(messageEl.prop('message')).toBe('Hi')
  })

  test('pass FinalForm input to the input el', () => {
    const wrapper = shallow(
      <SendAmountField
        input={finalFormInputMock}
      />,
    )

    const inputEl = wrapper.find('input')

    expect(inputEl.prop('name')).toBe(finalFormInputMock.name)
    expect(inputEl.prop('onBlur')).toBe(finalFormInputMock.onBlur)
    expect(inputEl.prop('onFocus')).toBe(finalFormInputMock.onFocus)
    expect(inputEl.prop('value')).toBe(finalFormInputMock.value)
    // SendAmountField uses wrapper on final form onChange method
    expect(inputEl.prop('onChange')).not.toBe(finalFormInputMock.onChange)
  })

  test('active when meta.active', () => {
    const wrapper = shallow(
      <SendAmountField
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
      <SendAmountField
        input={finalFormInputMock}
      />,
    )

    const wrapEl = wrapper.find('div.wrap')
    expect(wrapEl.hasClass('active')).toBe(true)
  })

  test('set focus on label click', () => {
    const wrapper = mount(
      <SendAmountField
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
