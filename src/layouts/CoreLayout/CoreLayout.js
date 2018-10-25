// @flow

import React from 'react'

import 'styles/core.scss'

type Props = {|
  +children: React$Node,
|}

function CoreLayout({ children }: Props) {
  return (
    <div className='core-layout'>
      {children}
    </div>
  )
}

export default CoreLayout
