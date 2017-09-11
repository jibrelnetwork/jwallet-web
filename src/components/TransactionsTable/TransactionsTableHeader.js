import React from 'react'
import PropTypes from 'prop-types'

import { Search, TransactionManager } from 'components'

import JbIcon from 'components/base/JbIcon'

const notImplementedHandler = () => alert('Not implemented yet')

function TransactionsTableHeader({ searchTransactions, searchQuery }) {
  return (
    <div className='transactions-table-header clear'>
      <Search search={searchTransactions} name='transactions' query={searchQuery} />
      <div className='more pull-right'>
        <TransactionManager
          sendFunds={notImplementedHandler}
          receiveFunds={notImplementedHandler}
          convertFunds={notImplementedHandler}
          filter={notImplementedHandler}
          remove={notImplementedHandler}
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
  searchTransactions: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default TransactionsTableHeader
