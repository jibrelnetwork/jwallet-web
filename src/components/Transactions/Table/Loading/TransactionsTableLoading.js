import React from 'react'

import { JLoader, JTable } from 'components/base'

function TransactionsTableLoading() {
  return <JTable name='transactions table--transactions-loading'><JLoader /></JTable>
}

export default TransactionsTableLoading
