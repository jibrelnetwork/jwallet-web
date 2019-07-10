// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { i18n } from 'i18n/lingui'

import { OverlayNotification } from 'components'

import menuLayoutStyle from './menuLayout.m.scss'
import { MenuPanel } from './components'
import {
  getMenuMeta,
} from './components/MenuPanel/menuMeta'

export type Props = {|
  +openLayout: () => any,
  +closeLayout: () => any,
  +children: React$Node,
  +routeName: string,
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
      isConnectionError,
    }: Props = this.props

    const { isMinimized } = getMenuMeta(routeName)

    return (
      <div
        className={classNames(
          '__menu-layout',
          `__page-${routeName.toLowerCase()}`,
          menuLayoutStyle.core,
          isMinimized && menuLayoutStyle.minimized,
        )}
      >
        <MenuPanel
          routeName={routeName}
        />
        <div className={classNames('__menu-layout_content', menuLayoutStyle.content)}>
          {children}
          {isConnectionError && (
            <div className={classNames('__menu-layout_overlay', menuLayoutStyle.overlay)}>
              <OverlayNotification
                color='red'
                image='screen-error'
                description={[
                  i18n._(
                    'MenuLayout.networkError.description0',
                    null,
                    { defaults: 'Internet connection error.' },
                  ),
                  i18n._(
                    'MenuLayout.networkError.description1',
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
