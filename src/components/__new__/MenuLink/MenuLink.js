// @flow

import React from 'react'
import { Link } from 'react-router'

import { JIcon, JText } from 'components/base/__new__'

const MenuLink = ({ path, icon }: Props) => (
  <Link to={path} className='menu-link'>
    <JIcon name='menu-bg' size='medium' />
    <JIcon name={`menu-${icon}`} size='small' />
    <JText value={`menu.${icon}`} />
  </Link>
)

type Props = {
  path: string,
  icon: string,
}

export default MenuLink
