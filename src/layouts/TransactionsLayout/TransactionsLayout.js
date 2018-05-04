// @flow

import React from 'react'
import { JSearch, JTabs } from 'react-components'
import { Scrollbars } from 'react-custom-scrollbars'

import ActiveAssetsLayout from 'layouts/ActiveAssetsLayout'

const TRANSACTIONS_TABS = {
  '/transactions/all': 'All Transactions',
  '/transactions/incoming': 'Incoming',
  '/transactions/outgoing': 'Outgoing',
}

const TransactionsLayout = ({ search, children, searchQuery }: Props) => (
  <ActiveAssetsLayout>
    <div className='transactions-layout'>
      <div className='header'>
        <JTabs tabs={TRANSACTIONS_TABS} />
        <div className='actions'>
          <JSearch
            onChange={search}
            value={searchQuery}
            placeholder='search...'
          />
        </div>
      </div>
      <div className='content'>
        <Scrollbars autoHide>
          {children}
        </Scrollbars>
      </div>
    </div>
  </ActiveAssetsLayout>
)

type Props = {
  search: Function,
  children: Object,
  searchQuery: string,
}

TransactionsLayout.defaultProps = {
  search: null,
  children: null,
  searchQuery: '',
}

export default TransactionsLayout
