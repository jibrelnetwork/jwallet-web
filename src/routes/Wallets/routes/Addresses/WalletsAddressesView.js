// @flow

import React, { Component } from 'react'

import JFlatButton from 'components/base/JFlatButton'

import {
  ModalHeader,
  WalletViewTitle,
  MnemonicAddresses,
} from 'components'

type Props = {|
  +onOpenView: () => void,
  +onCloseView: () => void,
  +goToWallets: () => void,
  +setActive: (Index) => void,
  +getMoreRequest: () => void,
  +renameAddress: (Address) => void,
  +addresses: OwnerAddress[],
  +balances: WalletsBalances,
  +addressNames: AddressNames,
  +walletsAddressNames: AddressNames,
  +isLoading: boolean,
  +isReadOnly: boolean,
|}

class WalletsAddressesView extends Component<Props> {
  componentDidMount() {
    this.props.onOpenView()
  }

  componentWillUnmount() {
    this.props.onCloseView()
  }

  render() {
    const {
      setActive,
      goToWallets,
      renameAddress,
      getMoreRequest,
      balances,
      addresses,
      addressNames,
      walletsAddressNames,
      isLoading,
      isReadOnly,
    } = this.props

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
            setActive={setActive}
            renameAddress={renameAddress}
            balances={balances}
            addresses={addresses}
            addressNames={addressNames}
            walletsAddressNames={walletsAddressNames}
            isLoading={isLoading}
            isReadOnly={isReadOnly}
          />
          <div className='actions'>
            <JFlatButton
              onClick={getMoreRequest}
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
