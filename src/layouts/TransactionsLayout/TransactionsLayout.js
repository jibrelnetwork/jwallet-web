// @flow

import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import ActiveAssetsLayout from 'layouts/ActiveAssetsLayout'
import JTabs from 'components/base/__new__/JTabs'
import TransactionsActions from 'routes/Transactions/containers/TransactionsActionsContainer'

const TRANSACTIONS_TABS = {
  '/transactions/all': 'All Transactions',
  '/transactions/incoming': 'Incoming',
  '/transactions/outgoing': 'Outgoing',
}

const TransactionsLayout = ({ children }: Props) => (
  <ActiveAssetsLayout>
    <div className='header'>
      <JTabs tabs={TRANSACTIONS_TABS} />
      <TransactionsActions />
    </div>
    <div className='wrapper'>
      <Scrollbars autoHide>
        {children}
      </Scrollbars>
    </div>
  </ActiveAssetsLayout>
)

type Props = {
  children?: Object,
}

TransactionsLayout.defaultProps = {
  children: null,
}

export default TransactionsLayout
