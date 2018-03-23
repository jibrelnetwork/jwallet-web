// @flow

import React from 'react'

import MenuLayout from 'layouts/MenuLayout'
import ActiveAssetsPanel from 'components/__new__/ActiveAssetsPanel'

const ActiveAssetsLayout = ({ children }: Props) => (
  <MenuLayout>
    <div className='active-assets-layout'>
      <div className='active-assets-panel-wrapper'>
        <ActiveAssetsPanel />
      </div>
      <div className='content'>{children}</div>
    </div>
  </MenuLayout>
)

type Props = {
  children?: Object,
}

ActiveAssetsLayout.defaultProps = {
  children: null,
}

export default ActiveAssetsLayout
