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

export function Failed(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    note,
    timestamp,
    hasInput,
  }: CardProps = props

  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <div className={styles.card}>
        <div className={classNames(styles.header, styles.error)}>
          <div className={styles.status}>
            <JIcon name='ic_trx_error_declined_24-use-fill' />
          </div>
          <div className={styles.description}>
            <div className={styles.title}>
              {i18n._(
                'HistoryItemDetails.Failed.title',
                null,
                { defaults: 'Error' },
              )}
            </div>
            <div className={styles.subtitle}>
              {hasInput
                ? i18n._(
                  'HistoryItemDetails.Failed.subtitle.transfer',
                  null,
                  { defaults: 'Transfer declined.' },
                ) : i18n._(
                  'HistoryItemDetails.Failed.subtitle.another',
                  null,
                  { defaults: 'Contract Call declined.' },
                )
              }
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
