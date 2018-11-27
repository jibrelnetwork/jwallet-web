// @flow

import React from 'react'

import MenuPanelActionsItem from './Item'
import MenuPanelActionsMore from './More'

type Props = {|
  +toggle: () => void,
  +isActive: boolean,
|}

function MenuPanelActions({
  toggle,
  isActive,
}: Props) {
  return (
    <div className='menu-panel-actions'>
      <MenuPanelActionsItem icon='download' label='Receive asset' path='/digital-assets/receive' />
      <MenuPanelActionsItem icon='refresh' label='Convert assets' path='//jcash.network' />
      <MenuPanelActionsItem icon='star' label='Favourites' path='/favourites' />
      <MenuPanelActionsItem icon='setting' label='Settings' path='/settings' />
      <MenuPanelActionsMore toggle={toggle} isActive={isActive}>
        <MenuPanelActionsItem icon='message' label='Sign a message' path='/signature/sign' />
        <MenuPanelActionsItem icon='protect' label='Check a signature' path='/signature/check' />
        <MenuPanelActionsItem icon='password' label='Enable PIN' path='/settings/set-pin' />
        <MenuPanelActionsItem icon='back-up' label='Backup wallet' path='/settings/backup' />
      </MenuPanelActionsMore>
    </div>
  )
}

export default MenuPanelActions
