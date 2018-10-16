// @flow

import React, { Component } from 'react'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import ModalHeader from 'components/ModalHeader'
import JFlatButton from 'components/base/JFlatButton'

import MnemonicAddressesList from './components/MnemonicAddressesList'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +setActiveRequest: (Wallets, WalletId, Index) => void,
  +getMoreRequest: (Wallets, WalletId, Index, Index) => void,
  +wallets: Wallets,
  +addresses: Addresses,
  +iteration: Index,
  +walletId: WalletId,
  +isReadOnly: boolean,
|}

class WalletsAddressesView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  setActiveAddress = (addressIndex: Index) => {
    const {
      setActiveRequest,
      wallets,
      walletId,
    } = this.props

    return setActiveRequest(wallets, walletId, addressIndex)
  }

  render() {
    const {
      getMoreRequest,
      wallets,
      addresses,
      walletId,
      iteration,
      isReadOnly,
    } = this.props

    const startIndex: Index = config.mnemonicAddressesCount * iteration
    const endIndex: Index = (startIndex + config.mnemonicAddressesCount) - 1

    return (
      <div className='wallets-addresses-view'>
        <ModalHeader title='Mnemonic addresses' color='white' location='/wallets' />
        <div className='content'>
          <MnemonicAddressesList
            setActive={this.setActiveAddress}
            addresses={addresses}
            isReadOnly={isReadOnly}
          />
          <div className='actions'>
            <div className='forward'>
              <JFlatButton
                onClick={handle(getMoreRequest)(wallets, walletId, startIndex, endIndex)}
                label='Get more'
                iconName='plus'
                iconSize='small'
                iconColor='white'
                isTransparent
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsAddressesView
