// @flow

import React from 'react'
import { CloseableScreen } from 'components'

type Props = {|
  +title: string,
  +closeClick: () => void,
  +children: React$Node,
|}

export default function SubsettingsLayout(props: Props) {
  return (
    <CloseableScreen
      title={props.title}
      closeClick={props.closeClick}
    >
      <div className='subsettings-layout'>
        <div className='container'>
          {props.children}
        </div>
      </div>
    </CloseableScreen>

  )
}
