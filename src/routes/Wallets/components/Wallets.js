import React from 'react'

import WalletHeader from 'components/__new__/WalletHeader'

import Wallet from './Wallet'
import NewWalletButtons from './NewWalletButtons'

const WalletsView = (props: Props) => (
  <div className='content'>
    <div className='wallet-header-wrapper'>
      <WalletHeader />
    </div>
    <div>
      {props.items.map(item => <Wallet key={item.id} walletData={item} {...props} />)}
      <NewWalletButtons />
    </div>
  </div>
)

type Props = {
  toggleWallet: (walletId: WalletId) => Dispatch,
  showActionsMenu: (walletId: WalletId) => Dispatch,
  setWalletAction: (walletAction: WalletAction) => Dispatch,
  setPassword: (password: Password) => Dispatch,
  setActive: () => Dispatch,
  invalidFields: Object,
  items: Wallets,
  password: Password,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

export default WalletsView
