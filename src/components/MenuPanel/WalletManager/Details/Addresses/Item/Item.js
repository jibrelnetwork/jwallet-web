// @flow

import React from 'react'

import JRadio from 'components/base/JRadio'
import getShortenedAddress from 'utils/wallets/getShortenedAddress'
import MenuPanelWalletManagerDetailsAddressWithName from '../AddressWithName'

const SYMBOLS_FROM_START = 8
const SYMBOLS_FROM_END = 6

type Props = {|
  +address: string,
  +addressName: string,
|}

function MenuPanelWalletManagerDetailsAddressesItem({
  address,
  addressName,
}: Props) {
  const shortAddress = getShortenedAddress(address, SYMBOLS_FROM_START, SYMBOLS_FROM_END)

  return (
    <div className='menu-panel-wallet-manager-details-addresses-item' key={address}>
      <JRadio
        onChange={console.log()}
        label={addressName ? (
          <MenuPanelWalletManagerDetailsAddressWithName
            address={shortAddress}
            addressName={addressName}
          />
        ) : (
          shortAddress
        )}
        name={address}
      />
    </div>
  )
}

export default MenuPanelWalletManagerDetailsAddressesItem
