// @flow

import React from 'react'

import WalletFace from 'components/WalletFace'
import getShortenedAddress from 'utils/wallets/getShortenedAddress'
import { handle, ignoreEvent } from 'utils/eventHandlers'

type Props = {|
  +renameAddress: (Address) => void,
  +setActive: (addressIndex: Index) => void,
  +addresses: Address[],
  +addressNames: AddressNames,
  +walletsAddressNames: AddressNames,
  +isReadOnly: boolean,
|}

const MnemonicAddresses = ({
  setActive,
  renameAddress,
  addresses,
  addressNames,
  walletsAddressNames,
  isReadOnly,
}: Props) => (
  <div className='mnemonic-addresses'>
    {addresses.map((address, index) => {
      const walletName: ?string = walletsAddressNames[address]
      const addressName: ?string = walletName || addressNames[address]

      return (
        <div key={address} className='address'>
          <WalletFace
            onClick={handle(setActive)(index)}
            rename={walletName ? null : ignoreEvent(renameAddress)(address)}
            description={getShortenedAddress(address)}
            title={addressName || `Address #${index + 1}`}
            iconName='binding'
            isReadOnly={isReadOnly}
            hasActions={!walletName}
          />
        </div>
      )
    })}
  </div>
)

export default MnemonicAddresses
