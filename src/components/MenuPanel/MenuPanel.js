// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'

import menuPanelStyle from './menuPanel.m.scss'
import { Top } from './Top'
import { Back } from './Back'
import { Actions } from './Actions'
import { Settings } from './Settings'
import { Separator } from './Separator'

type Props = {|
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
  +previousRouteNameFallback: ?string,
  +fiatBalance: number,
  +isMnemonic: boolean,
  +isMinimized: boolean,
|}

export class MenuPanel extends PureComponent<Props> {
  static defaultProps = {
    isMinimized: false,
  }

  render() {
    const {
      walletName,
      fiatCurrency,
      mnemonicAddressName,
      previousRouteNameFallback,
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
        <Separator />
        <Actions />
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
