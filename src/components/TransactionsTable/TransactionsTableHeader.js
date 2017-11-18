import React from 'react'
import PropTypes from 'prop-types'

import { DatePicker, Search, TransactionManager } from 'components'

function TransactionsTableHeader(props) {
  const {
    removeAccount,
    sendFunds,
    receiveFunds,
    convertFunds,
    searchTransactions,
    filterTransactions,
    setStartFilterTime,
    setEndFilterTime,
    filterData,
    searchQuery,
  } = props

  return (
    <div className='transactions-table-header clear'>
      <Search search={searchTransactions} name='transactions' query={searchQuery} />
      <div className='transactions-table-header__filter pull-left'>
        <DatePicker
          filterTransactions={filterTransactions}
          setStartFilterTime={setStartFilterTime}
          setEndFilterTime={setEndFilterTime}
          filterData={filterData}
        />
      </div>
      <div className='transactions-table-header__more'>
        <TransactionManager
          sendFunds={sendFunds}
          receiveFunds={receiveFunds}
          convertFunds={convertFunds}
          filter={filterTransactions}
          remove={removeAccount}
        />
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
  setStartFilterTime: PropTypes.func.isRequired,
  setEndFilterTime: PropTypes.func.isRequired,
  filterData: PropTypes.shape({
    startTime: PropTypes.number.isRequired,
    endTime: PropTypes.number.isRequired,
    isOpen: PropTypes.bool.isRequired,
  }).isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default TransactionsTableHeader
