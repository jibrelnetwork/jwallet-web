import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'

import TransactionsTableBody from './Body'
import TransactionsTableEmpty from './Empty'
import TransactionsTableLoading from './Loading'

const transactionsTableHeaderItems = [
  { name: 'amount', title: 'Amount', colWidth: 'col--2-4' },
  { name: 'timestamp', title: 'Time', colWidth: 'col--2-4' },
  { name: 'address', title: 'From/To', colWidth: 'col--4-8' },
  { name: 'status', title: 'Status', colWidth: 'col--2-4' },
]

function TransactionsTable(props) {
  const {
    setCurrentCurrency,
    sortTransactions,
    toggleActive,
    getCurrencyIndex,
    transactions,
    currentCurrencySymbol,
    emptyTableImageSrc,
    activeTransactionIndex,
    isTransactionsEmpty,
  } = props

  const { filterData, sortField, sortDirection, isLoading } = transactions
  const isFilterOpen = filterData.isOpen

  if (isLoading) {
    return <TransactionsTableLoading />
  }

  if (isTransactionsEmpty) {
    return (
      <TransactionsTableEmpty
        imageSrc={emptyTableImageSrc}
        currencySymbol={currentCurrencySymbol}
      />
    )
  }

  return (
    <JTable name={`transactions ${isFilterOpen ? 'table--transactions-filter' : ''}`}>
      <JTable.Header
        items={transactionsTableHeaderItems}
        onClick={sortTransactions}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <JTable.Body>
        <TransactionsTableBody
          setCurrentCurrency={setCurrentCurrency}
          toggleActive={toggleActive}
          getCurrencyIndex={getCurrencyIndex}
          transactions={transactions}
          currencySymbol={currentCurrencySymbol}
          activeTransactionIndex={activeTransactionIndex}
        />
      </JTable.Body>
    </JTable>
  )
}

TransactionsTable.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  getCurrencyIndex: PropTypes.func.isRequired,
  transactions: PropTypes.shape({
    filterData: PropTypes.shape({
      startTime: PropTypes.number.isRequired,
      endTime: PropTypes.number.isRequired,
      isOpen: PropTypes.bool.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      transactionHash: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      fee: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
    })).isRequired,
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  currentCurrencySymbol: PropTypes.string.isRequired,
  emptyTableImageSrc: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
  isTransactionsEmpty: PropTypes.bool.isRequired,
}

export default TransactionsTable
