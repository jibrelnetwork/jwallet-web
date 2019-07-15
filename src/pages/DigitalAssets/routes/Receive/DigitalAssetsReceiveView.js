// @flow

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'

import config from 'config'

import {
  qrCode,
  clipboard,
} from 'services'

import {
  QRCode,
  CloseableScreen,
} from 'components'

import {
  JCard,
  JInput,
  Button,
} from 'components/base'

import {
  copyQRCode,
  saveQRCode,
} from 'components/QRCode'

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

export type Props = {|
  +close: Function,
  +address: ?Address,
|}

type StateProps = {|
  isCopied: boolean,
|}

class DigitalAssetsReceiveView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isCopied: false,
    }
  }

  componentDidMount() {
    if (this.props.address) {
      generateQRCode(this.props.address)
    }
  }

  componentWillUnmount() {
    if (this.toggleTimeout) {
      clearTimeout(this.toggleTimeout)
    }
  }

  toggleTimeout: ?TimeoutID = null

  handleClick = () => {
    this.setState({ isCopied: true })

    this.toggleTimeout = setTimeout(() => {
      this.setState({ isCopied: false })
    }, config.messageCopyTimeout)

    if (this.props.address) {
      clipboard.copyText(this.props.address)
    }
  }

  render() {
    const {
      address, close,
    } = this.props

    const {
      isCopied,
    }: StateProps = this.state

    if (isVoid(address)) {
      return null
    }

    return (
      <CloseableScreen
        close={close}
        title={i18n._(
          'Receive.title',
          null,
          { defaults: 'Receive assets' },
        )}
      >
        <div className='digital-assets-receive-view'>
          <div className='content'>
            <div className='container'>
              <div className='qrbox'>
                <JCard color='white'>
                  <QRCode
                    copy={copyQRCode}
                    download={saveQRCode}
                    color='white'
                    isActive
                  />
                </JCard>
              </div>
              <JInput
                value={address}
                label={i18n._(
                  'Receive.recipientLabel',
                  null,
                  { defaults: 'Recipient address' },
                )}
                color='gray'
                type='text'
                isDisabled
              />
              <Button
                onClick={this.handleClick}
              >{isCopied
                  ? i18n._(
                    'Receive.copied',
                    null,
                    { defaults: 'Copied!' },
                  )
                  : i18n._(
                    'Receive.copy',
                    null,
                    { defaults: 'Copy address' },
                  )}
              </Button>
            </div>
          </div>
        </div>
      </CloseableScreen>
    )
  }
}

export default DigitalAssetsReceiveView
