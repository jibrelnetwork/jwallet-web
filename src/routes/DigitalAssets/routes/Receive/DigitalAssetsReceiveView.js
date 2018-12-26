// @flow

import React, { Component } from 'react'

import { JCard, JRaisedButton } from 'components/base'
import { AddressPicker, CloseableScreen, QRCode } from 'components'
import { clipboard, qrCode } from 'services'

import { saveQRCode, copyQRCode } from 'components/QRCode'

type Props = {|
  +close: Function,
  +items: AddressNames,
|}

type State = {
  selectedAddress: Address,
}

class DigitalAssetsReceiveView extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    this.state = {
      selectedAddress: '',
    }
  }

  setAddress = (address: Address): void => {
    this.setState({ selectedAddress: address }, () => {
      qrCode.generate({
        selector: '.qr #qrcode',
        requisites: { to: address },
        appearance: {},
      })
    })
  }

  copyAddress = () => {
    clipboard.copyText(this.state.selectedAddress)
  }

  render() {
    const { items, close } = this.props
    const { selectedAddress } = this.state

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
              <AddressPicker
                onSelect={this.setAddress}
                addressNames={items}
                selectedAddress={selectedAddress}
              />
              <JRaisedButton onClick={this.copyAddress} label='Copy address' color='blue' />
            </div>
          </div>
        </div>
      </CloseableScreen>
    )
  }
}

export default DigitalAssetsReceiveView
