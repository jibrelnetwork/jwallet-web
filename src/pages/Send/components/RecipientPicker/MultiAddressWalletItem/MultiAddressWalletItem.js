// @flow strict

import React from 'react'
import { type I18n } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'

import styles from './multiAddressWalletItem.m.scss'

type Props = {|
  +title: string,
  +addressCount: number,
  +isOpen: boolean,
|}

export function MultiAddressWalletItem({
  title,
  addressCount,
  isOpen,
}: Props) {
  const i18n: I18n = useI18n()

  return (
    <div className={styles.core}>
      <JIcon
        name='wallet-use-fill'
        className={styles.icon}
      />
      <div className={styles.wrap}>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>
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
