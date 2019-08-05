// @flow strict

import React from 'react'
import classNames from 'classnames'
import { type I18n as I18nType } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { JIcon } from 'components/base'
import { DateTimeFormat } from 'app/components'

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
      'HistoryItemDetails.Failed.subtitle.cancel',
      null,
      { defaults: 'Transfer not canceled.' },
    )
  } else if (hasInput) {
    return i18n._(
      'HistoryItemDetails.Failed.subtitle.input',
      null,
      { defaults: 'Contract Call declined.' },
    )
  }

  return i18n._(
    'HistoryItemDetails.Failed.subtitle.another',
    null,
    { defaults: 'Transfer declined.' },
  )
}

export function Failed(props: CardProps) {
  const {
    onEditFinish: handleEditNote,
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
    </div>
  )
}
