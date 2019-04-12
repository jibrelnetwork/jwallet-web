// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import menuPanelStyle from './menuPanel.m.scss'

import {
  Top,
  Actions,
  Settings,
} from './components'

type Props = {|
  +routeName: string,
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
  +fiatBalance: number,
  +isMnemonic: boolean,
  +isMinimized: boolean,
|}

export class MenuPanel extends PureComponent<Props> {
  static defaultProps = {
    isMnemonic: false,
    isMinimized: false,
  }

  render() {
    const {
      routeName,
      walletName,
      fiatCurrency,
      mnemonicAddressName,
      fiatBalance,
      isMnemonic,
      isMinimized,
    }: Props = this.props

    return (
      <header
        className={classNames(
          '__menu-panel',
          menuPanelStyle.core,
          isMinimized && menuPanelStyle.minimized,
        )}
      >
        <Top
          walletName={walletName}
          fiatCurrency={fiatCurrency}
          mnemonicAddressName={mnemonicAddressName}
          fiatBalance={fiatBalance}
          isMnemonic={isMnemonic}
        />
        <Actions routeName={routeName} />
        <Settings />
      </header>
    )
  }
}
