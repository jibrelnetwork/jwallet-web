// @flow

import React, { Component } from 'react'

import config from 'config'
import MenuPanel from 'components/MenuPanel'

type Props = {|
  +openLayout: () => void,
  +closeLayout: () => void,
  +onSendAssetClick: () => void,
  +setActive: (Wallets, WalletId, Index) => void,
  +getMoreRequest: (Wallets, WalletId, Index, Index) => void,
  +items: Wallets,
  +addresses: Addresses,
  +addressNames: AddressNames,
  +children: React$Node,
  +iteration: Index,
  +activeWalletId: ?WalletId,
|}

class MenuLayout extends Component<Props> {
  componentDidMount() {
    this.props.openLayout()
  }

  componentWillUnmount() {
    this.props.closeLayout()
  }

  setActiveAddress = (addressIndex: Index) => {
    const {
      setActive,
      items,
      activeWalletId,
    }: Props = this.props

    if (!activeWalletId) {
      return
    }

    setActive(items, activeWalletId, addressIndex)
  }

  getMoreAddresses = () => {
    const {
      getMoreRequest,
      items,
      iteration,
      activeWalletId,
    }: Props = this.props

    if (!activeWalletId) {
      return
    }

    const startIndex: Index = config.mnemonicAddressesCount * iteration
    const endIndex: Index = (startIndex + config.mnemonicAddressesCount) - 1

    getMoreRequest(items, activeWalletId, startIndex, endIndex)
  }

  render() {
    const {
      items,
      addresses,
      addressNames,
      children,
      activeWalletId,
      onSendAssetClick,
    }: Props = this.props

    return (
      <div className='menu-layout'>
        <div className='aside'>
          <MenuPanel
            setActiveAddress={this.setActiveAddress}
            getMoreAddresses={this.getMoreAddresses}
            onSendAssetClick={onSendAssetClick}
            items={items}
            addresses={addresses}
            addressNames={addressNames}
            activeWalletId={activeWalletId}
          />
        </div>
        <div className='content'>
          {children}
        </div>
      </div>
    )
  }
}

export default MenuLayout
