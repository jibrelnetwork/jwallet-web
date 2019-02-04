// @flow

import React from 'react'

import {
  getWallet,
  getAddress,
} from 'utils/wallets'

import MenuPanelWalletManagerMain from './Main'
import MenuPanelWalletManagerDetails from './Details'

type Props = {|
  +toggle: () => void,
  +getMoreAddresses: () => void,
  +setActiveAddress: (Index) => void,
  +items: Wallets,
  +addresses: Address[],
  +addressNames: AddressNames,
  +activeWalletId: ?WalletId,
  +isActive: boolean,
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
}: Props) {
  if (!activeWalletId) {
    return null
  }

  const wallet: Wallet = getWallet(items, activeWalletId)
  const address: Address = getAddress(items, activeWalletId)

  const {
    type,
    name,
    isReadOnly,
    addressIndex,
    isSimplified,
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
        isSimplified={!!isSimplified}
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
        isSimplified={!!isSimplified}
      />
    </div>
  )
}

export default MenuPanelWalletManager
