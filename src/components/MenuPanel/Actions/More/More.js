// @flow

import React from 'react'
import classNames from 'classnames'
import { t } from 'ttag'

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
  const label = isActive
    ? t`Less actions`
    : t`More actions`

  return (
    <div className={classNames('menu-panel-actions-more', isActive && '-active')}>
      <div className='label'>
        <MenuPanelActionsItem
          onClick={toggle}
          label={label}
          icon='dots-border'
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
