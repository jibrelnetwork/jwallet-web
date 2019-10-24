// @flow strict

import * as React from 'react'

import assetBalanceStyles from './assetBalance.m.scss'

type Props = {|
  assetBalance: ?string,
  fiatBalance: ?string,
|}

function AssetBalance({
  assetBalance,
  fiatBalance,
}: Props) {
  if (assetBalance) {
    return (
      <div className={assetBalanceStyles.core}>
        <span className={assetBalanceStyles.asset}>{assetBalance}</span>
        {fiatBalance && <span className={assetBalanceStyles.fiat}>{fiatBalance}</span>}
      </div>
    )
  } else {
    return null
  }
}

export { AssetBalance }
