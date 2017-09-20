import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JLoader from 'components/base/JLoader'

import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableBody from './TransactionsTableBody'

class TransactionsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { active: -1 }
  }

  componentWillMount() {
    const { getTransactions, transactions } = this.props

    if (!(transactions.items && transactions.items.length)) {
      getTransactions()
    }
  }

  render() {
    const {
      searchTransactions,
      setStartFilterTime,
      setEndFilterTime,
      transactions,
      currentAccountSymbol,
    } = this.props

    const { filterData, items, searchQuery, isLoading } = transactions

    if (isLoading) {
      return <div className='transactions-table loading'><JLoader /></div>
    }

    if (!(items && items.length)) {
      return this.renderEmptyTable()
    }

    return (
      <div className='transactions-table'>
        <TransactionsTableHeader
          searchTransactions={searchTransactions}
          sendFunds={this.sendFunds}
          receiveFunds={this.receiveFunds}
          convertFunds={this.convertFunds}
          filterTransactions={this.filterTransactions}
          removeAccount={this.removeAccount}
          setStartFilterTime={setStartFilterTime}
          setEndFilterTime={setEndFilterTime}
          filterData={filterData}
          searchQuery={searchQuery}
        />
        <TransactionsTableBody
          sortTransactions={this.sortTransactions}
          toggleActive={this.toggleActive}
          transactions={transactions}
          currentAccountSymbol={currentAccountSymbol}
          activeTransactionIndex={this.state.active}
        />
      </div>
    )
  }

  renderEmptyTable = () => {
    const { currentAccountSymbol } = this.props

    const message = currentAccountSymbol.length
      ? `Look like there isn't any ${currentAccountSymbol} in your account yet`
      : 'Look like there isn\'t any active account'

    return (
      <div className='transactions-table transactions-table--empty'>
        <div className='transactions-table-empty'>
          <div className='transactions-table__title'>{message}</div>
        </div>
      </div>
    )
  }

  sortTransactions = field => (/* event */) => this.props.sortTransactions(field)
  sendFunds = (/* event */) => this.props.openSendFundsModal(this.props.currentAccountIndex)
  receiveFunds = (/* event */) => this.props.openReceiveFundsModal(this.props.currentAccountIndex)
  convertFunds = (/* event */) => this.props.openConvertFundsModal(this.props.currentAccountIndex)
  filterTransactions = isFilterOpen => (/* event */) => this.props.filterTransactions(isFilterOpen)
  removeAccount = (/* event */) => this.props.toggleAccount(this.props.currentAccountIndex)
  toggleActive = i => (/* event */) => this.setState({ active: (this.state.active === i) ? -1 : i })
}

TransactionsTable.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  setStartFilterTime: PropTypes.func.isRequired,
  setEndFilterTime: PropTypes.func.isRequired,
  filterTransactions: PropTypes.func.isRequired,
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
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  currentAccountSymbol: PropTypes.string.isRequired,
  currentAccountIndex: PropTypes.number.isRequired,
}

export default TransactionsTable
