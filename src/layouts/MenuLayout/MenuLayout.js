// @flow

import React from 'react'

import MenuPanel from 'components/MenuPanel'

type Props = {|
  +children: React$Node,
|}

const MenuLayout = ({
  children,
}: Props) => (
  <div className='menu-layout'>
    <div className='aside'>
      <MenuPanel
        wallet={{
          type: 'address',
          isReadOnly: false,
        }}
      />
    </div>
    <div className='content'>
      {children}
    </div>
  </div>
)

export default MenuLayout
