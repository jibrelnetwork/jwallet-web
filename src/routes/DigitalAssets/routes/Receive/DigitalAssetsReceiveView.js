// @flow

import React, { PureComponent } from 'react'

import { JCard, JInput, JRaisedButton } from 'components/base'
import { saveQRCode, copyQRCode } from 'components/QRCode'
import { CloseableScreen, QRCode } from 'components'
import { clipboard, qrCode } from 'services'

import { isVoid } from 'utils/type'

const generateQRCode = (address: Address): void => {
  if (address) {
    qrCode.generate({
      selector: '.qr #qrcode',
      requisites: { to: address },
      appearance: {},
    })
  }
}

const copyAddress = (address) => { clipboard.copyText(address) }

type Props = {|
  +close: Function,
  +address: ?Address,
|}

class DigitalAssetsReceiveView extends PureComponent<Props, *> {
  componentDidMount(): void {
    if (this.props.address) {
      generateQRCode(this.props.address)
    }
  }

  render() {
    const { address, close } = this.props
    if (isVoid(address)) {
      return null
    }

    return (
      <CloseableScreen
        close={close}
        title='Receive assets'
      >
        <div className='digital-assets-receive-view'>
          <div className='content'>
            <div className='container'>
              <div className='qrbox'>
                <JCard color='white'>
                  <QRCode
                    copy={copyQRCode}
                    color='white'
                    download={saveQRCode}
                    isActive
                  />
                </JCard>
              </div>
              <JInput
                label='Recipient address'
                value={address}
                color='gray'
                type='text'
                isDisabled
              />
              <JRaisedButton
                onClick={copyAddress}
                label='Copy address'
                color='blue'
              />
            </div>
          </div>
        </div>
      </CloseableScreen>
    )
  }
}

export default DigitalAssetsReceiveView
