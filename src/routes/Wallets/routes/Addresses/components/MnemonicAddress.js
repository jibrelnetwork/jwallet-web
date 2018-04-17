// @flow

import React from 'react'

import JText from 'components/base/JText'

const MnemonicAddress = ({ address, balance, onClick }: Props) => (
  <div
    onClick={onClick}
    className='mnemonic-address'
  >
    <div className='address'>
      <JText value={address} weight='bold' />
    </div>
    <div className='balance'>
      <JText
        value={((balance === undefined) || (balance === null))
          ? 'Loading'
          : `${balance.toFixed(3)} ETH`}
        weight='bold'
      />
    </div>
  </div>
)

type Props = {
  onClick: Function,
  address: ?Address,
  balance: ?number,
}

MnemonicAddress.defaultProps = {
  onClick: () => {},
  address: null,
  balance: undefined,
}

export default MnemonicAddress
