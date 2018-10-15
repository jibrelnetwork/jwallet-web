// @flow

import React, { Component } from 'react'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import ModalHeader from 'components/ModalHeader'
import JFlatButton from 'components/base/JFlatButton'

import MnemonicAddressesList from './components/MnemonicAddressesList'

type Props = {|
  +getMore: () => void,
  +openView: () => void,
  +closeView: () => void,
  +setActive: () => void,
  +wallets: Wallets,
  +addresses: Addresses,
  +iteration: Index,
  +walletId: ?WalletId,
  +isReadOnly: boolean,
|}

class WalletsAddressesView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      getMore,
      setActive,
      wallets,
      addresses,
      walletId,
      iteration,
      isReadOnly,
    } = this.props

    const startIndex: Index = config.mnemonicAddressesCount * iteration
    const endIndex: Index = startIndex + config.mnemonicAddressesCount

    return (
      <div className='wallets-addresses-view'>
        <ModalHeader title='Mnemonic addresses' color='white' location='/wallets' />
        <div className='content'>
          <MnemonicAddressesList
            setActive={setActive}
            addresses={addresses}
            isReadOnly={isReadOnly}
          />
          <div className='actions'>
            <div className='forward'>
              <JFlatButton
                onClick={handle(getMore)(wallets, walletId, startIndex, endIndex)}
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
