// @flow strict

import classNames from 'classnames'
import { t } from 'ttag'

import React, {
  Fragment,
  Component,
} from 'react'

import { OverlayNotification } from 'components'

import menuLayoutStyle from './menuLayout.m.scss'

import {
  Back,
  MenuPanel,
} from './components'

import {
  getMenuMeta,
  type MenuMeta,
} from './menuMeta'

type Props = {|
  +openLayout: Function,
  +closeLayout: Function,
  +children: React$Node,
  +routeName: string,
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
      routeName,
      walletName,
      fiatCurrency,
      mnemonicAddressName,
      fiatBalance,
      isMnemonic,
      isConnectionError,
    }: Props = this.props

    const menuMeta: MenuMeta = getMenuMeta(routeName)
    const { previousRouteNameFallback }: MenuMeta = menuMeta
    const isMinimized: boolean = !walletName || menuMeta.isMinimized

    return (
      <div
        className={classNames(
          '__menu-layout',
          menuLayoutStyle.core,
          isMinimized && menuLayoutStyle.minimized,
        )}
      >
        <Fragment>
          <MenuPanel
            routeName={routeName}
            walletName={walletName}
            fiatCurrency={fiatCurrency}
            mnemonicAddressName={mnemonicAddressName}
            fiatBalance={fiatBalance}
            isMnemonic={isMnemonic}
            isMinimized={isMinimized}
          />
          <Back
            previousRouteNameFallback={previousRouteNameFallback}
            isHidden={!isMinimized}
          />
        </Fragment>
        <div className={classNames('__menu-layout_content', menuLayoutStyle.content)}>
          {children}
          {isConnectionError && (
            <div className={classNames('__menu-layout_overlay', menuLayoutStyle.overlay)}>
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
