// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'

import WalletFace from '../../../components/WalletFace'

const MnemonicAddressesList = ({ setActive, addresses, isReadOnly }: Props) => (
  <div className='mnemonic-addresses-list'>
    {addresses.map((address, index) => (
      <div key={address} className='address'>
        <WalletFace
          onClick={handle(setActive)(index)}
          description={address}
          title={`Address #${index + 1}`}
          iconName={`private-key${isReadOnly ? '-read' : ''}`}
        />
      </div>
    ))}
  </div>
)

type Props = {
  setActive: Function,
  addresses: Addresses,
  isReadOnly: boolean,
}

export default MnemonicAddressesList
