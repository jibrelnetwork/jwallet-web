// @flow

import React from 'react'
import classNames from 'classnames'

import OverlayActions from 'components/OverlayActions'

const QRCode = ({ copy, download, isActive, color }: Props) => (
  <div className={classNames('qr-code', isActive && '-active', `-${color}`)}>
    <div className='qr'>
      <div id='qrcode' />
    </div>
    <div className='overlay'>
      <OverlayActions
        copy={copy}
        load={download}
        copyLabel='Copy QR Code'
        loadLabel='Download as PNG'
        color={color}
      />
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
