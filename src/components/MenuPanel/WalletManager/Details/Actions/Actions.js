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
        icon='lock'
        path='#'
        label='Lock the app'
      />
      <MenuPanelActionsItem
        icon='plus'
        path='#'
        label='Add new wallet'
      />
      <MenuPanelActionsItem
        icon='password'
        path='#'
        label='Enable PIN'
      />
    </div>
  )
}

export default MenuPanelWalletManagerDetailsActions
