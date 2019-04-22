import React from 'react'
import { shallow } from 'enzyme'

import { NetworkView } from '../components/Network'

describe('Network notice on menu panel', () => {
  it('is available', () => {
    expect(NetworkView).toBeDefined()
  })

  it('renders nothing if no network is specified', () => {
    expect(shallow(
      <NetworkView />,
    ).type()).toBeNull()
  })

  it('renders if network is specified', () => {
    expect(shallow(
      <NetworkView
        networkId='ropsten'
      />,
    ).type()).not.toBeNull()
  })
})
