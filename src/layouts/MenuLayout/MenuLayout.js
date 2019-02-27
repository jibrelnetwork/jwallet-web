// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import MenuPanel from 'components/MenuPanel'
import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +openLayout: Function,
  +closeLayout: Function,
  +setActive: (Index) => void,
  +getMoreRequest: () => void,
  +items: Wallets,
  +addresses: Address[],
  +addressNames: AddressNames,
  +children: React$Node,
  +activeWalletId: ?WalletId,
  +fiatCurrency: FiatCurrency,
  +fiatBalance: number,
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
      fiatCurrency,
      activeWalletId,
      fiatBalance,
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
            fiatCurrency={fiatCurrency}
            activeWalletId={activeWalletId}
            fiatBalance={fiatBalance}
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
                  t`Internet connection error.`,
                  t`Try again.`,
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
