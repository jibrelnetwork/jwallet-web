// @flow

import React from 'react'

import JThumbnail from 'components/base/JThumbnail'

function TransactionsListEmpty() {
  return (
    <div className='transactions-list-empty'>
      <JThumbnail
        color='gray'
        image='cloud'
        description='empty'
      />
    </div>
  )
}

export default TransactionsListEmpty
