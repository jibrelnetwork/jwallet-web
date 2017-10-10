import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Transaction from 'components/Transaction'

class TransactionsTableBody extends Component {
  render() {
    const { transactions, currentCurrencySymbol, emptyTableImageSrc } = this.props
    const { items, foundItemsHashes, searchQuery } = transactions

    const isItemsFound = item => (foundItemsHashes.indexOf(item.txHash) > -1)
    const isSearching = (searchQuery && searchQuery.length)
    const foundItems = isSearching ? items.filter(isItemsFound) : items

    const isSearchedTransactionsEmpty = (isSearching && !foundItems.length)
    const isFilteredTransactionsEmpty = this.isFilteredTransactionsEmpty(foundItems)

    if (isSearchedTransactionsEmpty || isFilteredTransactionsEmpty) {
      return this.renderEmpty(currentCurrencySymbol, emptyTableImageSrc)
    }

    return (
      <div className='transactions-table-body'>
        {this.renderTransactions(foundItems)}
      </div>
    )
  }

  renderEmpty = (currentCurrencySymbol, emptyTableImageSrc) => {
    return (
      <div className='transactions-table-body transactions-table-body--empty'>
        <div
          className='transactions-table__empty'
          style={{ backgroundImage: `url(${emptyTableImageSrc})` }}
        >
          <div className='transactions-table__title'>
            {`Look like there isn't any ${currentCurrencySymbol} in your account yet`}
          </div>
        </div>
      </div>
    )
  }

  renderTransactions = (foundItems) => {
    const {
      setCurrentCurrency,
      toggleActive,
      currenciesItems,
      transactions,
      activeTransactionIndex,
    } = this.props

    const { startTime, endTime, isOpen } = transactions.filterData

    const isStartTime = (isOpen && (startTime !== 0))
    const isEndTime = (isOpen && (endTime !== 0))

    return (
      <div>
        {foundItems.map((transactionProps, i) => {
          const { timestamp } = transactionProps
          const isAfterStartTime = isStartTime ? (timestamp > startTime) : true
          const isBeforeEndTime = isEndTime ? (timestamp < endTime) : true
          const isActive = (activeTransactionIndex === i)

          if (isAfterStartTime && isBeforeEndTime) {
            return (
              <Transaction
                {...transactionProps}
                setCurrentCurrency={setCurrentCurrency}
                toggleActive={toggleActive(i)}
                currenciesItems={currenciesItems}
                key={i}
                isActive={isActive}
              />
            )
          }

          return null
        })}
      </div>
    )
  }

  isFilteredTransactionsEmpty = (foundItems) => {
    const { startTime, endTime, isOpen } = this.props.transactions.filterData

    const isStartTime = (isOpen && (startTime !== 0))
    const isEndTime = (isOpen && (endTime !== 0))

    return (foundItems
      .map(({ timestamp }) => {
        const isAfterStartTime = isStartTime ? (timestamp > startTime) : true
        const isBeforeEndTime = isEndTime ? (timestamp < endTime) : true

        return (isAfterStartTime && isBeforeEndTime)
      })
      .filter(item => (item === true))
      .length === 0)
  }
}

TransactionsTableBody.propTypes = {
  setCurrentCurrency: PropTypes.func.isRequired,
  toggleActive: PropTypes.func.isRequired,
  transactions: PropTypes.shape({
    filterData: PropTypes.shape({
      startTime: PropTypes.number.isRequired,
      endTime: PropTypes.number.isRequired,
      isOpen: PropTypes.bool.isRequired,
    }).isRequired,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      txHash: PropTypes.string.isRequired,
      fee: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      amountFixed: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
    })).isRequired,
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    searchQuery: PropTypes.string.isRequired,
  }).isRequired,
  currenciesItems: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAuthRequired: PropTypes.bool.isRequired,
  })).isRequired,
  currentCurrencySymbol: PropTypes.string.isRequired,
  emptyTableImageSrc: PropTypes.string.isRequired,
  activeTransactionIndex: PropTypes.number.isRequired,
}

export default TransactionsTableBody
