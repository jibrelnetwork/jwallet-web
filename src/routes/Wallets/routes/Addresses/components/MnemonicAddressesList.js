// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'

import MnemonicAddress from './MnemonicAddress'

const MnemonicAddressesList = ({
  setActive,
  addresses,
  balances,
}: Props) => (
  <div className='mnemonic-addresses-list'>
    {addresses.map((address, index) => (
      <div key={index} className='address'>
        <MnemonicAddress
          onClick={handle(setActive)(index)}
          address={address}
          balance={balances[address]}
          index={index}
        />
      </div>
    ))}
  </div>
)

type Props = {
  setActive: (addressIndex: Index) => Dispatch,
  addresses: Addresses,
  balances: Balances,
}

MnemonicAddressesList.defaultProps = {
  setActive: () => {},
  addresses: [],
  balances: {},
}

export default MnemonicAddressesList
