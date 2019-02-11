// @flow

import React from 'react'
import { t } from 'ttag'

import MenuPanelActionsItem from '../../../Actions/Item'

function MenuPanelWalletManagerDetailsActions() {
  return (
    <div className='menu-panel-wallet-manager-details-actions'>
      <MenuPanelActionsItem
        icon='setting'
        path='/wallets'
        label={t`Manage wallets`}
      />
    </div>
  )
}

export default MenuPanelWalletManagerDetailsActions
