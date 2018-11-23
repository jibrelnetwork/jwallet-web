// @flow

import React from 'react'

import keystore from 'services/keystore'
import getWallet from 'utils/wallets/getWallet'

import MenuPanelWalletManagerMain from './Main'
import MenuPanelWalletManagerDetails from './Details'

type Props = {|
  +toggle: () => void,
  +getMoreAddresses: () => void,
  +setActiveAddress: (Index) => void,
  +items: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +activeWalletId: ?WalletId,
  +isActive: boolean,
  +isReadOnly: boolean,
|}

function MenuPanelWalletManager({
  toggle,
  getMoreAddresses,
  setActiveAddress,
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
    addressIndex,
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
        setActiveAddress={setActiveAddress}
        getMoreAddresses={getMoreAddresses}
        addresses={addresses}
        addressNames={addressNames}
        type={type}
        currentAddressIndex={addressIndex}
        isActive={isActive}
        isReadOnly={isReadOnly}
      />
    </div>
  )
}

export default MenuPanelWalletManager
