// @flow

import React, { Component } from 'react'

import MenuPanel from 'components/MenuPanel'
import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +openLayout: () => void,
  +closeLayout: () => void,
  +setActive: (Index) => void,
  +getMoreRequest: () => void,
  +items: Wallets,
  +addresses: Address[],
  +addressNames: AddressNames,
  +children: React$Node,
  +activeWalletId: ?WalletId,
  +ethBalance: ?Balance,
  +isConnectionError: boolean,
|}

class MenuLayout extends Component<Props> {
  componentDidMount() {
    this.props.openLayout()
  }

  componentWillUnmount() {
    this.props.closeLayout()
  }

  render() {
    const {
      setActive,
      getMoreRequest,
      items,
      addresses,
      addressNames,
      children,
      activeWalletId,
      ethBalance,
      isConnectionError,
    }: Props = this.props

    return (
      <div className='menu-layout'>
        <div className='aside'>
          <MenuPanel
            setActiveAddress={setActive}
            getMoreAddresses={getMoreRequest}
            items={items}
            addresses={addresses}
            addressNames={addressNames}
            activeWalletId={activeWalletId}
            ethBalance={ethBalance}
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
