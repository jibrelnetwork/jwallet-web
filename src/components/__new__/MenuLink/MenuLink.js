// @flow

import React from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

import { JIcon, JText } from 'components/base/__new__'

const MenuLink = ({ path, icon, disabled }: Props) => (
  <Link to={path} className={classNames('menu-link', { '-disabled': disabled })}>
    <JIcon name='menu-bg' size='medium' />
    <JIcon name={`menu-${icon}`} size='small' />
    <JText value={`menu.${icon}`} variants={['white', 'small', 'bold', 'uppercase']} />
  </Link>
)

type Props = {
  path: string,
  icon: string,
  disabled?: boolean
}

MenuLink.defaultProps = {
  disabled: false,
}

export default MenuLink
