// @flow strict

import React from 'react'
import classNames from 'classnames'
import { type I18n } from '@lingui/core'

import CopyIconButton from 'components/CopyIconButton'
import { useI18n } from 'app/hooks'

import styles from './copyableField.m.scss'

type Props = {|
  +value: string,
  +label: string,
|}

export default function CopyableField({
  value,
  label,
}: Props) {
  const i18n: I18n = useI18n()
  const labelOrNothing: string = label ? ` ${label}` : ''

  return (
    <div
      className={classNames(
        '__copyable-field',
        styles.core,
      )}
    >
      <div className={styles.content}>
        <div className={styles.label}>
          {label}
        </div>
        <div className={styles.value}>
          {value.replace(/ /g, '\u00A0')}
        </div>
      </div>
      <CopyIconButton
        content={value.replace(/ /g, '&nbsp;')}
        title={i18n._(
          'CopyableField.copy',
          { labelOrNothing },
          { defaults: 'Copy{labelOrNothing}' },
        )}
        toastMessage={label && i18n._(
          'CopyableField.toast',
          { label },
          { defaults: '{ label } copied.' },
        )}
      />
    </div>
  )
}
