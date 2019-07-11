// @flow

import React from 'react'
import { useI18n } from 'app/hooks'

import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +isFiltered: boolean,
|}

function TransactionsListEmpty({ isFiltered }: Props) {
  const i18n = useI18n()

  const noTransactionsText = i18n._(
    'TransactionsList.Empty.default',
    null,
    { defaults: 'Looks like you haven\'t made any transactions yet.' },
  )

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
