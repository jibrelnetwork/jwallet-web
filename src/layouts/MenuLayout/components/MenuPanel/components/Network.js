// @flow strict

import React from 'react'
import { t } from 'ttag'
import { connect } from 'react-redux'

import { JIcon } from 'components/base'

import menuPanelStyle from '../menuPanel.m.scss'

type Props = {
  networkId?: 'ropsten' | 'rinkeby' | 'kovan' | null,
}

const messages = {
  ropsten: t`You Are Using Ropsten Test Network`,
  rinkeby: t`You Are Using Rinkeby Test Network`,
  kovan: t`You Are Using Kovan Test Network`,
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

export const Network = connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(
  // FIXME: connect to real network setting
  () => ({}),
  null,
)(NetworkView)
