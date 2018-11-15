// @flow

import React from 'react'

import MenuPanel from 'components/MenuPanel'

type Props = {|
  +items: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +children: React$Node,
  +activeWalletId: ?WalletId,
|}

const MenuLayout = ({
  items,
  addresses,
  addressNames,
  children,
  activeWalletId,
}: Props) => (
  <div className='menu-layout'>
    <div className='aside'>
      <MenuPanel
        items={items}
        addresses={addresses}
        addressNames={addressNames}
        activeWalletId={activeWalletId}
      />
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
)

export default MenuLayout
