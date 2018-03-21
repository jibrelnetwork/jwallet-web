// @flow

import React from 'react'

const WalletsLayout = ({ children }: Props) => (
  <div className='wallets-layout'>{children}</div>
)

type Props = {
  children?: Object,
}

WalletsLayout.defaultProps = {
  children: null,
}

export default WalletsLayout
