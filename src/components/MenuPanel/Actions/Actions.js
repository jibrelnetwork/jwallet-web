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
      <MenuPanelActionsItem icon='star' label='Receive asset' path='/digital-assets/receive' />
      <MenuPanelActionsItem icon='star' label='Convert assets' path='//jcash.network' />
      <MenuPanelActionsItem icon='star' label='Favourites' path='/favourites' />
      <MenuPanelActionsItem icon='star' label='Settings' path='/settings' />
      <MenuPanelActionsMore toggle={toggle} isActive={isActive}>
        <MenuPanelActionsItem icon='star' label='Sign a message' path='/signature/sign' />
        <MenuPanelActionsItem icon='star' label='Check a signature' path='/signature/check' />
        <MenuPanelActionsItem icon='star' label='Enable PIN' path='/settings/set-pin' />
        <MenuPanelActionsItem icon='star' label='Backup wallet' path='/settings/backup' />
      </MenuPanelActionsMore>
    </div>
  )
}

export default MenuPanelActions
