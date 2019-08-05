// @flow strict

import React from 'react'
import { type I18n as I18nType } from '@lingui/core'

import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'

type Props = {|
  +value: string,
  +isPending: boolean,
|}

function getLabel(
  i18n: I18nType,
  isPending: boolean,
): string {
  return isPending ? i18n._(
    'HistoryItemDetails.FeeField.label.pending',
    null,
    { defaults: 'Estimated blockchain fee' },
  ) : i18n._(
    'HistoryItemDetails.FeeField.label.another',
    null,
    { defaults: 'Blockchain fee' },
  )
}

export function FeeField({
  value,
  isPending,
}: Props) {
  const i18n = useI18n()

  return (
    <FieldPreview
      value={`${value} ETH`}
      label={getLabel(
        i18n,
        isPending,
      )}
    />
  )
}
