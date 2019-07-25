// @flow strict

import React from 'react'

import { useI18n } from 'app/hooks'
import { FieldPreview } from 'components'
import { getAddressLink } from 'utils/transactions'
import { getShortenedAddress } from 'utils/address'

type AddressFieldType = 'sender' | 'recipient' | 'contract'

type Props = {|
  +name: ?string,
  +value: Address,
  +type: ?AddressFieldType,
  +blockExplorerUISubdomain: string,
|}

function getLabel(i18n, type) {
  switch (type) {
    case 'sender':
      return i18n._(
        'HistoryItemDetails.AddressField.sender',
        null,
        { defaults: 'Sender' },
      )

    case 'recipient':
      return i18n._(
        'HistoryItemDetails.AddressField.recipient',
        null,
        { defaults: 'Recipient' },
      )

    case 'contract':
      return i18n._(
        'HistoryItemDetails.AddressField.contract',
        null,
        { defaults: 'Contract' },
      )

    default:
      return ''
  }
}

export function AddressField({
  type,
  name,
  value,
  blockExplorerUISubdomain,
}: Props) {
  const i18n = useI18n()

  if (!type) {
    return null
  }

  return (
    <FieldPreview
      value={value}
      valueToShow={name || getShortenedAddress(value)}
      link={value && getAddressLink(value, blockExplorerUISubdomain)}
      label={getLabel(i18n, type)}
      isContact={!name}
      isCopyable
    />
  )
}

AddressField.defaultProps = {
  type: null,
  name: null,
}
