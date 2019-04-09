// @flow strict

import React from 'react'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JLogo,
  JLink,
} from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

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
    <div className={`__top ${menuPanelStyle.top}`}>
      <div className={menuPanelStyle.logo}>
        <JLogo />
      </div>
      <JLink
        href='/wallets'
        className={menuPanelStyle.ticker}
      >
        <div className={menuPanelStyle.wrapper}>
          <div className={menuPanelStyle.name}>
            {walletName}
          </div>
          {isMnemonic && mnemonicAddressName && (
            <div className={menuPanelStyle.name}>
              {mnemonicAddressName}
            </div>
          )}
          <div className={menuPanelStyle.balance}>
            {`${fiatCurrency}\u202F${formatBalance(divDecimals(fiatBalance))}`}
          </div>
          <div className={menuPanelStyle.chevron}>
            <JIcon name='arrow-right' size='medium' />
          </div>
        </div>
      </JLink>
    </div>
  )
}
