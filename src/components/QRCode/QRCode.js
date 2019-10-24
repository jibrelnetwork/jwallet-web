// @flow

import React from 'react'
import classNames from 'classnames'

type QRCodeColor = 'white' | 'gray'

type Props = {
  color: QRCodeColor,
  isActive: boolean,
}

const QRCode = ({
  color,
  isActive,
}: Props) => (
  <div className={classNames('qr-code', isActive && '-active', `-${color}`)}>
    <div className='qr'>
      <canvas id='qrcode' />
    </div>
  </div>
)

QRCode.defaultProps = {
  color: 'gray',
}

export default QRCode
