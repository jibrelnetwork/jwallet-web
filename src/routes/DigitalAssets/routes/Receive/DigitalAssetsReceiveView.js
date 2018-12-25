// @flow

import React, { Component } from 'react'

import { JRaisedButton } from 'components/base'
import { AddressPicker, CloseableScreen } from 'components'
import { clipboard, qrCode } from 'services'

type Props = {|
  +close: Function,
  +openView: Function,
  +closeView: Function,
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
        selector: 'picture.qr',
        requisites: { to: address },
        appearance: {},
      })
    })
  }

  copyAddress = () => {
    clipboard.copyText(this.state.selectedAddress)
  }

  render() {
    const { items, close, openView, closeView } = this.props
    const { selectedAddress } = this.state

    return (
      <CloseableScreen
        close={close}
        onOpen={openView}
        onClose={closeView}
        title='Receive assets'
      >
        <div className='digital-assets-receive-view'>
          <div className='content'>
            <div className='container'>
              <picture className='qr' />
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
