import React from 'react'
import PropTypes from 'prop-types'

import TransactionsTableBodyRow from './Row'

function TransactionsTableBody(props) {
  const {
    setCurrentCurrency,
    toggleActive,
    getCurrencyIndex,
    transactions,
    currencySymbol,
    activeTransactionIndex,
  } = props

  const { filterData, items, foundItemsHashes, searchQuery } = transactions
  const isItemsFound = item => (foundItemsHashes.indexOf(item.txHash) > -1)
  const isSearching = (searchQuery && searchQuery.length)
  const foundItems = isSearching ? items.filter(isItemsFound) : items

  const { startTime, endTime, isOpen } = filterData

  const isStartTime = (isOpen && (startTime !== 0))
  const isEndTime = (isOpen && (endTime !== 0))

  return (
    <div className='transactions-table-body'>
      <div>
        {foundItems.map((transactionProps, i) => {
          const { timestamp, to } = transactionProps
          const isAfterStartTime = isStartTime ? (timestamp > startTime) : true
          const isBeforeEndTime = isEndTime ? (timestamp < endTime) : true
          const isActive = (activeTransactionIndex === i)

          if (isAfterStartTime && isBeforeEndTime) {
            return (
              <TransactionsTableBodyRow
                key={i}
                {...transactionProps}
                setCurrentCurrency={setCurrentCurrency}
                toggleActive={toggleActive(i)}
                currencySymbol={currencySymbol}
                currencyIndex={getCurrencyIndex(to)}
                isActive={isActive}
              />
            )
          }

          return null
        })}
      </div>
    </div>
  )
}

TransactionsTableBody.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
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
      contractAddress: PropTypes.string.isRequired,
      fee: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
    })).isRequired,
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchQuery: PropTypes.string.isRequired,
  }).isRequired,
  currencySymbol: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
}

export default TransactionsTableBody
