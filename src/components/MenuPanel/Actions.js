// @flow

import classNames from 'classnames'
import React, { Component } from 'react'
import { t } from 'ttag'

import {
  JIcon,
  JLink,
} from 'components/base'

import menuPanelStyle from './menuPanel.m.scss'

type Props = {|
  +routeName: string,
|}

export class Actions extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const { routeName }: Props = this.props

    if (routeName !== nextProps.routeName) {
      return true
    }

    return false
  }

  render() {
    return (
      <nav className={classNames('__menu-panel_actions', menuPanelStyle.actions)}>
        <ol>
          <li>
            <JLink
              href='/'
              activeClassName={menuPanelStyle.active}
              className={classNames('__menu-panel_action', menuPanelStyle.action)}
            >
              <JIcon name='home' size='medium' />
              <span className={classNames('__menu-panel_label', menuPanelStyle.label)}>
                {t`Home`}
              </span>
            </JLink>
          </li>
          <li>
            <JLink
              href='/history'
              activeClassName={menuPanelStyle.active}
              className={classNames('__menu-panel_action', menuPanelStyle.action)}
            >
              <JIcon name='history' size='medium' />
              <span className={classNames('__menu-panel_label', menuPanelStyle.label)}>
                {t`History`}
              </span>
            </JLink>
          </li>
          <li>
            <JLink
              href='/contacts'
              activeClassName={menuPanelStyle.active}
              className={classNames('__menu-panel_action', menuPanelStyle.action)}
            >
              <JIcon name='contact' size='medium' />
              <span className={classNames('__menu-panel_label', menuPanelStyle.label)}>
                {t`Contacts`}
              </span>
            </JLink>
          </li>
          <li>
            <JLink
              href='/more'
              activeClassName={menuPanelStyle.active}
              className={classNames('__menu-panel_action', menuPanelStyle.action)}
            >
              <JIcon name='more' size='medium' />
              <span className={classNames('__menu-panel_label', menuPanelStyle.label)}>
                {t`More`}
              </span>
            </JLink>
          </li>
        </ol>
      </nav>
    )
  }
}
