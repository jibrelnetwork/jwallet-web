// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

const WalletsLayout = ({ children }: Props) => (
  <div className='wallets-layout'>
    <Scrollbars autoHide>
      {children}
    </Scrollbars>
  </div>
)

type Props = {
  children?: Object,
}

WalletsLayout.defaultProps = {
  children: null,
}

export default WalletsLayout
