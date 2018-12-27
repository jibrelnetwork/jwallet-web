// @flow

import React, { Component } from 'react'

import { JCard, JInput, JRaisedButton } from 'components/base'
import { AddressPicker, CloseableScreen, QRCode } from 'components'
import { clipboard, qrCode } from 'services'

import { saveQRCode, copyQRCode } from 'components/QRCode'
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
  +items: AddressNames,
  +wallet: ?Wallet,
|}

type State = {
  selectedAddress: Address,
}

class DigitalAssetsReceiveView extends Component<Props, State> {
  constructor(props: Props) {
    super(props)

    const { wallet, items } = props
    if (isVoid(wallet)) {
      this.state = {
        selectedAddress: '',
      }

      return
    }

    const { address, addressIndex } = wallet

    const initialAddress = address || Object.keys(items)[addressIndex || 0]

    this.state = {
      selectedAddress: initialAddress,
    }
  }

  componentDidMount(): void {
    generateQRCode(this.state.selectedAddress)
  }

  setAddress = (address: Address): void => {
    this.setState({ selectedAddress: address }, () => { generateQRCode(address) })
  }

  copyAddress = () => {
    clipboard.copyText(this.state.selectedAddress)
  }

  render() {
    if (isVoid(this.props.wallet)) {
      return null
    }

    const { items, wallet, close } = this.props
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
              {wallet.type === 'address' ?
                <JInput
                  label='Recepient address'
                  value={selectedAddress}
                  color='gray'
                  type='text'
                  isDisabled
                /> :
                <AddressPicker
                  onSelect={this.setAddress}
                  addressNames={items}
                  selectedAddress={selectedAddress}
                  isDisabled={wallet.type === 'address'}
                />
              }
              <JRaisedButton onClick={this.copyAddress} label='Copy address' color='blue' />
            </div>
          </div>
        </div>
      </CloseableScreen>
    )
  }
}

export default DigitalAssetsReceiveView
