// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { DateTimeFormat } from 'app/components'

import styles from '../../historyItemDetails.m.scss'
import { NoteField } from '../NoteField/NoteField'
import { type CardProps } from '../../HistoryItemDetails'
import { BaseFieldSet } from '../BaseFieldSet/BaseFieldSet'

export function In(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    note,
    timestamp,
  }: CardProps = props

  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <div className={styles.card}>
        <div className={classNames(styles.header, styles.success)}>
          <div className={styles.status}>
            <JIcon name='ic_trx_in_24-use-fill' />
          </div>
          <div className={styles.description}>
            <div className={styles.title}>
              {i18n._(
                'HistoryItemDetails.In.title',
                null,
                { defaults: 'Success' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                'HistoryItemDetails.In.subtitle',
                null,
                { defaults: 'Transfer processed.' },
              )}
            </div>
            <div className={styles.date}>
              <DateTimeFormat value={timestamp * 1000} />
            </div>
          </div>
        </div>
        <BaseFieldSet {...props} />
      </div>
      <NoteField
        onChange={handleEditNote}
        value={note}
      />
    </div>
  )
}
