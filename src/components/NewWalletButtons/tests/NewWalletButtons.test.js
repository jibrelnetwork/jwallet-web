// @flow strict

import React from 'react'
import sinon from 'sinon'
import { shallow } from 'enzyme'

import { ACTIONS } from 'pages/WalletsStart/WalletsStart'

jest.mock('react-router5', () => ({
  withRouter: function withRouter(BaseComponent) {
    const ReactForMock = require('react')

    return function WithRouter(props) {
      return ReactForMock.createElement(
        BaseComponent, {
          ...props,
          router: {
            matchUrl: () => null,
          },
        },
      )
    }
  },
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
import { NewWalletButtons } from '../NewWalletButtons'

const MOCK_EVENT = { preventDefault: () => {} }

describe('NewWalletButtons', () => {
  test('is available', () => {
    expect(NewWalletButtons).toBeDefined()
  })

  test('renders (with fetching status)', () => {
    const handleClick = sinon.spy()

    const wrapper = shallow(<NewWalletButtons onClick={handleClick} />)

    expect(wrapper.children()).toHaveLength(4)
    expect(wrapper.hasClass('__new-wallet-buttons core')).toBe(true)

    const componentInstance = wrapper.instance()

    const createLink = wrapper.childAt(0)

    // $FlowFixMe
    componentInstance.handleClick(ACTIONS.CREATE)(MOCK_EVENT)
    expect(handleClick.calledWith(ACTIONS.CREATE)).toBe(true)
    expect(createLink.prop('href')).toBe('/wallets/create')
    expect(createLink.prop('className')).toBe('create')

    const createHint = wrapper.childAt(1)

    expect(createHint.hasClass('text')).toBe(true)
    expect(createHint.text()).toBe('Create your own wallet to manage your digital assets')

    const importLink = wrapper.childAt(2)

    // $FlowFixMe
    componentInstance.handleClick(ACTIONS.IMPORT)(MOCK_EVENT)
    expect(handleClick.calledWith(ACTIONS.IMPORT)).toBe(true)
    expect(importLink.prop('href')).toBe('/wallets/import')
    expect(importLink.prop('className')).toBe('import')

    const importHint = wrapper.childAt(3)

    expect(importHint.hasClass('text')).toBe(true)

    expect(importHint.text()).toBe(
      'Import an existing wallet with backup phrase, private key, etc.',
    )
  })
})
