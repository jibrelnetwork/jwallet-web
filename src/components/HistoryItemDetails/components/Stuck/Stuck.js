// @flow strict

import React from 'react'
import classNames from 'classnames'
import { type I18n as I18nType } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { DateTimeFormat } from 'app/components'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from '../../historyItemDetails.m.scss'
import { NoteField } from '../NoteField/NoteField'
import { type CardProps } from '../../HistoryItemDetails'
import { BaseFieldSet } from '../BaseFieldSet/BaseFieldSet'

function getSubtitle(
  i18n: I18nType,
  hasInput: boolean,
  isCancel: boolean,
): string {
  if (isCancel) {
    return i18n._(
      'HistoryItemDetails.Stuck.subtitle.cancel',
      null,
      { defaults: 'Cancel transfer stuck.' },
    )
  } else if (hasInput) {
    return i18n._(
      'HistoryItemDetails.Stuck.subtitle.transfer',
      null,
      { defaults: 'Transfer stuck.' },
    )
  }

  return i18n._(
    'HistoryItemDetails.Stuck.subtitle.another',
    null,
    { defaults: 'Contract Call stuck.' },
  )
}

export function Stuck(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
    id,
    note,
    timestamp,
    hasInput,
    isCancel,
  }: CardProps = props

  const i18n = useI18n()

  return (
    <div className={styles.core}>
      <div className={styles.card}>
        <div className={classNames(styles.header, styles.error)}>
          <div className={styles.status}>
            <JIcon name='ic_trx_error_stuck_24-use-fill' />
          </div>
          <div className={styles.description}>
            <div className={styles.title}>
              {i18n._(
                'HistoryItemDetails.Stuck.title',
                null,
                { defaults: 'Error' },
              )}
            </div>
            <div className={styles.subtitle}>
              {getSubtitle(
                i18n,
                hasInput,
                isCancel,
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
      <JLink
        className={styles.restart}
        theme='button-secondary'
        href={`/history/${id}/restart`}
      >
        {i18n._(
          'HistoryItemDetails.Stuck.restart',
          null,
          { defaults: 'Restart' },
        )}
      </JLink>
      <JLink
        theme='button-secondary'
        href={`/history/${id}/cancel`}
      >
        {i18n._(
          'HistoryItem.Stuck.cancel',
          null,
          { defaults: 'Cancel' },
        )}
      </JLink>
    </div>
  )
}
