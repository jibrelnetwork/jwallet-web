// @flow

import React, { Component } from 'react'

import JCard from 'components/base/JCard'
import WalletHeader from 'components/WalletHeader'

import WalletCard from 'components/WalletCard'
import NewWalletButtons from 'components/NewWalletButtons'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +createWallet: () => void,
  +importWallet: () => void,
  +renameWallet: (WalletId) => void,
  +backupWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  +toggleWallet: (WalletId) => void,
  +setActiveWallet: (WalletId) => void,
  +items: Wallets,
  +toggledWalletId: WalletId,
|}

class WalletsIndexView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      createWallet,
      importWallet,
      renameWallet,
      backupWallet,
      deleteWallet,
      toggleWallet,
      setActiveWallet,
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
                  renameWallet={renameWallet}
                  backupWallet={backupWallet}
                  deleteWallet={deleteWallet}
                  toggleWallet={toggleWallet}
                  setActiveWallet={setActiveWallet}
                  walletData={item}
                  isToggled={toggledWalletId === item.id}
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
