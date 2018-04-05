/* @flow */

import React from 'react'

import { NewWalletButtons, WalletManager } from 'components'

const WalletsWithNewButtons = (props: Props) => (
  <div className='wallets-with-new-buttons'>
    {props.items.map(item => (
      <div key={item.id} className='wallet'>
        <WalletManager walletData={item} {...props} />
      </div>
    ))}
    <NewWalletButtons
      createWallet={props.createWallet}
      importWallet={props.importWallet}
    />
  </div>
)

type Props = {
  toggleWallet: (walletId: WalletId) => Dispatch,
  showActionsMenu: (walletId: WalletId) => Dispatch,
  setWalletAction: (walletAction: WalletAction) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setActive: () => Dispatch,
  createWallet: () => Dispatch,
  importWallet: () => Dispatch,
  invalidFields: Object,
  items: Wallets,
  password: Password,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

export default WalletsWithNewButtons
