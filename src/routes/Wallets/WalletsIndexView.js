// @flow

import React, { Component } from 'react'

import JCard from 'components/base/JCard'
import { handle, ignoreEvent } from 'utils/eventHandlers'
import { checkMnemonicType, getShortenedAddress } from 'utils/wallets'
import { WalletCard, WalletHeader, NewWalletButtons } from 'components'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +createWallet: () => void,
  +importWallet: () => void,
  +backupWallet: (WalletId) => void,
  +renameWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  +setActiveWallet: (WalletId) => void,
  +items: Wallets,
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
      backupWallet,
      renameWallet,
      deleteWallet,
      setActiveWallet,
      items,
    }: Props = this.props

    return (
      <div className='wallets-view -index'>
        <WalletHeader />
        <div className='content'>
          {items.map((item) => {
            const {
              id,
              name,
              type,
              address,
              isReadOnly,
            }: Wallet = item

            const isMnemonic: boolean = checkMnemonicType(type)

            const description: string = (!isMnemonic && address)
              ? getShortenedAddress(address)
              : 'Mnemonic, many addresses'

            return (
              <div key={item.id} className='wallet'>
                <JCard color='blue'>
                  <WalletCard
                    setActive={handle(setActiveWallet)(id)}
                    rename={ignoreEvent(renameWallet)(id)}
                    remove={ignoreEvent(deleteWallet)(id)}
                    backup={isReadOnly ? null : ignoreEvent(backupWallet)(id)}
                    type={type}
                    title={name}
                    description={isReadOnly ? `${description}, read only` : description}
                    isReadOnly={isReadOnly}
                  />
                </JCard>
              </div>
            )
          })}
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
