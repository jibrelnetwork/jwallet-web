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

import {
  getMenuMeta,
  type MenuMeta,
} from './components/MenuPanel/menuMeta'

type MenuLayoutHandler = () => any

type OwnProps = {|
  +children: React$Node,
  +routeName: string,
|}

type Props = {|
  ...OwnProps,
  +stopBlocksSync: MenuLayoutHandler,
  +startBlocksSync: MenuLayoutHandler,
  +startTickerSync: MenuLayoutHandler,
  +initDigitalAssets: MenuLayoutHandler,
  +i18n: I18nType,
  +isConnectionError: boolean,
|}

class MenuLayout extends Component<Props> {
  coreRef = React.createRef<HTMLDivElement>()

  componentDidMount() {
    const {
      startBlocksSync,
      startTickerSync,
      initDigitalAssets,
      routeName,
    }: Props = this.props

    startTickerSync()
    initDigitalAssets()

    /**
     * Blocks syncing shouldn't be started on pages connected with wallets management
     * Also, check comment in componentDidUpdate below
     */
    if (routeName.indexOf('Wallets') === 0) {
      return
    }

    startBlocksSync()
  }

  componentWillUnmount() {
    this.props.stopBlocksSync()
  }

  componentDidUpdate(prevProps: Props) {
    const {
      stopBlocksSync,
      startBlocksSync,
      routeName,
    }: Props = this.props

    /**
     * Defining of necessity of start/stop sync better to move in router's meta-info
     * Current solution is ok, until someone will have problems with routes naming
     */
    const isPrevWallets: boolean = (prevProps.routeName.indexOf('Wallets') === 0)
    const isCurrWallets: boolean = (routeName.indexOf('Wallets') === 0)

    if (!isPrevWallets && isCurrWallets) {
      stopBlocksSync()
    } else if (isPrevWallets && !isCurrWallets) {
      startBlocksSync()
    }

    if ((routeName !== prevProps.routeName) && this.coreRef && this.coreRef.current) {
      this.coreRef.current.scrollIntoView({
        block: 'start',
      })
    }
  }

  render() {
    const {
      i18n,
      children,
      routeName,
      isConnectionError,
    }: Props = this.props

    const { isMinimized }: MenuMeta = getMenuMeta(routeName)

    return (
      <div
        ref={this.coreRef}
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
