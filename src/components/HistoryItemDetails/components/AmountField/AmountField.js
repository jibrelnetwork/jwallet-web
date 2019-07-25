// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'

type Props = {|
  +value: string,
|}

export function AmountField({ value }: Props) {
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
