// @flow strict

import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import { ACTIONS } from 'pages/WalletsStart/WalletsStart'

import { NewWalletButtons } from '../NewWalletButtons'
import newWalletButtonsStyle from '../newWalletButtons.m.scss'

const MOCK_EVENT = { preventDefault: () => {} }

describe('NewWalletButtons', () => {
  test('is available', () => {
    expect(NewWalletButtons).toBeDefined()
  })

  test('sends valid action through onClick property', () => {
    const handleClick = sinon.spy()

    const wrapper = shallow(<NewWalletButtons onClick={handleClick} />)

    wrapper.find(`.${newWalletButtonsStyle.create}`).simulate('click', MOCK_EVENT)

    expect(handleClick).toHaveProperty('callCount', 1)
    expect(handleClick.calledWith(ACTIONS.CREATE)).toBe(true)

    wrapper.find(`.${newWalletButtonsStyle.import}`).simulate('click', MOCK_EVENT)

    expect(handleClick).toHaveProperty('callCount', 2)
    expect(handleClick.calledWith(ACTIONS.IMPORT)).toBe(true)
  })
})
