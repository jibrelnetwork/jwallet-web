// @flow strict

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

jest.mock('../../../workers/scrypt/worker', () => class MOCK_WORKER {
  onerror: ?Function
  onmessage: ?Function

  constructor() {
    this.onerror = null
    this.onmessage = null
  }

  terminate = () => {}

  postMessage = (msgData: Object) => {
    const self = this

    const {
      taskId,
      taskName,
    } = msgData

    switch (taskName) {
      case 'deriveKeyFromPassword': {
        if (self.onmessage) {
          return
        }

        // $FlowFixMe
        self.onmessage({
          data: {
            taskId,
            payload: new Uint8Array(Buffer.from('')),
          },
        })

        break
      }

      default:
        break
    }
  }
})

// eslint-disable-next-line import/first
import { NewPasswordField } from '../NewPasswordField'

describe('NewPasswordField', () => {
  test('is available', () => {
    expect(NewPasswordField).toBeDefined()
  })

  test('renders (indicator fetching status)', async () => {
    const handleChange = sinon.spy()
    const handleScoreChange = sinon.spy()
    const password = 'super'
    const values = {
      password: '',
      passwordConfirm: '',
    }

    const wrapper = shallow(
      <NewPasswordField
        onChange={handleChange}
        onScoreChange={handleScoreChange}
        values={values}
        label='Label'
      />,
    )

    const componentInstance = wrapper.instance()

    expect(componentInstance.props.onChange).toBe(handleChange)
    expect(componentInstance.props.onScoreChange).toBe(handleScoreChange)
    expect(componentInstance.props.values).toBe(values)
    expect(componentInstance.props.label).toBe('Label')
    expect(componentInstance.props.isDisabled).toBe(false)
    expect(componentInstance.props.isAutoFocus).toBe(false)

    expect(componentInstance.state.passwordResult).toBe(null)
    expect(componentInstance.state.isFetching).toBe(false)
    expect(componentInstance.state.isInitialised).toBe(false)

    expect(wrapper.children()).toHaveLength(3)

    const passwordInput = wrapper.children().first()

    expect(passwordInput.prop('onChange')).toBe(componentInstance.handleChange)
    expect(passwordInput.prop('value')).toBe('')
    expect(passwordInput.prop('name')).toBe('password')
    expect(passwordInput.prop('infoMessage')).toBe(null)
    expect(passwordInput.prop('errorMessage')).toBe(null)
    expect(passwordInput.prop('label')).toBe('Label')
    expect(passwordInput.prop('theme')).toBe('white-indicator')
    expect(passwordInput.prop('isDisabled')).toBe(false)
    expect(passwordInput.prop('isAutoFocus')).toBe(false)

    const indicator = wrapper.childAt(1)

    expect(indicator.prop('status')).toBe(null)

    const passwordConfirmInput = wrapper.children().last()

    expect(passwordConfirmInput.prop('value')).toBe('')
    expect(passwordConfirmInput.prop('theme')).toBe('white-icon')
    expect(passwordConfirmInput.prop('name')).toBe('passwordConfirm')
    expect(passwordConfirmInput.prop('label')).toBe('Repeat Security Password')
    expect(passwordConfirmInput.prop('isDisabled')).toBe(false)

    // $FlowFixMe
    componentInstance.handleChange({ target: { value: password } })
    expect(handleChange.calledWith('password', password)).toBe(true)
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
    expect(componentInstance.getMessage()).toBe('Not bad')
  })
})
