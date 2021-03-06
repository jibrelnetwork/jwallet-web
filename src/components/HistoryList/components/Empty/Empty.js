// @flow strict

import React from 'react'
import { type I18n } from '@lingui/core'

import noTransactionsImg from 'public/assets/pic_transactions_112.svg'
import { useI18n } from 'app/hooks'

import styles from './empty.m.scss'

type Props = {|
  +isFiltered: boolean,
|}

export function Empty({ isFiltered }: Props) {
  const i18n: I18n = useI18n()

  return (
    <div className={styles.core}>
      <figure className={styles.info}>
        <img
          src={noTransactionsImg}
          className={styles.image}
          alt=''
          aria-disabled
        />
        <figcaption>
          {isFiltered ? i18n._(
            'HistoryList.Empty.text.filtered',
            null,
            { defaults: 'No Search Results.' },
          ) : i18n._(
            'HistoryList.Empty.text',
            null,
            { defaults: 'Looks like you haven\'t made any transactions yet.' },
          )}
        </figcaption>
      </figure>
    </div>
  )
}

Empty.defaultProps = {
  isFiltered: false,
}
