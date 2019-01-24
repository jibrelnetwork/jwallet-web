// @flow

import React from 'react'

import MenuPanelActionsItem from '../../../Actions/Item'

function MenuPanelWalletManagerDetailsActions() {
  return (
    <div className='menu-panel-wallet-manager-details-actions'>
      <MenuPanelActionsItem
        icon='setting'
        path='/wallets'
        label='Manage wallets'
      />
    </div>
  )
}

export default MenuPanelWalletManagerDetailsActions
