// @flow

import React from 'react'

import Menu from 'components/__new__/Menu'

const MenuLayout = ({ children }: Props) => (
  <div className='menu-layout'>
    <Menu />
    <div className='container'>{children}</div>
  </div>
)

type Props = {
  children?: Object,
}

MenuLayout.defaultProps = {
  children: null,
}

export default MenuLayout
