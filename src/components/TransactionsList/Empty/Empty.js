// @flow

import React from 'react'
import { t } from 'ttag'

import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +isFiltered: boolean,
|}

const noTransactionsText: string[] =
  (t`Looks like you haven't made
  any transactions yet.`).split('\n')

function TransactionsListEmpty({ isFiltered }: Props) {
  return (
    <OverlayNotification
      color='gray'
      image='screen-reload'
      description={isFiltered ? [
        t`There are no items to display`,
      ] : noTransactionsText}
      isTransparent
    />
  )
}

export default TransactionsListEmpty
