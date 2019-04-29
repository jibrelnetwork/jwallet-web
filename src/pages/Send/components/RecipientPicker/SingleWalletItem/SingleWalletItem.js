// @flow strict

import * as React from 'react'

import { JIcon } from 'components/base'

import { WalletBalance } from '../WalletBalance/WalletBalance'
import itemStyles from './singleWalletItem.m.scss'

type Props = {
  +title: string,
  +fiatBalance: string,
}

export function SingleWalletItem({
  title,
  fiatBalance,
}: Props) {
  return (
    <div className={itemStyles.core}>
      <JIcon name='wallet' color='blue' className={itemStyles.icon} />
      <div className={itemStyles.wrap}>
        <span className={itemStyles.title}>{title}</span>
      </div>
      <WalletBalance
        fiatBalance={fiatBalance}
      />
    </div>
  )
}
