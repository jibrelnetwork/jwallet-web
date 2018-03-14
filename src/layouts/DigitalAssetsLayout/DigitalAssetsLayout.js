// @flow

import React from 'react'

import MenuLayout from 'layouts/MenuLayout'

const DigitalAssetsLayout = ({ children }: Props) => (
  <MenuLayout>
    <div>
      {
      /*
        <div>{'Tabs'}</div>
        <div>{'Add button'}</div>
        <div>{'Search'}</div>
      */
      }
      <div>{children}</div>
    </div>
  </MenuLayout>
)

type Props = {
  children?: Object,
}

DigitalAssetsLayout.defaultProps = {
  children: null,
}

export default DigitalAssetsLayout
