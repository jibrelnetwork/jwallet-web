// @flow

import React, { Component } from 'react'

import config from 'config'
import MenuPanel from 'components/MenuPanel'
import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +openLayout: () => void,
  +closeLayout: () => void,
  +setActive: (Wallets, WalletId, Index) => void,
  +getMoreRequest: (Wallets, WalletId, Index, Index) => void,
  +items: Wallets,
  +addresses: Address[],
  +addressNames: AddressNames,
  +children: React$Node,
  +iteration: Index,
  +activeWalletId: ?WalletId,
  isConnectionError: boolean,
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
      isConnectionError,
    }: Props = this.props

    return (
      <div className='menu-layout'>
        <div className='aside'>
          <MenuPanel
            setActiveAddress={this.setActiveAddress}
            getMoreAddresses={this.getMoreAddresses}
            items={items}
            addresses={addresses}
            addressNames={addressNames}
            activeWalletId={activeWalletId}
          />
        </div>
        <div className='content'>
          {children}
          {isConnectionError && (
            <div className='overlay'>
              <OverlayNotification
                color='red'
                image='screen-error'
                description={[
                  'Internet connection error.',
                  'Try again.',
                ]}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default MenuLayout
