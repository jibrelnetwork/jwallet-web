// @flow

import React from 'react'

import {
  // WalletFace,
  WalletLoading,
} from 'components'

type Props = {|
  // +renameAddress: (Address) => void,
  // +setActive: (addressIndex: Index) => void,
  +balances: WalletsBalances,
  +addresses: OwnerAddress[],
  // +addressNames: AddressNames,
  // +walletsAddressNames: AddressNames,
  +isLoading: boolean,
  // +isReadOnly: boolean,
|}

// #FIXME: title={addressName || `Address #${index + 1}`}

const MnemonicAddresses = ({
  // setActive,
  // renameAddress,
  balances,
  addresses,
  // addressNames,
  // walletsAddressNames,
  isLoading,
  // isReadOnly,
}: Props) => (
  <div className='mnemonic-addresses'>
    {addresses.map((address: OwnerAddress) => {
      // const walletName: ?string = walletsAddressNames[address]
      // const addressName: ?string = walletName || addressNames[address]
      const balance: ?string = balances[address]

      if (!balance || (!balance && isLoading)) {
        return <WalletLoading key={address} />
      }

      return (
        <div key={address} className='address'>
          {/*
          <WalletFace
            onClick={handle(setActive)(index)}
            rename={walletName ? null : ignoreEvent(renameAddress)(address)}
            balance={balance}
            description={getShortenedAddress(address)}
            title={addressName || `Address #${index + 1}`}
            iconName='binding'
            isReadOnly={isReadOnly}
            hasActions={!walletName}
          />
          */}
        </div>
      )
    })}
  </div>
)

export default MnemonicAddresses
