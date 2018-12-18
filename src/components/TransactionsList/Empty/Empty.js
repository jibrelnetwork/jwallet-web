// @flow

import React from 'react'

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
        'There are no items to display',
      ] : [
        'Looks like you haven\'t made',
        'any transactions yet.',
      ]}
      isTransparent
    />
  )
}

export default TransactionsListEmpty
