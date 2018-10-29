// @flow

import React, { Component } from 'react'

import config from 'config'
import JLogo from 'components/base/JLogo'
import RoundIconButton from 'components/RoundIconButton'

class WalletHeader extends Component<*> {
  goToLanding = () => {
    window.location.href = config.landingURL
  }

  render() {
    return (
      <div className='wallet-header'>
        <div className='logo'>
          <JLogo />
        </div>
        <div className='button'>
          <RoundIconButton
            onClick={this.goToLanding}
            color='white'
            iconName='padding-cross'
          />
        </div>
      </div>
    )
  }
}

export default WalletHeader
