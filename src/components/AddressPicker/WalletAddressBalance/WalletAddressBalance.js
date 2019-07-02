// @flow strict

import * as React from 'react'

import style from './walletAddressBalance.m.scss'

type Props = {|
  address: ?string,
  fiatBalance: ?string,
|}

function WalletAddressBalance({
  address,
  fiatBalance,
}: Props) {
  if (fiatBalance) {
    return (
      <div className={style.core}>
        <span className={style.balance}>{fiatBalance}</span>
        <span className={style.address}>{address}</span>
      </div>
    )
  } else {
    return null
  }
}

export { WalletAddressBalance }
