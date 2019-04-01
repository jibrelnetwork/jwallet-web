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
  +children: React$Node,
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
  +fiatBalance: number,
  +isMnemonic: boolean,
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
      children,
      walletName,
      fiatCurrency,
      mnemonicAddressName,
      fiatBalance,
      isMnemonic,
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
          walletName={walletName}
          fiatCurrency={fiatCurrency}
          mnemonicAddressName={mnemonicAddressName}
          isMnemonic={isMnemonic}
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
