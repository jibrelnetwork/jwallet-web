// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import {
  MenuPanel,
  OverlayNotification,
} from 'components'

type Props = {|
  +openLayout: Function,
  +closeLayout: Function,
  +items: Wallets,
  +addressNames: AddressNames,
  +children: React$Node,
  +fiatCurrency: string,
  +activeWalletId: ?WalletId,
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
      items,
      addressNames,
      children,
      fiatCurrency,
      activeWalletId,
      fiatBalance,
      isConnectionError,
    }: Props = this.props

    return (
      <div className='menu-layout'>
        <MenuPanel
          items={items}
          addressNames={addressNames}
          fiatCurrency={fiatCurrency}
          activeWalletId={activeWalletId}
          fiatBalance={fiatBalance}
          isMinimized={false}
        />
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
