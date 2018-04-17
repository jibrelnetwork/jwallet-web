// @flow

import React from 'react'
import classNames from 'classnames'

import JButton from '../base/JButton'

const QRCode = ({ saveQRCode, isActive }: Props) => (
  <div className={classNames('qr-code', { '-active': isActive })}>
    <div id='qrcode' />
    <div className='overlay'>
      <div className='button'>
        <JButton onClick={saveQRCode} text='Download' wide />
      </div>
    </div>
  </div>
)

type Props = {
  saveQRCode: Function,
  isActive: boolean,
}

export default QRCode
