import React from 'react'
import PropTypes from 'prop-types'

import JbTable from 'components/base/JbTable'

import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableBody from './TransactionsTableBody'

class TransactionsTable extends JbTable {
  render() {
    const { items, sortField, sortDirection, searchQuery } = this.state

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
  items: PropTypes.array.isRequired,
  sortField: PropTypes.string.isRequired,
  sortDirection: PropTypes.string,
  searchQuery: PropTypes.string,
}

TransactionsTable.defaultProps = {
  sortDirection: 'ASC',
  searchQuery: '',
}

export default TransactionsTable
