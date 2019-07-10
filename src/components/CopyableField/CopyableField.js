// @flow strict

import React from 'react'
import classNames from 'classnames'
import { i18n } from 'i18n/lingui'

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
  const labelOrNothing = label
    ? ` ${label}`
    : ''

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
          {value}
        </div>
      </div>
      <CopyIconButton
        content={value}
        title={i18n._(
          'common.CopyableField.copy',
          { labelOrNothing },
          { defaults: 'Copy{labelOrNothing}' },
        )}
      />
    </div>
  )
}
