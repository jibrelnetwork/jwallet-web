// @flow strict

import classNames from 'classnames'
import React, { Component } from 'react'
import { t } from 'ttag'

import { OverlayNotification } from 'components'

import menuLayoutStyle from './menuLayout.m.scss'
import { MenuPanel } from './components'
import {
  getMenuMeta,
} from './components/MenuPanel/menuMeta'

type Props = {|
  +openLayout: Function,
  +closeLayout: Function,
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
