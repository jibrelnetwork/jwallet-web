// @flow

import React from 'react'

import MenuPanel from 'components/MenuPanel'

const MenuLayout = ({ children }: Props) => (
  <div className='menu-layout'>
    <div className='aside'>
      <MenuPanel />
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
)

type Props = {
  children?: Object,
}

MenuLayout.defaultProps = {
  children: null,
}

export default MenuLayout
