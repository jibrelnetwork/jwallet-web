import React from 'react'
import PropTypes from 'prop-types'

import { Search, TransactionManager } from 'components'

import JbIcon from 'components/base/JbIcon'

function TransactionsTableHeader(props) {
  const {
    removeAccount,
    sendFunds,
    receiveFunds,
    convertFunds,
    searchTransactions,
    filterTransactions,
    searchQuery,
  } = props

  return (
    <div className='transactions-table-header clear'>
      <Search search={searchTransactions} name='transactions' query={searchQuery} />
      <div className='more pull-right'>
        <TransactionManager
          sendFunds={sendFunds}
          receiveFunds={receiveFunds}
          convertFunds={convertFunds}
          filter={filterTransactions}
          remove={removeAccount}
        />
      </div>
      <div className='transactions-table-header__filter pull-right'>
        <span>{'Date: 27.03 - 31.05'}</span>
        <JbIcon name='small-clear' small className='filter__clear-icon' />
      </div>
    </div>
  )
}

TransactionsTableHeader.propTypes = {
  removeAccount: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
  filterTransactions: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default TransactionsTableHeader
