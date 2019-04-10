// @flow strict

import React from 'react'
import { t } from 'ttag'

import { JText } from 'components/base'
import { NewWalletButtons } from 'components'

type Props = {|
  +createWallet: () => void,
  +importWallet: () => void,
|}

export function WalletsStartView({
  createWallet,
  importWallet,
}: Props) {
  return (
    <div className='wallets-view -start'>
      <div className='content'>
        <div className='title'>
          <JText size='title' value={t`Create a new key pair or import an existing`} />
          <JText size='title' value={t`one to get started`} />
        </div>
        <div className='buttons'>
          <NewWalletButtons
            createWallet={createWallet}
            importWallet={importWallet}
          />
        </div>
      </div>
    </div>
  )
}
