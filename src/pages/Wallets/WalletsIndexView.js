// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import checkMnemonicType from 'utils/wallets/checkMnemonicType'
import generateAddresses from 'utils/mnemonic/generateAddresses'
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
  +simplifyWallet: (WalletId, boolean) => void,
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
      simplifyWallet,
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
                isSimplified,
                bip32XPublicKey,
              }: Wallet = item

              const isMnemonic: boolean = checkMnemonicType(type)

              const walletAddress: ?Address = isMnemonic && bip32XPublicKey
                ? generateAddresses(bip32XPublicKey, 0, 1)[0]
                : address

              if (!walletAddress) {
                // throw new Error('WalletDataError')
                return null
              }

              const description: string = isMnemonic && !isSimplified
                ? t`Mnemonic, many addresses`
                : getShortenedAddress(walletAddress)

              const textReadOnly = t`read only`

              return (
                <div key={item.id} className='wallet'>
                  <WalletCard
                    setActive={handle(setActiveWallet)(id)}
                    rename={ignoreEvent(renameWallet)(id)}
                    remove={ignoreEvent(deleteWallet)(id)}
                    backup={isReadOnly ? null : ignoreEvent(backupWallet)(id)}
                    simplify={!isMnemonic ? null : ignoreEvent(simplifyWallet)(id, !isSimplified)}
                    type={type}
                    title={name}
                    description={isReadOnly ? `${description}, ${textReadOnly}` : description}
                    isReadOnly={isReadOnly}
                    isSimplified={isSimplified}
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
