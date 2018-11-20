// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import MenuPanelWalletManagerDetailsAddressesItem from './Item'

type Props = {|
  +setActiveAddress: () => void,
  +addresses: Addresses,
  +addressNames: AddressNames,
|}

function MenuPanelWalletManagerDetailsAddresses({
  setActiveAddress,
  addresses,
  addressNames,
}: Props) {
  console.log(setActiveAddress)
  console.log(addresses)
  console.log(addressNames)

  return (
    <div className='menu-panel-wallet-manager-details-addresses'>
      <Scrollbars>
        {addresses.map(item => (
          <MenuPanelWalletManagerDetailsAddressesItem
            address={item}
            addressName={addressNames[item]}
            key={item}
          />
        ))}
      </Scrollbars>
    </div>
  )
}

export default MenuPanelWalletManagerDetailsAddresses
