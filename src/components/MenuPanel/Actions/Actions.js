// @flow

import React from 'react'

import MenuPanelActionsItem from './Item'

// eslint-disable-next-line max-len
const JCASH_UTM_URL = 'https://jcash.network?utm_source=jwallet&utm_medium=internal_link&utm_campaign=jibrel_projects_promo&utm_content=convert_assets'

function MenuPanelActions() {
  return (
    <div className='menu-panel-actions'>
      <MenuPanelActionsItem icon='download' label='Receive asset' path='/digital-assets/receive' />
      <MenuPanelActionsItem icon='refresh' label='Convert assets' path={JCASH_UTM_URL} />
      <MenuPanelActionsItem icon='star' label='Favorites' path='/favorites' />
      <MenuPanelActionsItem icon='setting' label='Settings' path='/settings' />
    </div>
  )
}

export default MenuPanelActions
