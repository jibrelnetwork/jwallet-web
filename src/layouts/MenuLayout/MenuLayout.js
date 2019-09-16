// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { OverlayNotification } from 'components'

import * as blocks from 'store/modules/blocks'
import * as ticker from 'store/modules/ticker'
import * as digitalAssets from 'store/modules/digitalAssets'

import styles from './menuLayout.m.scss'
import { MenuPanel } from './components'
import { getMenuMeta } from './components/MenuPanel/menuMeta'

type MenuLayoutHandler = () => any

type OwnProps = {|
  +children: React$Node,
  +routeName: string,
|}

type Props = {|
  ...OwnProps,
  +stopBlocksSync: MenuLayoutHandler,
  +stopTickerSync: MenuLayoutHandler,
  +startBlocksSync: MenuLayoutHandler,
  +startTickerSync: MenuLayoutHandler,
  +initDigitalAssets: MenuLayoutHandler,
  +i18n: I18nType,
  +isConnectionError: boolean,
|}

class MenuLayout extends Component<Props> {
  componentDidMount() {
    if (this.props.routeName.indexOf('Wallets') === 0) {
      return
    }

    this.startSync()
  }

  componentWillUnmount() {
    this.stopSync()
  }

  componentDidUpdate(prevProps: Props) {
    const isPrevWallets: boolean = (prevProps.routeName.indexOf('Wallets') === 0)
    const isCurrWallets: boolean = (this.props.routeName.indexOf('Wallets') === 0)

    if (!isPrevWallets && isCurrWallets) {
      this.stopSync()
    } else if (isPrevWallets && !isCurrWallets) {
      this.startSync()
    }
  }

  startSync = () => {
    const {
      startBlocksSync,
      startTickerSync,
      initDigitalAssets,
    }: Props = this.props

    startBlocksSync()
    startTickerSync()
    initDigitalAssets()
  }

  stopSync = () => {
    const {
      stopBlocksSync,
      stopTickerSync,
    }: Props = this.props

    stopBlocksSync()
    stopTickerSync()
  }

  render() {
    const {
      i18n,
      children,
      routeName,
      isConnectionError,
    }: Props = this.props

    const { isMinimized } = getMenuMeta(routeName)

    return (
      <div
        className={classNames(
          '__menu-layout',
          `__page-${routeName.toLowerCase()}`,
          styles.core,
          isMinimized && styles.minimized,
        )}
      >
        <MenuPanel routeName={routeName} />
        <div className={classNames('__menu-layout_content', styles.content)}>
          {children}
          {isConnectionError && (
            <div className={classNames('__menu-layout_overlay', styles.overlay)}>
              <OverlayNotification
                color='red'
                image='screen-error'
                description={[
                  i18n._(
                    'layout.MenuLayout.error.noConnection.description.0',
                    null,
                    { defaults: 'Internet connection error.' },
                  ),
                  i18n._(
                    'layout.MenuLayout.error.noConnection.description.1',
                    null,
                    { defaults: 'Try again.' },
                  ),
                ]}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = {
  stopBlocksSync: blocks.syncStop,
  stopTickerSync: ticker.syncStop,
  startBlocksSync: blocks.syncStart,
  startTickerSync: ticker.syncStart,
  initDigitalAssets: digitalAssets.init,
}

const mapStateToProps = () => ({ isConnectionError: false })

const MenuLayoutEnhanced = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(MenuLayout)

export { MenuLayoutEnhanced as MenuLayout }
