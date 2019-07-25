// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { JInput } from 'components/base'

type Props = {|
  +onChange: (note: string) => any,
  +value: ?string,
|}

export function NoteField({
  onChange: handleChange,
  value,
}: Props) {
  const i18n = useI18n()

  return (
    <JInput
      onChange={handleChange}
      value={value}
      label={i18n._(
        'HistoryItemDetails.NoteField.label',
        null,
        { defaults: 'Note' },
      )}
      infoMessage={i18n._(
        'HistoryItemDetails.NoteField.message',
        null,
        { defaults: 'This note is only visible to you.' },
      )}
      color='gray'
    />
  )
}
