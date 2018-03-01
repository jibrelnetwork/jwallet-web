// @flow

import React from 'react'

import MnemonicAddress from './MnemonicAddress'

const MnemonicAddresses = ({
  setActive,
  getMore,
  addresses,
  balances,
}: Props) => (
  <div className='mnemonic-addresses-view'>
    {addresses.map((address, index) => (
      <MnemonicAddress
        key={index}
        setActive={setActive}
        address={address}
        balance={balances[address]}
        index={index}
      />
    ))}
    <div onClick={getMore}>{'Get more'}</div>
  </div>
)

type Props = {
  setActive: (addressIndex: Index) => Dispatch,
  getMore: () => Dispatch,
  addresses: Addresses,
  balances: Balances,
}

export default MnemonicAddresses
