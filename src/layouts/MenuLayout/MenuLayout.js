// @flow

import classNames from 'classnames'
import React, { Component } from 'react'
import { t } from 'ttag'

import {
  MenuPanel,
  OverlayNotification,
} from 'components'

import menuLayoutStyle from './menuLayout.m.scss'

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

export class MenuLayout extends Component<Props> {
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
      <div
        className={classNames(
          '__menu-layout',
          menuLayoutStyle.core,
        )}
      >
        <MenuPanel
          items={items}
          addressNames={addressNames}
          fiatCurrency={fiatCurrency}
          activeWalletId={activeWalletId}
          fiatBalance={fiatBalance}
        />
        <div className={menuLayoutStyle.content}>
          {children}
          {isConnectionError && (
            <div className={menuLayoutStyle.overlay}>
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
