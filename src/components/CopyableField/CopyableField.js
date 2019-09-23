// @flow strict

import React from 'react'
import classNames from 'classnames'
import { type I18n } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { CopyIconButton } from 'components'

import copyableFieldStyles from './copyableField.m.scss'

type Props = {|
  +value: string,
  +label: string,
|}

export function CopyableField({
  value,
  label,
}: Props) {
  const labelOrNothing: string = label
    ? ` ${label}`
    : ''

  const i18n: I18n = useI18n()

  return (
    <div
      className={classNames(
        '__copyable-field',
        copyableFieldStyles.core,
      )}
    >
      <div className={copyableFieldStyles.content}>
        <div className={copyableFieldStyles.label}>
          {label}
        </div>
        <div className={copyableFieldStyles.value}>
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
