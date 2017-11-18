import React from 'react'
import PropTypes from 'prop-types'

import Transaction from 'components/Transaction'

import JbIcon from 'components/base/JbIcon'

const transactionsColumns = [
  { field: 'amount', title: 'Amount' },
  { field: 'timestamp', title: 'Time' },
  { field: 'address', title: 'From/To' },
  { field: 'status', title: 'Status' },
]

function TransactionsTableBody({ sortTransactions, transactions }) {
  const { items, foundItemsHashes, sortField, sortDirection, searchQuery } = transactions
  const isDesc = (sortDirection === 'DESC')

  const isItemsFound = item => (foundItemsHashes.indexOf(item.txHash) > -1)
  const foundItems = (searchQuery && searchQuery.length) ? items.filter(isItemsFound) : items

  return (
    <div className='transactions-table-body'>
      <div className='transactions-table-body__table'>
        <div className='transaction table__item table__item--title'>
          <div className='row clear'>
            {transactionsColumns.map(({ field, title }) => {
              const isCurrent = (field === sortField)

              return (
                <div
                  className='col-3 clear table__title-item'
                  key={field}
                  onClick={sortTransactions(field)}
                >
                  <span className='pull-left'>{title}</span>
                  <JbIcon
                    small
                    name={`small-arrow${(isDesc && isCurrent) ? '' : '-up'}`}
                    className={`pull-left table__icon table__icon--${isCurrent ? 'active' : ''}`}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {foundItems.map((transactionProps, i) => <Transaction key={i} {...transactionProps} />)}
    </div>
  )
}

TransactionsTableBody.propTypes = {
  sortTransactions: PropTypes.func.isRequired,
  transactions: PropTypes.shape({
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
    })).isRequired,
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
  }).isRequired,
}

export default TransactionsTableBody
