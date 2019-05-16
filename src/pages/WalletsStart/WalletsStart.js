// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'

import { t } from 'ttag'

import { StartLayout } from 'layouts'
import { NewWalletButtons } from 'components'
import { WalletsCreate } from 'pages/WalletsCreate/WalletsCreate'
import { WalletsImport } from 'pages/WalletsImport/WalletsImport'

import {
  ACTIONS,
  type WalletAction,
} from 'pages/WalletsStart/constants'

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

  handleClick = (action?: ?WalletAction = null) => {
    this.setState({ action })
  }

  render() {
    const { action } = this.state

    return (
      <StartLayout
        className='__first-wallet'
        hasNotLogo={!!action}
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
        {(action === ACTIONS.IMPORT) && <WalletsImport onBack={this.handleClick} />}
      </StartLayout>
    )
  }
}
