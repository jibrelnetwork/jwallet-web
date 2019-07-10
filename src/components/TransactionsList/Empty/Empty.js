// @flow

import React from 'react'
import { i18n } from 'i18n/lingui'

import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +isFiltered: boolean,
|}

const noTransactionsText = i18n._(
  'TransactionsList.Empty.default',
  null,
  { defaults: 'Looks like you haven\'t made any transactions yet.' },
)

function TransactionsListEmpty({ isFiltered }: Props) {
  return (
    <OverlayNotification
      color='gray'
      image='screen-reload'
      description={isFiltered
        ? [i18n._(
          'TransactionsList.Empty.filtered',
          null,
          { defaults: 'There are no items to display' },
        )]
        : [noTransactionsText]}
      isTransparent
    />
  )
}

export default TransactionsListEmpty
