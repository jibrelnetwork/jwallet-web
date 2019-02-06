// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

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

type Props = {|
  +close: Function,
  +address: ?Address,
|}

type StateProps = {|
  label: 'Copy address' | 'Copied!',
|}

class DigitalAssetsReceiveView extends PureComponent<Props, StateProps> {
  // eslint-disable-next-line react/sort-comp
  toggleTimeout: ?TimeoutID = null

  constructor(props: Props) {
    super(props)

    this.state = {
      label: 'Copy address',
    }
  }

  componentDidMount() {
    if (this.props.address) {
      generateQRCode(this.props.address)
    }
  }

  copyAddress = () => {
    this.setState({ label: t`Copied` })

    this.toggleTimeout = setTimeout(() => {
      this.setState({ label: t`Copy address` })
    }, 2000)

    if (this.props.address) {
      clipboard.copyText(this.props.address)
    }
  }

  componentWillUnmount() {
    if (this.toggleTimeout) {
      clearTimeout(this.toggleTimeout)
    }
  }

  render() {
    const { address, close } = this.props

    const {
      label,
    }: StateProps = this.state

    if (isVoid(address)) {
      return null
    }

    return (

      <CloseableScreen
        close={close}
        title={t`Receive assets`}
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
                label={t`Recipient address`}
                value={address}
                color='gray'
                type='text'
                isDisabled
              />
              <JRaisedButton
                onClick={this.copyAddress}
                label={label}
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
