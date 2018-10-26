// @flow

import React from 'react'

import WalletFace from 'components/WalletFace'
import handle from 'utils/eventHandlers/handle'
import getShortenedAddress from 'utils/wallets/getShortenedAddress'

type Props = {|
  +renameAddress: () => void,
  +setActive: (addressIndex: Index) => void,
  +addresses: Addresses,
  +isReadOnly: boolean,
|}

const MnemonicAddresses = ({
  setActive,
  renameAddress,
  addresses,
  isReadOnly,
}: Props) => (
  <div className='mnemonic-addresses'>
    {addresses.map((address, index) => (
      <div key={address} className='address'>
        <WalletFace
          rename={renameAddress}
          onClick={handle(setActive)(index)}
          title={`Address #${index + 1}`}
          description={getShortenedAddress(address)}
          iconName='binding'
          isReadOnly={isReadOnly}
          hasActions
        />
      </div>
    ))}
  </div>
)

export default MnemonicAddresses
