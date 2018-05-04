// @flow

import React from 'react'
import { JCard } from 'react-components'

import WalletHeader from 'components/WalletHeader'

import WalletCard from './WalletCard'
import NewWalletButtons from './NewWalletButtons'

const WalletsIndexView = (props: Props) => (
  <div className='wallets-index-view'>
    <WalletHeader />
    <div className='content'>
      {props.items.map(item => (
        <div key={item.id} className='wallet'>
          <JCard color='blue'>
            <WalletCard walletData={item} {...props} />
          </JCard>
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
  setActive: Function,
  setPassword: Function,
  toggleWallet: Function,
  createWallet: Function,
  importWallet: Function,
  showActionsMenu: Function,
  setWalletAction: Function,
  items: Wallets,
  invalidFields: FormFields,
  password: string,
  toggledWalletId: ?WalletId,
  showActionsWalletId: ?WalletId,
}

export default WalletsIndexView
