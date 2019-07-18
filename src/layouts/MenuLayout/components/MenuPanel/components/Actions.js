// @flow strict

import React, { Component } from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import menuPanelStyle from '../menuPanel.m.scss'
import { Action } from './Action'

type Props = {|
  +routeName: string,
  +i18n: I18nType,
|}

class ActionsComponent extends Component<Props> {
  shouldComponentUpdate(nextProps: Props) {
    const { routeName }: Props = this.props

    if (routeName !== nextProps.routeName) {
      return true
    }

    return false
  }

  render() {
    const { i18n } = this.props

    return (
      <nav className={`__actions ${menuPanelStyle.actionsWrapper}`}>
        <ul className={`__primary ${menuPanelStyle.actions} ${menuPanelStyle.primary}`}>
          <li>
            <Action
              label={i18n._(
                'layout.MenuLayout.MenuPanel.link.home',
                null,
                { defaults: 'Home' },
              )}
              href='/'
              iconName='home'
            />
          </li>
          <li>
            <Action
              label={i18n._(
                'layout.MenuLayout.MenuPanel.link.history',
                null,
                { defaults: 'History' },
              )}
              href='/history'
              iconName='history'
            />
          </li>
          <li>
            <Action
              label={i18n._(
                'layout.MenuLayout.MenuPanel.link.contacts',
                null,
                { defaults: 'Contacts' },
              )}
              href='/contacts'
              iconName='contact'
            />
          </li>
          <li>
            <Action
              label={i18n._(
                'layout.MenuLayout.MenuPanel.link.more',
                null,
                { defaults: 'More' },
              )}
              href='/more'
              iconName='more'
            />
          </li>
        </ul>
        <ul className={`__secondary ${menuPanelStyle.actions} ${menuPanelStyle.secondary}`}>
          <li>
            <Action
              label={i18n._(
                'layout.MenuLayout.MenuPanel.link.settings',
                null,
                { defaults: 'Settings' },
              )}
              href='/settings'
              iconName='settings'
            />
          </li>
        </ul>
      </nav>
    )
  }
}

export const Actions = withI18n()(
  ActionsComponent,
)
