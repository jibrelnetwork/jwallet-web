// @flow

import React from 'react'
import sinon from 'sinon'
import Promise from 'bluebird'
import { shallow } from 'enzyme'

jest.mock('../../../utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../../../utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))

// eslint-disable-next-line import/first
import { PasswordField } from '../PasswordField'

describe('PasswordField', () => {
  test('is available', () => {
    expect(PasswordField).toBeDefined()
  })

  test('renders (indicator fetching status)', async () => {
    const onChange = sinon.spy()
    const onChangeConfirm = sinon.spy()
    const password = 'super'

    const wrapper = shallow(
      <PasswordField
        onChange={onChange}
        onChangeConfirm={onChangeConfirm}
        invalidFields={{}}
        value=''
        valueConfirm=''
        placeholder='Placeholder'
        placeholderConfirm='Placeholder Confirm'
      />,
    )

    const componentInstance = wrapper.instance()

    expect(componentInstance.props.onChange).toBe(onChange)
    expect(componentInstance.props.onChangeConfirm).toBe(onChangeConfirm)
    expect(componentInstance.props.invalidFields).toEqual({})
    expect(componentInstance.props.color).toBe('white')
    expect(componentInstance.props.value).toBe('')
    expect(componentInstance.props.valueConfirm).toBe('')
    expect(componentInstance.props.placeholder).toBe('Placeholder')
    expect(componentInstance.props.placeholderConfirm).toBe('Placeholder Confirm')
    expect(componentInstance.props.isDisabled).toBe(false)
    expect(componentInstance.props.isAutoFocus).toBe(false)

    expect(componentInstance.state.passwordResult).toBe(null)
    expect(componentInstance.state.isFetching).toBe(false)
    expect(componentInstance.state.isInitialised).toBe(false)

    expect(wrapper.children()).toHaveLength(3)

    const passwordInput = wrapper.children().first()

    expect(passwordInput.prop('onChange')).toBe(componentInstance.handleChange)
    expect(passwordInput.prop('value')).toBe('')
    expect(passwordInput.prop('color')).toBe('white')
    expect(passwordInput.prop('type')).toBe('password')
    expect(passwordInput.prop('name')).toBe('password')
    expect(passwordInput.prop('infoMessage')).toBe(null)
    expect(passwordInput.prop('errorMessage')).toBe(null)
    expect(passwordInput.prop('placeholder')).toBe('Placeholder')
    expect(passwordInput.prop('isDisabled')).toBe(false)
    expect(passwordInput.prop('isAutoFocus')).toBe(false)
    expect(passwordInput.prop('withIndicator')).toBe(true)

    const indicator = wrapper.childAt(1)

    expect(indicator.prop('status')).toBe(null)
    expect(indicator.prop('fieldColor')).toBe('white')

    const passwordConfirmInput = wrapper.children().last()

    expect(passwordConfirmInput.prop('onChange')).toBe(onChangeConfirm)
    expect(passwordConfirmInput.prop('value')).toBe('')
    expect(passwordConfirmInput.prop('color')).toBe('white')
    expect(passwordConfirmInput.prop('type')).toBe('password')
    expect(passwordConfirmInput.prop('name')).toBe('password-confirm')
    expect(passwordConfirmInput.prop('errorMessage')).toBe(null)
    expect(passwordConfirmInput.prop('placeholder')).toBe('Placeholder Confirm')
    expect(passwordConfirmInput.prop('isDisabled')).toBe(false)

    componentInstance.handleChange(password)
    expect(onChange.calledWith(password)).toBe(true)
    expect(componentInstance.state.isFetching).toBe(true)
    const indicatorFetching = wrapper.update().childAt(1)
    expect(indicatorFetching.prop('status')).toBe('fetching')

    const passwordGreen = 'super secret p@swd'

    await expect(componentInstance.setCheckingPasswordResult(passwordGreen)).resolves

    // wait while module is loaded and all setState calls completed
    await Promise.delay(2000)

    const indicatorGreen = wrapper.update().childAt(1)
    expect(componentInstance.state.isFetching).toBe(false)
    expect(componentInstance.state.isInitialised).toBe(true)
    expect(componentInstance.state.passwordResult).not.toBeNull()
    // $FlowFixMe
    expect(componentInstance.state.passwordResult.score).toBe(4)
    // $FlowFixMe
    expect(componentInstance.state.passwordResult.feedback.warning).toBe('')
    // $FlowFixMe
    expect(componentInstance.state.passwordResult.feedback.suggestions).toEqual([])
    expect(indicatorGreen.prop('status')).toBe('green')
    expect(componentInstance.getInfoMessage()).toBe('Not bad')
  })
})
