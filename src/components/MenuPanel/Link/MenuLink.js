// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import { JIcon, JText } from 'components/base'

const MenuLink = ({ path, icon, disabled }: Props) => (
  <Link to={path} className={classNames('menu-link', { '-disabled': disabled })}>
    <div className='icon'>
      <div className='bg'>
        <JIcon name='menu-bg' size='medium' />
      </div>
      <div className='type'>
        <JIcon name={`menu-${icon}`} size='small' />
      </div>
    </div>
    <div className='text'>
      <JText value={`menu.${icon}`} variants={['white', 'small', 'bold', 'uppercase']} />
    </div>
  </Link>
)

type Props = {
  path: string,
  icon: string,
  disabled: boolean
}

MenuLink.defaultProps = {
  path: '/',
  icon: 'send',
  disabled: false,
}

export default MenuLink
