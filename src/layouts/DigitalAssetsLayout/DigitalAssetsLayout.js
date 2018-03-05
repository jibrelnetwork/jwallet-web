// @flow

import React from 'react'

import AsideLayout from '../AsideLayout'

const DigitalAssetsLayout = ({ children }: Props) => (
  <AsideLayout>
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
  </AsideLayout>
)

type Props = {
  children?: Object,
}

DigitalAssetsLayout.defaultProps = {
  children: null,
}

export default DigitalAssetsLayout
