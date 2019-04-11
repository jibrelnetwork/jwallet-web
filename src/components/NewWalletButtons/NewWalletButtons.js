// @flow

import React from 'react'
import { t } from 'ttag'

import { JLink } from 'components/base'

import newWalletButtonsStyle from './newWalletButtons.m.scss'

export function NewWalletButtons() {
  return (
    <div className={`__new-wallet-buttons ${newWalletButtonsStyle.core}`}>
      <JLink
        className={newWalletButtonsStyle.create}
        href='/wallets/create'
      >
        {t`Create Wallet`}
      </JLink>
      <span className={newWalletButtonsStyle.text}>
        {t`Create your own wallet to manage your digital assets`}
      </span>
      <JLink
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
