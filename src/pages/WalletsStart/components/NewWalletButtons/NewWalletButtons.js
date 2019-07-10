// @flow strict

import React, {
  PureComponent,
  Fragment,
} from 'react'

import { i18n } from 'i18n/lingui'

import { JLink } from 'components/base'

import {
  ACTIONS,
  type WalletAction,
} from 'pages/WalletsStart/constants'

import newWalletButtonsStyle from './newWalletButtons.m.scss'

type Props = {|
  +onClick: (WalletAction) => void,
|}

export class NewWalletButtons extends PureComponent<Props> {
  handleClickCreate = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault()

    this.props.onClick(ACTIONS.CREATE)
  }

  handleClickImport = (event: SyntheticEvent<HTMLDivElement>) => {
    event.preventDefault()

    this.props.onClick(ACTIONS.IMPORT)
  }

  render() {
    return (
      <Fragment>
        <JLink
          onClick={this.handleClickCreate}
          className={`__create-button ${newWalletButtonsStyle.create}`}
          href='/wallets/create'
          theme='button-general'
        >
          {i18n._(
            'WalletsStart.createWallet.action',
            null,
            { defaults: 'Create Wallet' },
          )}
        </JLink>
        <div className={newWalletButtonsStyle.text}>
          {i18n._(
            'WalletsStart.createWallet.description',
            null,
            { defaults: 'Create your own wallet to manage your digital assets' },
          )}
        </div>
        <JLink
          onClick={this.handleClickImport}
          className={`__import-button ${newWalletButtonsStyle.import}`}
          href='/wallets/import'
          theme='button-secondary'
        >
          {i18n._(
            'WalletsStart.importWallet.action',
            null,
            { defaults: 'Import Wallet' },
          )}
        </JLink>
        <div className={newWalletButtonsStyle.text}>
          {i18n._(
            'WalletsStart.importWallet.description',
            null,
            { defaults: 'Import an existing wallet with backup phrase, private key, etc.' },
          )}
        </div>
      </Fragment>
    )
  }
}
