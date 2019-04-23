// @flow strict

import React, { Component } from 'react'
import { t } from 'ttag'

import menuPanelStyle from '../menuPanel.m.scss'
import { Action } from './Action'

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
      <nav className={`__actions ${menuPanelStyle.actionsWrapper}`}>
        <ul className={`__primary ${menuPanelStyle.actions} ${menuPanelStyle.primary}`}>
          <li>
            <Action
              label={t`Home`}
              href='/'
              iconName='home'
            />
          </li>
          <li>
            <Action
              label={t`History`}
              href='/history'
              iconName='history'
            />
          </li>
          <li>
            <Action
              label={t`Contacts`}
              href='/contacts'
              iconName='contact'
            />
          </li>
          <li>
            <Action
              label={t`More`}
              href='/more'
              iconName='more'
            />
          </li>
        </ul>
        <ul className={`__secondary ${menuPanelStyle.actions} ${menuPanelStyle.secondary}`}>
          <li>
            <Action
              label={t`Settings`}
              href='/settings'
              iconName='settings'
            />
          </li>
        </ul>
      </nav>
    )
  }
}
