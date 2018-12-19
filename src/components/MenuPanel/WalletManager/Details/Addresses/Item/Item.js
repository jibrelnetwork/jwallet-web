// @flow

import React from 'react'

import JRadio from 'components/base/JRadio'
import getShortenedAddress from 'utils/wallets/getShortenedAddress'
import MenuPanelWalletManagerDetailsAddressWithName from '../AddressWithName'

const SYMBOLS_FROM_START = 8
const SYMBOLS_FROM_END = 6

type Props = {|
  +setActive: () => void,
  +address: string,
  +addressName: ?string,
  +isActive: boolean,
|}

function MenuPanelWalletManagerDetailsAddressesItem({
  setActive,
  address,
  addressName,
  isActive,
}: Props) {
  const shortAddress = getShortenedAddress(address, SYMBOLS_FROM_START, SYMBOLS_FROM_END)

  return (
    <div className='menu-panel-wallet-manager-details-addresses-item' key={address}>
      <JRadio
        onChange={setActive}
        label={!addressName ? shortAddress : (
          <MenuPanelWalletManagerDetailsAddressWithName
            address={shortAddress}
            addressName={addressName}
          />
        )}
        name={address}
        isChecked={isActive}
      />
    </div>
  )
}

export default MenuPanelWalletManagerDetailsAddressesItem
