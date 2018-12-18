// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import handle from 'utils/eventHandlers/handle'
import MenuPanelActionsItem from '../../../Actions/Item'
import MenuPanelWalletManagerDetailsAddressesItem from './Item'

type Props = {|
  +getMoreAddresses: () => void,
  +setActiveAddress: (Index) => void,
  +addresses: Address[],
  +addressNames: AddressNames,
  +currentAddressIndex: ?Index,
|}

function MenuPanelWalletManagerDetailsAddresses({
  getMoreAddresses,
  setActiveAddress,
  addresses,
  addressNames,
  currentAddressIndex,
}: Props) {
  return (
    <div className='menu-panel-wallet-manager-details-addresses'>
      <Scrollbars>
        {addresses.map((item: Address, index: Index) => (
          <MenuPanelWalletManagerDetailsAddressesItem
            setActive={handle(setActiveAddress)(index)}
            address={item}
            addressName={addressNames[item]}
            key={item}
            isActive={currentAddressIndex === index}
          />
        ))}
        <MenuPanelActionsItem
          onClick={getMoreAddresses}
          icon='plus'
          label='Add more addresses'
        />
      </Scrollbars>
    </div>
  )
}

export default MenuPanelWalletManagerDetailsAddresses
