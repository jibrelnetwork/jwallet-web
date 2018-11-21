// @flow

import React from 'react'

import keystore from 'services/keystore'
import getWallet from 'utils/wallets/getWallet'

import MenuPanelWalletManagerMain from './Main'
import MenuPanelWalletManagerDetails from './Details'

type Props = {|
  +toggle: () => void,
  +items: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +activeWalletId: ?WalletId,
  +isActive: boolean,
  +isReadOnly: boolean,
|}

function MenuPanelWalletManager({
  toggle,
  items,
  addresses,
  addressNames,
  activeWalletId,
  isActive,
  isReadOnly,
}: Props) {
  if (!activeWalletId) {
    return null
  }

  const wallet: ?Wallet = getWallet(items, activeWalletId)
  const address: ?Address = keystore.getAddress(items, activeWalletId)

  if (!(wallet && address)) {
    return null
  }

  const {
    type,
    name,
  }: Wallet = wallet

  return (
    <div className='menu-panel-wallet-manager'>
      <MenuPanelWalletManagerMain
        toggle={toggle}
        type={type}
        name={name}
        address={address}
        isActive={isActive}
        isReadOnly={isReadOnly}
      />
      <MenuPanelWalletManagerDetails
        setActiveAddress={console.log}
        addresses={addresses}
        addressNames={addressNames}
        type={type}
        isActive={isActive}
        isReadOnly={isReadOnly}
      />
    </div>
  )
}

export default MenuPanelWalletManager
