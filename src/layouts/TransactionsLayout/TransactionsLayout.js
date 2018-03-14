// @flow

import React from 'react'

import ActiveAssetsLayout from 'layouts/ActiveAssetsLayout'
import JTabs from 'components/base/__new__/JTabs'

const TRANSACTIONS_TABS = {
  '/transactions/all': 'All Transactions',
  '/transactions/incoming': 'Incoming',
  '/transactions/outgoing': 'Outgoing',
}

const TransactionsLayout = ({ children }: Props) => (
  <ActiveAssetsLayout>
    <div className='header'>
      <JTabs tabs={TRANSACTIONS_TABS} />
      {
      /*
        <div>{'Tabs'}</div>
        <div>{'Add button'}</div>
        <div>{'Search'}</div>
      */
      }
    </div>
    <div className='wrapper'>{children}</div>
  </ActiveAssetsLayout>
)

type Props = {
  children?: Object,
}

TransactionsLayout.defaultProps = {
  children: null,
}

export default TransactionsLayout
