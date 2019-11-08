// @flow strict

import React, {
  Fragment,
  PureComponent,
} from 'react'

import { withI18n } from '@lingui/react'
import { type I18n } from '@lingui/core'

import JLink from 'components/base/JLink'

import {
  ACTIONS,
  type WalletAction,
} from 'pages/WalletsStart/constants'

import styles from './newWalletButtons.m.scss'

type Props = {|
  +onClick: (WalletAction) => void,
  +i18n: I18n,
|}

export default class NewWalletButtons extends PureComponent<Props> {
  handleClickCreate = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    this.props.onClick(ACTIONS.CREATE)
  }

  handleClickImport = (event: SyntheticEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    this.props.onClick(ACTIONS.IMPORT)
  }

  render() {
    const { i18n }: Props = this.props

    return (
      <Fragment>
        <JLink
          onClick={this.handleClickCreate}
          className={`__create-button ${styles.create}`}
          href='/wallets/create'
          theme='button-general'
        >
          {i18n._(
            'WalletsStart.createWallet.action',
            null,
            { defaults: 'Create Wallet' },
          )}
        </JLink>
        <div className={styles.text}>
          {i18n._(
            'WalletsStart.createWallet.description',
            null,
            { defaults: 'Create your own wallet to manage your digital assets' },
          )}
        </div>
        <JLink
          onClick={this.handleClickImport}
          className={`__import-button ${styles.import}`}
          href='/wallets/import'
          theme='button-secondary'
        >
          {i18n._(
            'WalletsStart.importWallet.action',
            null,
            { defaults: 'Import Wallet' },
          )}
        </JLink>
        <div className={styles.text}>
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

export const NewWalletButtonsEnhance = withI18n()(NewWalletButtons)
