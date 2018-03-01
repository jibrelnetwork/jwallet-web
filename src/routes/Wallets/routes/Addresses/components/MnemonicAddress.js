// @flow

import React from 'react'

import handle from 'utils/handle'

const MnemonicAddress = ({
  setActive,
  address,
  balance,
  index,
}: Props) => (
  <div
    onClick={handle(setActive)(index)}
    style={{ marginBottom: '20px', display: 'flex' }}
    className='mnemonic-address'
  >
    <div className='address' style={{ marginRight: '20px' }}>
      {address}
    </div>
    <div className='balance'>
      {(balance === undefined) ? 'Loading' : balance.toFixed(3)}
    </div>
  </div>
)

type Props = {
  setActive: (addressIndex: Index) => Dispatch,
  address: Address,
  balance: number,
  index: Index,
}

export default MnemonicAddress
