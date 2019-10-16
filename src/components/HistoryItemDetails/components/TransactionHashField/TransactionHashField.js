// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'
import { getTxLink } from 'utils/transactions'
import { getShortenedAddress } from 'utils/address'

type Props = {|
  +value: Hash,
  +blockExplorerUISubdomain: string,
|}

export function TransactionHashField({
  value,
  blockExplorerUISubdomain,
}: Props) {
  const i18n = useI18n()

  return (
    <FieldPreview
      value={value}
      valueToShow={getShortenedAddress(value)}
      link={getTxLink(value, blockExplorerUISubdomain)}
      label={i18n._(
        'HistoryItemDetails.TransactionHashField.label',
        null,
        { defaults: 'Blockchain transaction' },
      )}
      isCopyable
    />
  )
}
