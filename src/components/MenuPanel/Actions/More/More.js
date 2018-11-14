// @flow

import React from 'react'
import classNames from 'classnames'

import MenuPanelActionsItem from '../Item'

type Props = {|
  +toggle: () => void,
  +children: React$Node,
  +isActive: boolean,
|}

function MenuPanelActionsMore({
  toggle,
  children,
  isActive,
}: Props) {
  return (
    <div className={classNames('menu-panel-actions-more', isActive && '-active')}>
      <div className='label'>
        <MenuPanelActionsItem
          onClick={toggle}
          label={`${isActive ? 'Less' : 'More'} actions`}
          icon='star'
        />
      </div>
      <div className='body'>
        <div className='separator' />
        {children}
      </div>
    </div>
  )
}

export default MenuPanelActionsMore
