// @flow strict

import React from 'react'
import sinon from 'sinon'
import { mountWithIntl } from '.enzyme/lingui-helper.js'

import { ACTIONS } from 'pages/WalletsStart/constants'

import { NewWalletButtons } from '../NewWalletButtons'

const MOCK_EVENT = { preventDefault: () => {} }

describe('NewWalletButtons', () => {
  test('is available', () => {
    expect(NewWalletButtons).toBeDefined()
  })

  test('sends valid action through onClick property', () => {
    const handleClick = sinon.spy()

    const wrapper = mountWithIntl(<NewWalletButtons onClick={handleClick} />)

    expect(wrapper.find('a.__create-button')).toHaveLength(1)
    wrapper.find('a.__create-button').simulate('click', MOCK_EVENT)

    expect(handleClick).toHaveProperty('callCount', 1)
    expect(handleClick.calledWith(ACTIONS.CREATE)).toBe(true)

    expect(wrapper.find('a.__import-button')).toHaveLength(1)
    wrapper.find('a.__import-button').simulate('click', MOCK_EVENT)

    expect(handleClick).toHaveProperty('callCount', 2)
    expect(handleClick.calledWith(ACTIONS.IMPORT)).toBe(true)
  })
})
