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
      <MenuPanelActionsItem
        icon='plus'
        path='/wallets/create'
        label='Add new wallet'
      />
    </div>
  )
}

export default MenuPanelWalletManagerDetailsActions
