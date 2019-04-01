// @flow

import classNames from 'classnames'
import React, { PureComponent } from 'react'
import { t } from 'ttag'

import {
  divDecimals,
  formatBalance,
} from 'utils/numbers'

import {
  JIcon,
  JLink,
  JLogo,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

type Props = {|
  +walletName: string,
  +fiatCurrency: string,
  +mnemonicAddressName: string,
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
      fiatBalance,
      isMnemonic,
      isMinimized,
    }: Props = this.props

    return (
      <div
        className={classNames(
          '__menu-panel',
          menuPanelStyle.core,
          isMinimized && menuPanelStyle.minimized,
        )}
      >
        <div className={menuPanelStyle.top}>
          <div className={menuPanelStyle.logo}>
            <JLogo />
          </div>
          <JLink href='/wallets' className={menuPanelStyle.ticker}>
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
        <div className={menuPanelStyle.separator} />
        <div className={menuPanelStyle.actions}>
          <JLink
            href='/'
            className={menuPanelStyle.action}
            activeClassName={menuPanelStyle.active}
          >
            <JIcon name='home' size='medium' />
            <span className={menuPanelStyle.label}>
              {t`Home`}
            </span>
          </JLink>
          <JLink
            href='/history'
            className={menuPanelStyle.action}
            activeClassName={menuPanelStyle.active}
          >
            <JIcon name='history' size='medium' />
            <span className={menuPanelStyle.label}>
              {t`History`}
            </span>
          </JLink>
          <JLink
            href='/contacts'
            className={menuPanelStyle.action}
            activeClassName={menuPanelStyle.active}
          >
            <JIcon name='contact' size='medium' />
            <span className={menuPanelStyle.label}>
              {t`Contacts`}
            </span>
          </JLink>
          <JLink
            href='/more'
            className={menuPanelStyle.action}
            activeClassName={menuPanelStyle.active}
          >
            <JIcon name='more' size='medium' />
            <span className={menuPanelStyle.label}>
              {t`More`}
            </span>
          </JLink>
        </div>
        <div className={menuPanelStyle.separator} />
        <div className={classNames(menuPanelStyle.actions, menuPanelStyle.settings)}>
          <JLink
            href='/settings'
            className={menuPanelStyle.action}
            activeClassName={menuPanelStyle.active}
          >
            <JIcon name='settings' size='medium' />
            <span className={menuPanelStyle.label}>
              {t`Settings`}
            </span>
          </JLink>
        </div>
      </div>
    )
  }
}
