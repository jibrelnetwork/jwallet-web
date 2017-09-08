import React from 'react'
import PropTypes from 'prop-types'

import { JbLoader, JbTable } from 'components/base'

import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableBody from './TransactionsTableBody'

class TransactionsTable extends JbTable {
  componentWillMount() {
    const { getTransactions, items } = this.props

    if (!(items && items.length)) {
      getTransactions()
    }
  }

  render() {
    const { items, sortField, sortDirection, searchQuery } = this.state
    const { isLoading } = this.props

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
          searchTransactions={this.searchItems}
          searchQuery={searchQuery}
        />
        <TransactionsTableBody
          sortTransactions={this.sortItems}
          transactions={items}
          sortField={sortField}
          sortDirection={sortDirection}
        />
      </div>
    )
  }
}

TransactionsTable.propTypes = {
  getTransactions: PropTypes.func.isRequired,
  items: PropTypes.array.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default TransactionsTable
