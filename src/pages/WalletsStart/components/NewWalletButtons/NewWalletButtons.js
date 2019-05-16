// @flow

import React, {
  PureComponent,
  Fragment,
} from 'react'
import { t } from 'ttag'

import { JLink } from 'components/base'
import jRaisedButtonStyle from 'components/base/JRaisedButton/jRaisedButton.m.scss'

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
          className={`__create-button 
            ${jRaisedButtonStyle.core} 
            ${jRaisedButtonStyle.blue} 
            ${newWalletButtonsStyle.create}`}
          href='/wallets/create'
        >
          {t`Create Wallet`}
        </JLink>
        <div className={newWalletButtonsStyle.text}>
          {t`Create your own wallet to manage your digital assets`}
        </div>
        <JLink
          onClick={this.handleClickImport}
          className={`__import-button 
            ${jRaisedButtonStyle.core} 
            ${jRaisedButtonStyle.white} 
            ${newWalletButtonsStyle.import}`}
          href='/wallets/import'
        >
          {t`Import Wallet`}
        </JLink>
        <div className={newWalletButtonsStyle.text}>
          {t`Import an existing wallet with backup phrase, private key, etc.`}
        </div>
      </Fragment>
    )
  }
}
