import React from 'react'
import PropTypes from 'prop-types'

import JTable from 'components/base/JTable'

import TransactionsTableBody from './Body'
import TransactionsTableEmpty from './Empty'

function getTransactionsTableHeaderItems() {
  const field = i18n('transactions.table.field') || {}

  return [
    { name: 'amount', colWidth: 'col--2-4' },
    { name: 'timestamp', colWidth: 'col--2-4' },
    { name: 'address', colWidth: 'col--4-8' },
    { name: 'status', colWidth: 'col--2-4' },
  ].map(item => ({ ...item, title: field[item.name] }))
}

function TransactionsTable(props) {
  const {
    setCurrentDigitalAssetAddress,
    sortTransactions,
    toggleActive,
    isToken,
    transactions,
    sortField,
    sortDirection,
    currentCurrencySymbol,
    emptyImageSrc,
    activeTransactionIndex,
    isTransactionsEmpty,
    isMobile,
    isFilterOpen,
  } = props

  if (isTransactionsEmpty) {
    return (
      <TransactionsTableEmpty
        emptyImageSrc={emptyImageSrc}
        currencySymbol={currentCurrencySymbol}
      />
    )
  }

  return (
    <JTable name={`transactions ${isFilterOpen ? 'table--transactions-filter' : ''}`}>
      <JTable.Header
        items={getTransactionsTableHeaderItems()}
        onClick={sortTransactions}
        sortField={sortField}
        sortDirection={sortDirection}
      />
      <JTable.Body>
        <TransactionsTableBody
          setCurrentDigitalAssetAddress={setCurrentDigitalAssetAddress}
          toggleActive={toggleActive}
          isToken={isToken}
          transactions={transactions}
          currencySymbol={currentCurrencySymbol}
          activeTransactionIndex={activeTransactionIndex}
          isMobile={isMobile}
        />
      </JTable.Body>
    </JTable>
  )
}

TransactionsTable.propTypes = {
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  isToken: PropTypes.func.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    transactionHash: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    fee: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    timestamp: PropTypes.number.isRequired,
    /* optional */
    from: PropTypes.string,
    to: PropTypes.string,
    address: PropTypes.string,
  })).isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  currentCurrencySymbol: PropTypes.string.isRequired,
  emptyImageSrc: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
  isTransactionsEmpty: PropTypes.bool.isRequired,
  isMobile: PropTypes.bool.isRequired,
  isFilterOpen: PropTypes.bool.isRequired,
}

export default TransactionsTable
