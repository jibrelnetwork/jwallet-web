// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'

import styles from '../../historyItemDetails.m.scss'
import { NoteField } from '../NoteField/NoteField'
import { type CardProps } from '../../HistoryItemDetails'
import { BaseFieldSet } from '../BaseFieldSet/BaseFieldSet'

export function Pending(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    note,
    isPage,
    hasInput,
  }: CardProps = props

  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <div className={styles.card}>
        <div className={classNames(styles.header, styles.pending)}>
          <div className={styles.status}>
            <JIcon name='ic_trx_pending_24-use-fill' />
          </div>
          <div className={classNames(styles.description, isPage && styles.wide)}>
            <div className={styles.title}>
              {i18n._(
                'HistoryItemDetails.Pending.title',
                null,
                { defaults: 'Pending' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                null,
              )}
              {hasInput
                ? i18n._(
                  'HistoryItemDetails.Pending.subtitle.input',
                  null,
                  { defaults: 'Transfer is being processed. This may take some time.' },
                ) : i18n._(
                  'HistoryItemDetails.Pending.subtitle.another',
                  null,
                  { defaults: 'Contract Call stuck.' },
                )
              }
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
