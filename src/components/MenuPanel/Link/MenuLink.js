// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'
import { JIcon, JText } from 'react-components'

const MenuLink = ({ path, icon, isDisabled }: Props) => (
  <Link to={path} className={classNames('menu-link', isDisabled && '-disabled')}>
    <div className='icon'>
      <div className='bg'>
        <JIcon name='menu-bg' size='medium' color='white' />
      </div>
      <div className='type'>
        <JIcon name={`menu-${icon}`} size='small' color='white' />
      </div>
    </div>
    <div className='text'>
      <JText value={i18n(`menu.${icon}`)} size='small' weight='bold' fontCase='upper' />
    </div>
  </Link>
)

type Props = {
  path: string,
  icon: string,
  isDisabled: boolean
}

export default MenuLink
