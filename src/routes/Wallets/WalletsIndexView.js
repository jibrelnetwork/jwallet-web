// @flow

import React, { Component } from 'react'

import JCard from 'components/base/JCard'
import WalletHeader from 'components/WalletHeader'

import WalletCard from 'components/WalletCard'
import NewWalletButtons from 'components/NewWalletButtons'

type Props = {|
  +openView: () => void,
  +createWallet: () => void,
  +importWallet: () => void,
  +toggleWallet: (WalletId) => void,
  +renameWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  /*
  +setActiveWallet: (WalletId) => void,
  */
  +items: Wallets,
  +toggledWalletId: WalletId,
|}

class WalletsIndexView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  render() {
    const {
      createWallet,
      importWallet,
      renameWallet,
      deleteWallet,
      toggleWallet,
      /*
      setActiveWallet,
      */
      items,
      toggledWalletId,
    }: Props = this.props

    return (
      <div className='wallets-index-view'>
        <WalletHeader />
        <div className='content'>
          {items.map(item => (
            <div key={item.id} className='wallet'>
              <JCard color='blue'>
                <WalletCard
                  toggleWallet={toggleWallet}
                  renameWallet={renameWallet}
                  deleteWallet={deleteWallet}
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
  }
}

export default WalletsIndexView
