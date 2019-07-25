// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'

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
  const i18n = useI18n()

  return (
    <div className={multiAddressWalletItemStyles.core}>
      <JIcon name='wallet-use-fill' color='gray' className={multiAddressWalletItemStyles.icon} />
      <div className={multiAddressWalletItemStyles.wrap}>
        <span className={multiAddressWalletItemStyles.title}>{title}</span>
        <span className={multiAddressWalletItemStyles.description}>
          {i18n._(
            'Send.RecipientPicker.addressQuantity',
            { addressCount },
            { defaults: '{addressCount} addresses' },
          )}
        </span>
      </div>
      <JIcon name={`${isOpen ? 'chevron-up' : 'chevron-down'}-use-fill`} color='blue' />
    </div>
  )
}

MultiAddressWalletItem.defaultProps = {
  isOpen: false,
}
