// @flow

import React from 'react'

const CoreLayout = ({
  isNetworksInited,
  isWalletsInited,
  isDigitalAssetsInited,
  children,
}: Props) => (
  <div className='core-layout'>
    {!(isNetworksInited && isWalletsInited && isDigitalAssetsInited) ? 'Loading' : children}
  </div>
)

type Props = {
  isNetworksInited: boolean,
  isWalletsInited: boolean,
  isDigitalAssetsInited: boolean,
  children?: Object,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
