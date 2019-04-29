// @flow strict

import * as React from 'react'

import balanceStyles from './walletBalance.m.scss'

type Props = {|
  fiatBalance: ?string,
|}

export function WalletBalance({
  fiatBalance,
}: Props) {
  if (fiatBalance) {
    return (
      <div className={balanceStyles.core}>
        <span className={balanceStyles.balance}>{fiatBalance}</span>
      </div>
    )
  } else {
    return null
  }
}
