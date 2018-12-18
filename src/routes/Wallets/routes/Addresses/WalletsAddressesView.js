// @flow

import React, { Component } from 'react'

import config from 'config'
import handle from 'utils/eventHandlers/handle'
import JFlatButton from 'components/base/JFlatButton'
import { ModalHeader, WalletViewTitle, MnemonicAddresses } from 'components'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +goToWallets: () => void,
  +renameAddress: (Address) => void,
  +setActive: (Wallets, WalletId, Index) => void,
  +getMoreRequest: (Wallets, WalletId, Index, Index) => void,
  +wallets: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +walletsAddressNames: AddressNames,
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

  setActiveAddress = (addressIndex: Index) => {
    const {
      setActive,
      wallets,
      walletId,
    } = this.props

    if (walletId) {
      setActive(wallets, walletId, addressIndex)
    }
  }

  render() {
    const {
      goToWallets,
      renameAddress,
      getMoreRequest,
      wallets,
      addresses,
      addressNames,
      walletsAddressNames,
      walletId,
      iteration,
      isReadOnly,
    } = this.props

    const startIndex: Index = config.mnemonicAddressesCount * iteration
    const endIndex: Index = (startIndex + config.mnemonicAddressesCount) - 1

    return (
      <div className='wallets-view -addresses'>
        <ModalHeader
          onBack={goToWallets}
          color='white'
          title='Mnemonic addresses'
        />
        <div className='content'>
          <WalletViewTitle
            data={[
              'To enhance your privacy, the wallet can contain as many addresses',
              'as you need. Please, choose one to continue',
            ]}
          />
          <MnemonicAddresses
            renameAddress={renameAddress}
            setActive={this.setActiveAddress}
            addresses={addresses}
            addressNames={addressNames}
            walletsAddressNames={walletsAddressNames}
            isReadOnly={isReadOnly}
          />
          <div className='actions'>
            <JFlatButton
              onClick={handle(getMoreRequest)(wallets, walletId, startIndex, endIndex)}
              iconName='plus'
              iconSize='small'
              iconColor='white'
              label='Get more addresses'
              isBordered
              isTransparent
            />
          </div>
        </div>
      </div>
    )
  }
}

export default WalletsAddressesView
