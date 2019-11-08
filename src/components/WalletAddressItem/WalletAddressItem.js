// @flow strict

import React from 'react'

import { JIcon } from 'components/base'

import styles from './walletAddressItem.m.scss'

type Props = {|
  +name: string,
  +address: string,
  +description: string,
  +fiatBalance: string,
|}

export default function WalletAddressItem({
  name,
  address,
  description,
  fiatBalance,
}: Props) {
  return (
    <div className={styles.core}>
      <JIcon className={styles.icon} color='blue' name='0x-use-fill' />
      <div className={styles.wrap}>
        <span className={styles.title}>{name || address}</span>
        <span className={styles.description}>{description}</span>
      </div>
      {fiatBalance &&
      <div className={styles.balance}>
        <span className={styles.value}>{fiatBalance}</span>
      </div>
      }
    </div>
  )
}

WalletAddressItem.defaultProps = {
  name: '',
  description: '',
  fiatBalance: '',
}
