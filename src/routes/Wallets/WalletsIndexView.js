// @flow

import React, { Component } from 'react'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'
import getShortenedAddress from 'utils/address/getShortenedAddress'

import {
  WalletCard,
  WalletHeader,
  NewWalletButtons,
} from 'components'

import {
  handle,
  ignoreEvent,
} from 'utils/eventHandlers'

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
          <div className='wallets'>
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
                </div>
              )
            })}
          </div>
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
