// @flow

import React from 'react'
import classNames from 'classnames'

import OverlayActions from 'components/OverlayActions'

const QRCode = ({ copy, download, isActive }: Props) => (
  <div className={classNames('qr-code', isActive && '-active')}>
    <div className='qr'>
      <div id='qrcode' />
    </div>
    <div className='overlay'>
      <OverlayActions
        copy={copy}
        load={download}
        copyLabel='Copy QR Code'
        loadLabel='Download as PNG'
      />
    </div>
  </div>
)

type Props = {
  copy: Function,
  download: Function,
  isActive: boolean,
}

export default QRCode
