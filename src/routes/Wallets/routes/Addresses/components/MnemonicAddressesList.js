// @flow

import React from 'react'

import handle from 'utils/handle'
import DerivedAddress from 'components/__new__/DerivedAddress'

const MnemonicAddressesList = ({
  setActive,
  addresses,
  balances,
}: Props) => (
  <div className='mnemonic-addresses-list'>
    {addresses.map((address, index) => (
      <div key={index} className='address'>
        <DerivedAddress
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

export default MnemonicAddressesList
