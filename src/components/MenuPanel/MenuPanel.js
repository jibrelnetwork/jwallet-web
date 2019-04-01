// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'
import { Link } from 'react-router'

import {
  getWallet,
  getAddress,
  checkMnemonicType,
  getMnemonicAddressName,
} from 'utils/wallets'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JLogo,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

type Props = {|
  +items: Wallets,
  +addressNames: AddressNames,
  +fiatCurrency: string,
  +activeWalletId: ?WalletId,
  +fiatBalance: number,
  +isMinimized: boolean,
|}

export class MenuPanel extends PureComponent<Props> {
  static defaultProps = {
    isMinimized: false,
  }

  render() {
    const {
      items,
      addressNames,
      fiatCurrency,
      activeWalletId,
      fiatBalance,
      isMinimized,
    }: Props = this.props

    try {
      const wallet: Wallet = getWallet(items, activeWalletId)

      const {
        id,
        name,
        type,
      }: Wallet = wallet

      return (
        <div
          className={classNames(
            menuPanelStyle.core,
            isMinimized && menuPanelStyle.minimized,
          )}
        >
          <div className={menuPanelStyle.top}>
            <div className={menuPanelStyle.logo}>
              <JLogo />
            </div>
            <Link to='/wallets' className={menuPanelStyle.ticker}>
              <div className={menuPanelStyle.wrapper}>
                <div className={menuPanelStyle.name}>
                  {name}
                </div>
                {checkMnemonicType(type) && (
                  <div className={menuPanelStyle.name}>
                    {getMnemonicAddressName(wallet, addressNames[getAddress(items, id)])}
                  </div>
                )}
                <div className={menuPanelStyle.balance}>
                  {`${fiatCurrency}\u202F${formatBalance(divDecimals(fiatBalance))}`}
                </div>
                <div className={menuPanelStyle.chevron}>
                  <JIcon name='arrow-right' size='medium' />
                </div>
              </div>
            </Link>
          </div>
          <div className={menuPanelStyle.separator} />
          <div className={menuPanelStyle.actions}>
            <Link
              to='/digital-assets/grid'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='home' size='medium' />
              <span className={menuPanelStyle.label}>
                {t`Home`}
              </span>
            </Link>
            <Link
              to='/transactions'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='history' size='medium' />
              <span className={menuPanelStyle.label}>
                {t`History`}
              </span>
            </Link>
            <Link
              to='/favorites'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='contact' size='medium' />
              <span className={menuPanelStyle.label}>
                {t`Contacts`}
              </span>
            </Link>
            <Link
              to='/more'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='more' size='medium' />
              <span className={menuPanelStyle.label}>
                {t`More`}
              </span>
            </Link>
          </div>
          <div className={menuPanelStyle.separator} />
          <div className={classNames(menuPanelStyle.actions, menuPanelStyle.settings)}>
            <Link
              to='/settings'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='settings' size='medium' />
              <span className={menuPanelStyle.label}>
                {t`Settings`}
              </span>
            </Link>
          </div>
        </div>
      )
    } catch (err) {
      return null
    }
  }
}
