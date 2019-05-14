// @flow

import React, { PureComponent } from 'react'
import { t } from 'ttag'

import { JLink } from 'components/base'

import {
  ACTIONS,
  type WalletAction,
} from 'pages/WalletsStart/actions'

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
      <div className={`__new-wallet-buttons ${newWalletButtonsStyle.core}`}>
        <JLink
          onClick={this.handleClickCreate}
          className={newWalletButtonsStyle.create}
          href='/wallets/create'
        >
          {t`Create Wallet`}
        </JLink>
        <span className={newWalletButtonsStyle.text}>
          {t`Create your own wallet to manage your digital assets`}
        </span>
        <JLink
          onClick={this.handleClickImport}
          className={newWalletButtonsStyle.import}
          href='/wallets/import'
        >
          {t`Import Wallet`}
        </JLink>
        <span className={newWalletButtonsStyle.text}>
          {t`Import an existing wallet with backup phrase, private key, etc.`}
        </span>
      </div>
    )
  }
}
