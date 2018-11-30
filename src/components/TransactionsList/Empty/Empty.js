// @flow

import React from 'react'

import OverlayNotification from 'components/OverlayNotification'

function TransactionsListEmpty() {
  return (
    <OverlayNotification
      color='gray'
      image='screen-reload'
      description={['Looks like you haven\'t made', 'any transactions yet.']}
      isTransparent
    />
  )
}

export default TransactionsListEmpty
