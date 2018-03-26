import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { handle, isMnemonicType } from 'utils'
import { WalletHeader, WalletManager } from 'components/__new__'

import Wallet from './Wallet'
import NewWalletButtons from './NewWalletButtons'

const WalletsView = (props: Props) => (
  <div className='content'>
    <div className='wallet-header-wrapper'>
      <WalletHeader />
    </div>
    <div className='wallets-list'>
      <Scrollbars autoHide>
        {props.items.map(item => <WalletManager key={item.id} walletData={item} {...props} />)}
        <NewWalletButtons />
      </Scrollbars>
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
