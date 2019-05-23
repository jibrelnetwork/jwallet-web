// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import { WalletCard } from 'components'
import { checkMnemonicType } from 'utils/wallets'
import { generateAddresses } from 'utils/mnemonic'
import { getShortenedAddress } from 'utils/address'

import {
  handle,
  ignoreEvent,
} from 'utils/eventHandlers'

export type Props = {|
  +backupWallet: (WalletId) => void,
  +renameWallet: (WalletId) => void,
  +deleteWallet: (WalletId) => void,
  +setActiveWallet: (WalletId) => void,
  +simplifyWallet: (WalletId, boolean) => void,
  +items: Wallets,
|}

class WalletsIndexView extends Component<Props> {
  render() {
    const {
      backupWallet,
      renameWallet,
      deleteWallet,
      simplifyWallet,
      setActiveWallet,
      items,
    }: Props = this.props

    return (
      <div className='wallets-view -index'>
        <div className='content'>
          <div className='wallets'>
            {items.map((item) => {
              const {
                id,
                name,
                type,
                xpub,
                address,
                isReadOnly,
                isSimplified,
              }: Wallet = item

              const isMnemonic: boolean = checkMnemonicType(type)

              const walletAddress: ?Address = isMnemonic && xpub
                ? generateAddresses(xpub, 0, 1)[0]
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
        </div>
      </div>
    )
  }
}

export default WalletsIndexView
