// @flow strict

import React from 'react'

import balanceStyles from './walletBalance.m.scss'

type Props = {|
  fiatBalance: ?string,
|}

export function WalletBalance({
  fiatBalance,
}: Props) {
  if (!fiatBalance) {
    return null
  }

  return (
    <div className={balanceStyles.core}>
      <span className={balanceStyles.balance}>{fiatBalance}</span>
    </div>
  )
}
