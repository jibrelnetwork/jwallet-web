import React, { Component } from 'react'
import PropTypes from 'prop-types'

import searchItems from 'utils/searchItems'

import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableBody from './TransactionsTableBody'

class TransactionsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { transactions: props.transactions }
  }

  render() {
    const { transactions } = this.state

    return (
      <div className='transactions-table'>
        <TransactionsTableHeader searchTransactions={this.searchTransactions} />
        <TransactionsTableBody transactions={transactions} />
      </div>
    )
  }

  searchTransactions = (searchQuery) => {
    this.setState({
      transactions: searchItems(this.props.transactions, searchQuery).items,
    })
  }
}

TransactionsTable.propTypes = {
  transactions: PropTypes.array.isRequired,
}

export default TransactionsTable
