// @flow

import React, { Component } from 'react'

import { JLogo } from 'components/base'

class WalletHeader extends Component<*> {
  render() {
    return (
      <div className='wallet-header'>
        <div className='logo'>
          <JLogo />
        </div>
      </div>
    )
  }
}

export default WalletHeader
