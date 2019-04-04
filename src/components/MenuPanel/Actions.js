// @flow

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
      <nav className={`__actions ${menuPanelStyle.actions}`}>
        <ul>
          <li>
            <JLink
              href='/'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='home-use-fill' />
              <span className={menuPanelStyle.label}>
                {t`Home`}
              </span>
            </JLink>
          </li>
          <li>
            <JLink
              href='/history'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='history-use-fill' />
              <span className={menuPanelStyle.label}>
                {t`History`}
              </span>
            </JLink>
          </li>
          <li>
            <JLink
              href='/contacts'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='contact-use-fill' />
              <span className={menuPanelStyle.label}>
                {t`Contacts`}
              </span>
            </JLink>
          </li>
          <li>
            <JLink
              href='/more'
              className={menuPanelStyle.action}
              activeClassName={menuPanelStyle.active}
            >
              <JIcon name='more-use-fill' />
              <span className={menuPanelStyle.label}>
                {t`More`}
              </span>
            </JLink>
          </li>
        </ul>
      </nav>
    )
  }
}
