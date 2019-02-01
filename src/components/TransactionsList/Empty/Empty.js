// @flow

import React from 'react'
import { t } from 'ttag'

import OverlayNotification from 'components/OverlayNotification'

type Props = {|
  +isFiltered: boolean,
|}

function TransactionsListEmpty({ isFiltered }: Props) {
  return (
    <OverlayNotification
      color='gray'
      image='screen-reload'
      description={isFiltered ? [
        t`There are no items to display`,
      ] : [
        t`Looks like you haven't made`,
        t`any transactions yet.`,
      ]}
      isTransparent
    />
  )
}

export default TransactionsListEmpty
