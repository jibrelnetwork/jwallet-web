// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'

import { t } from 'ttag'

import { WalletsCreate } from 'pages/WalletsCreate/WalletsCreate'
import { WalletsImport } from 'pages/WalletsImport/WalletsImport'

import {
  LogoHeader,
  NewWalletButtons,
} from 'components'

import walletsStartStyle from './walletsStart.m.scss'

export type WalletAction = 'CREATE' | 'IMPORT'
type WalletActions = { [WalletAction]: WalletAction }

type Props = {||}

type StateProps = {|
  +action: ?WalletAction,
|}

export const ACTIONS: WalletActions = {
  CREATE: 'CREATE',
  IMPORT: 'IMPORT',
}

export class WalletsStart extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      action: null,
    }
  }

  handleClick = (action?: ?WalletAction = null) => {
    this.setState({ action })
  }

  render() {
    const { action } = this.state

    return (
      <div className={`__wallets-start ${walletsStartStyle.core}`}>
        {!action && (
          <Fragment>
            <LogoHeader />
            <div className={walletsStartStyle.content}>
              <h1 className={walletsStartStyle.title}>
                <span>{t`Create a new wallet or import an existing`}</span>
                <span>{t`to get started`}</span>
              </h1>
              <NewWalletButtons onClick={this.handleClick} />
            </div>
          </Fragment>
        )}
        {(action === ACTIONS.CREATE) && <WalletsCreate />}
        {(action === ACTIONS.IMPORT) && <WalletsImport onBack={this.handleClick} />}
      </div>
    )
  }
}
