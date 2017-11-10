import React from 'react'
import PropTypes from 'prop-types'

import { DatePicker, Search } from 'components'

import TransactionsManager from '../Manager'

function TransactionsFilters(props) {
  const {
    removeCurrency,
    sendFunds,
    receiveFunds,
    searchTransactions,
    filterTransactions,
    setStartFilterTime,
    setEndFilterTime,
    filterData,
    searchQuery,
  } = props

  return (
    <div className='transactions-filters clear'>
      <Search search={searchTransactions} name='transactions' query={searchQuery} />
      <div className='transactions-filters__filter pull-left'>
        <DatePicker
          filterTransactions={filterTransactions}
          setStartFilterTime={setStartFilterTime}
          setEndFilterTime={setEndFilterTime}
          filterData={filterData}
        />
      </div>
      <div className='transactions-filters__more'>
        <TransactionsManager
          sendFunds={sendFunds}
          receiveFunds={receiveFunds}
          filter={filterTransactions}
          remove={removeCurrency}
        />
      </div>
    </div>
  )
}

TransactionsFilters.propTypes = {
  removeCurrency: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
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

export default TransactionsFilters
