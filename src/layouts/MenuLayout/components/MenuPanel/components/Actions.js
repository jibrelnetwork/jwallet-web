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
      <nav className={`__actions ${menuPanelStyle.actions}`}>
        <ul>
          <Action
            label={t`Home`}
            href='/'
            iconName='home'
          />
          <Action
            label={t`History`}
            href='/history'
            iconName='history'
          />
          <Action
            label={t`Contacts`}
            href='/contacts'
            iconName='contact'
          />
          <Action
            label={t`More`}
            href='/more'
            iconName='more'
          />
        </ul>
      </nav>
    )
  }
}
