/* @flow */

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import WalletHeader from 'components/__new__/WalletHeader'

import WalletsWithNewButtons from './WalletsWithNewButtons'

const WalletsView = (props: Props) => (
  <div className='wallets-view'>
    <div className='header'>
      <WalletHeader />
    </div>
    <div className='list'>
      <Scrollbars autoHide>
        <WalletsWithNewButtons {...props} />
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
