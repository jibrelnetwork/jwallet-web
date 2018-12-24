// @flow

import React, { Component } from 'react'
import { Link } from 'react-router'

import { JText, JIcon, JRaisedButton } from 'components/base'
import { AddressPicker } from 'components'
import { clipboard, qrCode } from 'services'

const qrAppearance = {
  size: 240,
  errorCorrectionLevel: 'high',
  color: {
    light: '#ffcc00ff',
    dark: '#001111ff',
  },
}

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +items: AddressPickerAddress[],
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

  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  setAddress = (address: Address): void => {
    this.setState({ selectedAddress: address }, () => {
      qrCode.generate({
        selector: 'picture.qr',
        requisites: { to: address },
        appearance: qrAppearance,
      })
    })
  }

  copyAddress = () => {
    clipboard.copyText(this.state.selectedAddress)
  }

  render() {
    const { items } = this.props
    const { selectedAddress } = this.state

    return (
      <div className='digital-assets-receive-view'>
        <div className='header'>
          <div className='container'>
            <div className='title'>
              <JText value='Receive assets' size='header' color='gray' />
            </div>
            <div className='actions'>
              <Link to='/digital-assets/'>
                <JIcon name='cross' color='gray' />
              </Link>
            </div>
          </div>
        </div>
        <div className='content'>
          <div className='container'>
            <picture className='qr' />
            <AddressPicker
              addresses={items}
              selectedAddress={selectedAddress}
              onSelect={this.setAddress}
            />
            <JRaisedButton onClick={this.copyAddress} label='Copy address' color='blue' />
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalAssetsReceiveView
