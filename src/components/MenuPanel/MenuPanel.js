// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import menuPanelStyle from './menuPanel.m.scss'
import { Top } from './Top'
import { Back } from './Back'
import { Actions } from './Actions'
import { Settings } from './Settings'
import { Separator } from './Separator'

import {
  getMenuMeta,
  type MenuMeta,
} from './menuMeta'

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
        <Separator />
        <Actions routeName={routeName} />
        <Separator />
        <Settings />
        <Back
          previousRouteNameFallback={previousRouteNameFallback}
          isMinimized={isMinimized}
        />
      </header>
    )
  }
}
