// @flow strict

import React from 'react'
import { t } from 'ttag'

import { JIcon } from 'components/base'

import itemStyles from './multiAddressWalletItem.m.scss'

type Props = {
  +title: string,
  +addressCount: number,
  +isOpen: boolean,
}

export function MultiAddressWalletItem({
  title,
  addressCount,
  isOpen,
}: Props) {
  return (
    <div className={itemStyles.core}>
      <JIcon name='wallet-use-fill' color='gray' className={itemStyles.icon} />
      <div className={itemStyles.wrap}>
        <span className={itemStyles.title}>{title}</span>
        <span className={itemStyles.description}>{t`${addressCount} addresses`}</span>
      </div>
      <JIcon name={isOpen ? 'chevron-up-use-fill' : 'chevron-down-use-fill'} color='blue' />
    </div>
  )
}

MultiAddressWalletItem.defaultProps = {
  isOpen: false,
}
