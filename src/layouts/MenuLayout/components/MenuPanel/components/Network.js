// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'
import { connect } from 'react-redux'

import { JIcon } from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {|
  networkId?: 'ropsten' | 'rinkeby' | 'kovan' | null,
|}

export function NetworkView({
  networkId,
}: Props) {
  if (!networkId) {
    return null
  }

  const i18n = useI18n()

  const messages = {
    ropsten: i18n._(
      'layout.MenuLayout.MenuPanel.testNetwork.info',
      { networkName: 'Ropsten' },
      { defaults: 'You Are Using {networkName} Test Network' },
    ),
    rinkeby: i18n._(
      'layout.MenuLayout.MenuPanel.testNetwork.info',
      { networkName: 'Rinkeby' },
    ),
    kovan: i18n._(
      'layout.MenuLayout.MenuPanel.testNetwork.info',
      { networkName: 'Kovan' },
    ),
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
