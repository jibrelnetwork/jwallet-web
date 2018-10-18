// @flow

import React from 'react'

import JCard from 'components/base/JCard'
import WalletHeader from 'components/WalletHeader'

import WalletCard from 'components/WalletCard'
import NewWalletButtons from 'components/NewWalletButtons'

type Props = {|
  +toggleWallet: Function,
  +createWallet: Function,
  +importWallet: Function,
  // +setActiveWallet: Function,
  +items: Wallets,
  +toggledWalletId: WalletId,
|}

const WalletsIndexView = ({
  toggleWallet,
  createWallet,
  importWallet,
  items,
  toggledWalletId,
}: Props) => (
  <div className='wallets-index-view'>
    <WalletHeader />
    <div className='content'>
      {items.map(item => (
        <div key={item.id} className='wallet'>
          <JCard color='blue'>
            <WalletCard
              toggleWallet={toggleWallet}
              walletData={item}
              toggledWalletId={toggledWalletId}
            />
          </JCard>
        </div>
      ))}
      <NewWalletButtons
        createWallet={createWallet}
        importWallet={importWallet}
      />
    </div>
  </div>
)

export default WalletsIndexView
