// @flow strict

import React from 'react'
import classNames from 'classnames'

import { useI18n } from 'app/hooks'
import { divDecimals } from 'utils/numbers'
import { DateTimeFormat } from 'app/components'

import {
  JIcon,
  JLink,
} from 'components/base'

import styles from '../../historyItemDetails.m.scss'
import { NoteField } from '../NoteField/NoteField'
import { BaseFieldSet } from '../BaseFieldSet/BaseFieldSet'
import { type CardProps } from '../../HistoryItemDetailsView'

function getRepeatLink({
  to,
  amount,
  assetAddress,
  assetDecimals,
}: CardProps): string {
  return `/send?asset=${assetAddress}&to=${to || ''}&amount=${divDecimals(amount, assetDecimals)}`
}

export function Outgoing(props: CardProps) {
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
            <JIcon name='ic_trx_out_24-use-fill' />
          </div>
          <div className={styles.description}>
            <div className={styles.title}>
              {i18n._(
                'HistoryItemDetails.Outgoing.title',
                null,
                { defaults: 'Success' },
              )}
            </div>
            <div className={styles.subtitle}>
              {i18n._(
                'HistoryItemDetails.Outgoing.subtitle.another',
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
      <JLink
        href={getRepeatLink(props)}
        theme='button-secondary'
      >
        {i18n._(
          'HistoryItemDetails.Outgoing.repeat',
          null,
          { defaults: 'Repeat Payment' },
        )}
      </JLink>
    </div>
  )
}
