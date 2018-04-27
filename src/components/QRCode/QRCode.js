// @flow

import React from 'react'
import classNames from 'classnames'

import JRaisedButton from 'components/base/JRaisedButton'

const QRCode = ({ saveQRCode, isActive }: Props) => (
  <div className={classNames('qr-code', isActive && '-active')}>
    <div id='qrcode' />
    <div className='overlay'>
      <div className='button'>
        <JRaisedButton onClick={saveQRCode} label='Download' labelColor='blue' isWide />
      </div>
    </div>
  </div>
)

type Props = {
  saveQRCode: Function,
  isActive: boolean,
}

QRCode.defaultProps = {
  saveQRCode: () => {},
  isActive: false,
}

export default QRCode
