// @flow

import React from 'react'

import { CloseableScreen } from 'components'

type Props = {|
  +close: () => void,
  +children: React$Node,
  +title: string,
|}

function SubsettingsView({
  close,
  children,
  title,
}: Props) {
  return (
    <div className='settings-view'>
      <CloseableScreen
        close={close}
        title={title}
      >
        <div className='subsettings-view'>
          <div className='container'>
            {children}
          </div>
        </div>
      </CloseableScreen>
    </div>
  )
}

export default SubsettingsView
