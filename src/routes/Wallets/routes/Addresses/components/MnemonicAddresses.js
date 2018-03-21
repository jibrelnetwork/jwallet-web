// @flow

import React from 'react'

import JButton from 'components/base/__new__/JButton'

import MnemonicAddress from './MnemonicAddress'

const MnemonicAddresses = ({
  setActive,
  getMore,
  addresses,
  balances,
}: Props) => (
  <div className='content'>
    <div className='form'>
      {addresses.map((address, index) => (
        <MnemonicAddress
          key={index}
          setActive={setActive}
          address={address}
          balance={balances[address]}
          index={index}
        />
      ))}
      <div className='actions'>
        <JButton
          onClick={getMore}
          text='Get more'
          color='blue'
        />
      </div>
    </div>
  </div>
)

type Props = {
  setActive: (addressIndex: Index) => Dispatch,
  getMore: () => Dispatch,
  addresses: Addresses,
  balances: Balances,
}

export default MnemonicAddresses
