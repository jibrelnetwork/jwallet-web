// @flow strict

import React from 'react'
import { t } from 'ttag'

import { JIcon } from 'components/base'

import multiAddressWalletItemStyles from './multiAddressWalletItem.m.scss'

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
    <div className={multiAddressWalletItemStyles.core}>
      <JIcon name='wallet-use-fill' color='gray' className={multiAddressWalletItemStyles.icon} />
      <div className={multiAddressWalletItemStyles.wrap}>
        <span className={multiAddressWalletItemStyles.title}>{title}</span>
        <span className={multiAddressWalletItemStyles.description}>
          {t`${addressCount} addresses`}
        </span>
      </div>
      <JIcon name={`${isOpen ? 'chevron-up' : 'chevron-down'}-use-fill`} color='blue' />
    </div>
  )
}

MultiAddressWalletItem.defaultProps = {
  isOpen: false,
}
