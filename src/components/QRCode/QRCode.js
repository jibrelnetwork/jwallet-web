// @flow

import React from 'react'
import classNames from 'classnames'

const QRCode = ({ isActive, color }: Props) => (
  <div className={classNames('qr-code', isActive && '-active', `-${color}`)}>
    <div className='qr'>
      <div id='qrcode' />
    </div>
  </div>
)

QRCode.defaultProps = {
  color: 'gray',
}

type Props = {
  copy: Function,
  download: Function,
  isActive: boolean,
  color: 'white' | 'gray',
}

export default QRCode
