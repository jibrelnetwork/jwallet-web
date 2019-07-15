// @flow strict

import React, {
  Fragment,
  Component,
} from 'react'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { StartLayout } from 'layouts'
import { WalletsCreate } from 'pages/WalletsCreate/WalletsCreate'
import { WalletsImport } from 'pages/WalletsImport/WalletsImport'

import {
  ACTIONS,
  type WalletAction,
} from 'pages/WalletsStart/constants'

import walletsStartStyle from './walletsStart.m.scss'
import { NewWalletButtons } from './components/NewWalletButtons/NewWalletButtons'

type Props = {|
  +i18n: I18nType,
|}

type StateProps = {|
  +action: ?WalletAction,
|}

class WalletsStartComponent extends Component<Props, StateProps> {
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
    const { i18n } = this.props

    /* eslint-disable react/no-danger */
    return (
      <StartLayout
        className='__first-wallet'
        hasNoLogo={!!action}
      >
        {!action && (
          <Fragment>
            <h1
              className={walletsStartStyle.title}
              dangerouslySetInnerHTML={{
                __html: i18n._(
                  'WalletsStart.SelectScenario.title',
                  null,
                  { defaults: 'Create a new wallet or import an existing<br> to get started' },
                ),
              }}
            />
            <NewWalletButtons onClick={this.handleClick} />
          </Fragment>
        )}
        {(action === ACTIONS.CREATE) && <WalletsCreate onBack={this.handleClick} />}
        {(action === ACTIONS.IMPORT) && <WalletsImport onBack={this.handleClick} />}
      </StartLayout>
    )
    /* eslint-enable react/no-danger */
  }
}

export const WalletsStart = withI18n()(
  WalletsStartComponent,
)
