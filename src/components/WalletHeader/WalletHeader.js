// @flow

import React from 'react'

import JLogo from 'components/base/JLogo'
import RoundIconButton from 'components/RoundIconButton'

const WalletHeader = ({ goToLanding }: Props) => (
  <div className='wallet-header' >
    <JLogo />
    <RoundIconButton onClick={goToLanding} iconName='arrow-header' />
  </div>
)

type Props = {
  goToLanding: Function,
}

WalletHeader.defaultProps = {
  goToLanding: null,
}

export default WalletHeader
