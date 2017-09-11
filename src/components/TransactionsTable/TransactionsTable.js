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
    const {
      searchTransactions,
      filterTransactions,
      transactions,
      currentAccountSymbol,
    } = this.props

    const { items, searchQuery, isLoading } = transactions

    if (isLoading) {
      return <div className='transactions-table'><JbLoader /></div>
    }

    if (!(items && items.length)) {
      const message = currentAccountSymbol.length
        ? `Look like there isn't any ${currentAccountSymbol} in your account yet`
        : 'Look like there isn\'t any active account'

      return (
        <div className='transactions-table'>
          <div className='transactions-table-empty'>
            <div className='transactions-table__title'>{message}</div>
          </div>
        </div>
      )
    }

    return (
      <div className='transactions-table'>
        <TransactionsTableHeader
          searchTransactions={searchTransactions}
          sendFunds={this.sendFunds}
          receiveFunds={this.receiveFunds}
          convertFunds={this.convertFunds}
          filterTransactions={filterTransactions}
          removeAccount={this.removeAccount}
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
  sendFunds = (/* event */) => this.props.openSendFundsModal(this.props.currentAccountIndex)
  receiveFunds = (/* event */) => this.props.openReceiveFundsModal(this.props.currentAccountIndex)
  convertFunds = (/* event */) => this.props.openConvertFundsModal(this.props.currentAccountIndex)
  removeAccount = (/* event */) => this.props.toggleAccount(this.props.currentAccountIndex)
}

TransactionsTable.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  filterTransactions: PropTypes.func.isRequired,
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
  currentAccountSymbol: PropTypes.string.isRequired,
  currentAccountIndex: PropTypes.number.isRequired,
}

export default TransactionsTable
