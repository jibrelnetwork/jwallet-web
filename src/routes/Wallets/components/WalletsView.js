// @flow

import React from 'react'

import { NewWalletButtons, WalletHeader, WalletManager } from 'components'

const WalletsView = (props: Props) => (
  <div className='wallets-view'>
    <WalletHeader />
    <div className='content'>
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
  invalidFields: FormFields,
  items: Wallets,
  password: Password,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

WalletsView.defaultProps = {
  toggleWallet: () => {},
  showActionsMenu: () => {},
  setWalletAction: () => {},
  setPassword: () => {},
  setActive: () => {},
  createWallet: () => {},
  importWallet: () => {},
  invalidFields: {},
  items: [],
  password: '',
  toggledWalletId: null,
  showActionsWalletId: null,
}

export default WalletsView
