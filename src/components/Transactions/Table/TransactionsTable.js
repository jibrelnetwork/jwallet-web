import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import JTable from 'components/base/JTable'

import TransactionsTableBody from './Body'
import TransactionsTableEmpty from './Empty'

const { field } = i18n.transactions.table

const transactionsTableHeaderItems = [
  { name: 'amount', colWidth: 'col--2-4' },
  { name: 'timestamp', colWidth: 'col--2-4' },
  { name: 'address', colWidth: 'col--4-8' },
  { name: 'status', colWidth: 'col--2-4' },
].map(item => ({ ...item, title: field[item.name] }))

function TransactionsTable(props) {
  const {
    setCurrentDigitalAssetAddress,
    sortTransactions,
    toggleActive,
    isToken,
    transactions,
    currentCurrencySymbol,
    emptyImageSrc,
    activeTransactionIndex,
    isTransactionsEmpty,
  } = props

  const { filterData, sortField, sortDirection } = transactions
  const isFilterOpen = filterData.isOpen

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
        items={transactionsTableHeaderItems}
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
  }).isRequired,
  currentCurrencySymbol: PropTypes.string.isRequired,
  emptyImageSrc: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
  isTransactionsEmpty: PropTypes.bool.isRequired,
}

export default TransactionsTable
