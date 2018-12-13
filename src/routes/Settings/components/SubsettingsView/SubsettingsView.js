// @flow

import React from 'react'
import { CloseableScreen } from 'components'

type Props = {|
  +title: string,
  +closeClick: () => void,
  +children: React$Node,
|}

export default function SubsettingsView(props: Props) {
  return (
    <div className='settings-view'>
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
    </div>
  )
}
