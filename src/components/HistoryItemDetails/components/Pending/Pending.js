// @flow strict

import React from 'react'
import classNames from 'classnames'
import { type I18n as I18nType } from '@lingui/core'

import { useI18n } from 'app/hooks'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from '../../historyItemDetails.m.scss'
import { NoteField } from '../NoteField/NoteField'
import { BaseFieldSet } from '../BaseFieldSet/BaseFieldSet'
import { type CardProps } from '../../HistoryItemDetailsView'

export function Pending(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    id,
    note,
    isPage,
    isCancel,
  }: CardProps = props

  const i18n: I18nType = useI18n()

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
                'HistoryItemDetails.Pending.title.another',
                null,
                { defaults: 'Pending' },
              )}
            </div>
            <div className={styles.subtitle}>
              {isCancel ? i18n._(
                'HistoryItemDetails.Pending.subtitle.cancel',
                null,
                { defaults: 'Cancel transfer. This may take some time.' },
              ) : i18n._(
                'HistoryItemDetails.Pending.subtitle.another',
                null,
                { defaults: 'Transfer is being processed. This may take some time.' },
              )}
            </div>
          </div>
        </div>
        <BaseFieldSet {...props} />
      </div>
      <NoteField
        onChange={handleEditNote}
        value={note}
      />
      {!isCancel && (
        <JLink
          className={styles.cancel}
          theme='button-secondary'
          href={`/history/${id}/cancel`}
        >
          {i18n._(
            'HistoryItem.Pending.cancel',
            null,
            { defaults: 'Cancel' },
          )}
        </JLink>
      )}
    </div>
  )
}
