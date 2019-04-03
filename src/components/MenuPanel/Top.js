// @flow

import React from 'react'
import classNames from 'classnames'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JLogo,
  JLink,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

type Props = {|
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
  +fiatBalance: number,
  +isMnemonic: boolean,
|}

export function Top({
  walletName,
  fiatCurrency,
  mnemonicAddressName,
  isMnemonic,
  fiatBalance,
}: Props) {
  return (
    <div className={classNames('__menu-panel_top', menuPanelStyle.top)}>
      <div className={classNames('__menu-panel_logo', menuPanelStyle.logo)}>
        <JLogo />
      </div>
      <JLink
        href='/wallets'
        className={classNames('__menu-panel_ticker', menuPanelStyle.ticker)}
      >
        <div className={classNames('__menu-panel_wrapper', menuPanelStyle.wrapper)}>
          <div className={classNames('__menu-panel_name', menuPanelStyle.name)}>
            {walletName}
          </div>
          {isMnemonic && mnemonicAddressName && (
            <div className={classNames('__menu-panel_name', menuPanelStyle.name)}>
              {mnemonicAddressName}
            </div>
          )}
          <div className={classNames('__menu-panel_balance', menuPanelStyle.balance)}>
            {`${fiatCurrency}\u202F${formatBalance(divDecimals(fiatBalance))}`}
          </div>
          <div className={classNames('__menu-panel_chevron', menuPanelStyle.chevron)}>
            <JIcon name='arrow-right' size='medium' />
          </div>
        </div>
      </JLink>
    </div>
  )
}
