// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'

type Props = {|
  +value: string,
  +isCancel: boolean,
|}

export function AmountField({
  value,
  isCancel,
}: Props) {
  if (isCancel) {
    return null
  }

  const i18n = useI18n()

  return (
    <FieldPreview
      value={value}
      label={i18n._(
        'HistoryItemDetails.AmountField.label',
        null,
        { defaults: 'Amount' },
      )}
    />
  )
}

AmountField.defaultProps = {
  isCancel: false,
}
