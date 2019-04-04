// @flow strict

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import menuPanelStyle from './menuPanel.m.scss'

import {
  getMenuMeta,
  type MenuMeta,
} from './menuMeta'

import {
  Top,
  Back,
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
|}

export class MenuPanel extends PureComponent<Props> {
  static defaultProps = {
    isMnemonic: false,
  }

  render() {
    const {
      routeName,
      walletName,
      fiatCurrency,
      mnemonicAddressName,
      fiatBalance,
      isMnemonic,
    }: Props = this.props

    const menuMeta: MenuMeta = getMenuMeta(routeName)
    const { previousRouteNameFallback }: MenuMeta = menuMeta
    const isMinimized: boolean = !walletName || menuMeta.isMinimized

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
        <Back
          previousRouteNameFallback={previousRouteNameFallback}
          isMinimized={isMinimized}
        />
      </header>
    )
  }
}
