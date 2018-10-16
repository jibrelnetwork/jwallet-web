// @flow

import React from 'react'

import JLogo from 'components/base/JLogo'
import RoundIconButton from 'components/RoundIconButton'

const WalletHeader = ({ goToLanding }: Props) => (
  <div className='wallet-header'>
    <div className='content'>
      <JLogo />
      <div className='button'>
        <RoundIconButton onClick={goToLanding} iconName='padding-cross' color='white' />
      </div>
    </div>
  </div>
)

type Props = {
  goToLanding: Function,
}

WalletHeader.defaultProps = {
  goToLanding: () => {},
}

export default WalletHeader
