// @flow strict

import React, { PureComponent } from 'react'
import { i18n } from 'i18n/lingui'
import { connect } from 'react-redux'

import config from 'config'
import { selectActiveWalletAddress } from 'store/selectors/wallets'

import {
  qrCode,
  clipboard,
} from 'services'

import {
  QRCode,
  TitleHeader,
} from 'components'

import {
  JInputField,
  Button,
} from 'components/base'

import {
  copyQRCode,
  saveQRCode,
} from 'components/QRCode'

import * as style from './receiveAsset.m.scss'

function generateQRCode(address: Address): void {
  qrCode.generate({
    selector: '.qr #qrcode',
    requisites: { to: address },
    appearance: {},
  })
}

type Props = {|
  +address: Address,
|}

type StateProps = {|
  +isCopied: boolean,
|}

class ReceiveAssetView extends PureComponent<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      isCopied: false,
    }
  }

  componentDidMount() {
    generateQRCode(this.props.address)
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

    clipboard.copyText(this.props.address)
  }

  render() {
    const { address }: Props = this.props
    const { isCopied }: StateProps = this.state

    return (
      <div className={style.core}>
        <TitleHeader title={i18n._('Receive.title', null, { defaults: 'Receive' })} />
        <div className={style.container}>
          <div className={style.qrbox}>
            <QRCode
              copy={copyQRCode}
              download={saveQRCode}
              color='white'
              isActive
            />
          </div>
          <JInputField
            // $FlowFixMe
            input={{
              name: 'recipient',
              value: address,
            }}
            label={i18n._(
              'Receive.recipientFieldLabel',
              null,
              { defaults: 'Your address' },
            )}
            type='text'
            className={style.input}
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
    )
  }
}

function mapStateToProps(state: AppState) {
  return {
    address: selectActiveWalletAddress(state),
  }
}

export const ReceiveAsset = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
)(ReceiveAssetView)
