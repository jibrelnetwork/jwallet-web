// @flow strict

import React from 'react'
import { i18n } from 'i18n/lingui'
import { connect } from 'react-redux'

import { JIcon } from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {|
  networkId?: 'ropsten' | 'rinkeby' | 'kovan' | null,
|}

const messages = {
  ropsten: i18n._(
    'Menu.network.ropsten',
    null,
    { defaults: 'You Are Using Ropsten Test Network' },
  ),
  rinkeby: i18n._(
    'Menu.network.rinkeby',
    null,
    { defaults: 'You Are Using Rinkeby Test Network' },
  ),
  kovan: i18n._(
    'Menu.network.kovan',
    null,
    { defaults: 'You Are Using Kovan Test Network' },
  ),
}

export function NetworkView({
  networkId,
}: Props) {
  if (!networkId) {
    return null
  }

  return (
    <aside className={menuPanelStyle.network}>
      <JIcon
        name='ic_info-use-fill'
        color='white'
        className={menuPanelStyle.networkIcon}
      />
      <span className={menuPanelStyle.networkDescription}>
        {messages[networkId]}
      </span>
    </aside>
  )
}

NetworkView.defaultProps = {
  networkId: null,
}

export const Network = connect< Props, OwnPropsEmpty, _, _, _, _ >(
  // FIXME: connect to real network setting
  () => ({}),
  null,
)(NetworkView)
