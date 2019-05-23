// @flow strict

import React from 'react'

import { WalletCard } from 'components'

import walletsStyles from './wallets.m.scss'

type Props = {|
  +items: Wallets,
  +activeWalletId: WalletId,
|}

export function WalletsView({
  items,
  activeWalletId,
}: Props) {
  return (
    <div className={walletsStyles.core}>
      <div className={walletsStyles.content}>
        <div className={walletsStyles.wallets}>
          {items.map(({ id }: Wallet) => (
            <WalletCard
              id={id}
              key={id}
              activeWalletId={activeWalletId}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
