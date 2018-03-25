// @flow

import React from 'react'

import { JThumbnail } from 'components/base/__new__'

const eventDescriptionMap = {
  'empty-list': 'Look like there isn\'t any transactions in your account yet',
  'be-error': 'We could not load your ETH transactions',
  'no-active': 'Look like there isn\'t any active digital asset',
  'private-node': 'We can not load transactions for the private blockchain',
}

const TransactionsEmpty = ({ event }: Props) => (
  <div className='transactions-empty'>
    <JThumbnail
      image='cloud'
      color='gray'
      description={eventDescriptionMap[event]}
    />
  </div>
)

type Props = {
  event: 'empty-list' | 'be-error' | 'no-active' | 'private-node',
}

export default TransactionsEmpty
