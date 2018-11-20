// @flow

import React from 'react'

import JText from 'components/base/JText'

type Props = {|
  +address: string,
  +addressName: string,
|}

function MenuPanelWalletManagerDetailsAddressWithName({
  address,
  addressName,
}: Props) {
  return (
    <div className='menu-panel-wallet-manager-details-address-with-name'>
      <div className='name'>
        <JText
          color='white'
          size='normal'
          value={addressName}
          weight='bold'
          whiteSpace='wrap'
        />
      </div>
      <div className='address'>
        <JText
          color='white'
          size='small'
          value={address}
          whiteSpace='wrap'
        />
      </div>
    </div>
  )
}

export default MenuPanelWalletManagerDetailsAddressWithName
