// @flow

import React from 'react'
import { JLogo } from 'react-components'

import RoundIconButton from 'components/RoundIconButton'

const WalletHeader = ({ goToLanding }: Props) => (
  <div className='wallet-header'>
    <div className='content'>
      <JLogo />
      <div className='button'>
        <RoundIconButton onClick={goToLanding} iconName='arrow-header' color='white' />
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
