// @flow

import React from 'react'

const CoreLayout = ({ children }: Props) => (
  <div className='core-layout'>
    {children}
  </div>
)

type Props = {
  children?: Object,
}

CoreLayout.defaultProps = {
  children: null,
}

export default CoreLayout
