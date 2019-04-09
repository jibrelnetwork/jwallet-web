// @flow

import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

jest.mock('../../../utils/sprite/spriteUI', () => ({
  keys: () => [],
}))

jest.mock('../../../utils/sprite/spriteAssets', () => ({
  keys: () => [],
}))

// eslint-disable-next-line import/first
import { PasswordInput } from '../PasswordInput'

describe('PasswordInput', () => {
  test('is available', () => {
    expect(PasswordInput).toBeDefined()
  })

  test('renders (with fetching status)', () => {
    const handleChange = sinon.spy()

    const wrapper = shallow(
      <PasswordInput
        onChange={handleChange}
        value=''
        label='Label'
        infoMessage=''
        errorMessage=''
        name='password'
        theme='white-indicator'
        isAutoFocus
      />,
    )

    expect(wrapper.children()).toHaveLength(3)

    const componentInstance = wrapper.instance()

    expect(componentInstance.state.isHidden).toBe(true)

    const inputField = wrapper.children().first()

    expect(inputField.prop('onChange')).toBe(handleChange)
    expect(inputField.prop('value')).toBe('')
    expect(inputField.prop('label')).toBe('Label')
    expect(inputField.prop('infoMessage')).toBe('')
    expect(inputField.prop('errorMessage')).toBe('')
    expect(inputField.prop('name')).toBe('password')
    expect(inputField.prop('type')).toBe('password')
    expect(inputField.prop('theme')).toBe('white-indicator')
    expect(inputField.prop('isAutoFocus')).toBe(true)

    const iconOff = wrapper.childAt(1).children().first()

    expect(iconOff.prop('name')).toBe('visibility-off-use-fill')

    const iconOn = wrapper.children().last().children().first()

    expect(iconOn.prop('name')).toBe('visibility-on-use-fill')

    componentInstance.handleClick()

    const inputFieldText = wrapper.update().children().first()

    expect(inputFieldText.prop('type')).toBe('text')
  })
})
