// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'

type Props = {|
  +value: string,
|}

export function FeeField({ value }: Props) {
  const i18n = useI18n()

  return (
    <FieldPreview
      value={`${value} ETH`}
      label={i18n._(
        'HistoryItemDetails.FeeField.label',
        null,
        { defaults: 'Estimated blockchain fee' },
      )}
    />
  )
}
