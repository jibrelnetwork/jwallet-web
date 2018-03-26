import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import { NewWalletButtons, WalletHeader, WalletManager } from 'components/__new__'

const WalletsView = (props: Props) => (
  <div className='content'>
    <div className='wallet-header-wrapper'>
      <WalletHeader />
    </div>
    <div className='wallets-list'>
      <Scrollbars autoHide>
        {props.items.map(item => (
          <div key={item.id} className='wallet-manager-wrapper'>
            <WalletManager walletData={item} {...props} />
          </div>
        ))}
        <NewWalletButtons
          createWallet={props.createWallet}
          importWallet={props.importWallet}
        />
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
  createWallet: () => Dispatch,
  importWallet: () => Dispatch,
  invalidFields: Object,
  items: Wallets,
  password: Password,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

export default WalletsView
