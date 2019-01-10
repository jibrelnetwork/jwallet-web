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
      <MenuPanelActionsItem icon='refresh' label='Convert assets' path='https://jcash.network' />
      <MenuPanelActionsItem icon='star' label='Favorites' path='/favorites' />
      <MenuPanelActionsItem icon='setting' label='Settings' path='/settings' />
      <MenuPanelActionsMore toggle={toggle} isActive={isActive}>
        <MenuPanelActionsItem icon='back-up' label='Backup wallet' path='/settings/backup' />
      </MenuPanelActionsMore>
    </div>
  )
}

export default MenuPanelActions
