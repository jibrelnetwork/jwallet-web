import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbLoader from 'components/base/JbLoader'

import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableBody from './TransactionsTableBody'

class TransactionsTable extends Component {
  componentWillMount() {
    const { getTransactions, transactions } = this.props

    if (!(transactions.items && transactions.items.length)) {
      getTransactions()
    }
  }

  render() {
    const { searchTransactions, transactions } = this.props
    const { items, searchQuery, isLoading } = transactions

    if (isLoading) {
      return <div className='transactions-table'><JbLoader /></div>
    }

    if (!(items && items.length)) {
      return (
        <div className='transactions-table'>
          <div className='transactions-table-empty'>
            <div className='transactions-table__title'>
              {'Look like there isn\'t any jUSD in your account yet'}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className='transactions-table'>
        <TransactionsTableHeader
          searchTransactions={searchTransactions}
          searchQuery={searchQuery}
        />
        <TransactionsTableBody
          sortTransactions={this.sortTransactions}
          transactions={transactions}
        />
      </div>
    )
  }

  sortTransactions = field => (/* event */) => this.props.sortTransactions(field)
}

TransactionsTable.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
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
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
}

export default TransactionsTable
