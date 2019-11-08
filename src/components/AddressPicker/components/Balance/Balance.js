// @flow strict

import * as React from 'react'

import styles from './balance.m.scss'

type Props = {|
  +address: ?string,
  +fiatBalance: ?string,
|}

export default function Balance({
  address,
  fiatBalance,
}: Props) {
  if (!fiatBalance) {
    return null
  }

  return (
    <div className={styles.core}>
      <div className={styles.balance}>{fiatBalance}</div>
      <div className={styles.address}>{address}</div>
    </div>
  )
}
