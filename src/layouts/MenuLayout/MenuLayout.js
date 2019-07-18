// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

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
  +i18n: I18nType,
|}

class MenuLayoutComponent extends Component<Props> {
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
      i18n,
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

export const MenuLayout = withI18n()(
  MenuLayoutComponent,
)
