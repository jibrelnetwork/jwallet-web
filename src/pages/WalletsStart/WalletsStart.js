// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'

import { t } from 'ttag'

import { WalletsCreate } from 'pages/WalletsCreate/WalletsCreate'
import { WalletsImport } from 'pages/WalletsImport/WalletsImport'

import { StartLayout } from 'layouts'

import {
  ACTIONS,
  type WalletAction,
} from 'pages/WalletsStart/constants'

import {
  NewWalletButtons,
} from './components/NewWalletButtons/NewWalletButtons'

import walletsStartStyle from './walletsStart.m.scss'

type Props = {||}

type StateProps = {|
  +action: ?WalletAction,
|}

export class WalletsStart extends Component<Props, StateProps> {
  constructor(props: Props) {
    super(props)

    this.state = {
      action: null,
    }
  }

  handleClick = (action: WalletAction) => {
    this.setState({ action })
  }

  render() {
    const { action } = this.state

    return (
      <StartLayout
        className='__first-wallet'
      >
        {!action && (
          <Fragment>
            <h1
              className={walletsStartStyle.title}
              dangerouslySetInnerHTML={{
                __html: t`Create a new wallet or import an existing<br> to get started`,
              }}
            />
            <NewWalletButtons onClick={this.handleClick} />
          </Fragment>
        )}
        {(action === ACTIONS.CREATE) && <WalletsCreate />}
        {(action === ACTIONS.IMPORT) && <WalletsImport />}
      </StartLayout>
    )
  }
}
