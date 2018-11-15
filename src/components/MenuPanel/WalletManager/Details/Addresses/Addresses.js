// @flow

import React from 'react'

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
      {}
    </div>
  )
}

export default MenuPanelWalletManagerDetailsAddresses
