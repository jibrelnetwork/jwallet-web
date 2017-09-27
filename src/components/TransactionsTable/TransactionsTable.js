import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JLoader from 'components/base/JLoader'

import TransactionsTableHeader from './TransactionsTableHeader'
import TransactionsTableBody from './TransactionsTableBody'

class TransactionsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { active: -1, emptyTableImageSrc: '/img/no-data.svg' }
  }

  componentWillMount() {
    const emptyTableImage = new Image()
    emptyTableImage.src = this.state.emptyTableImageSrc

    const { getTransactions, transactions } = this.props

    if (!(transactions.items && transactions.items.length)) {
      getTransactions()
    }
  }

  render() {
    const {
      setCurrentAccount,
      searchTransactions,
      setStartFilterTime,
      setEndFilterTime,
      accountItems,
      transactions,
      currentAccountSymbol,
    } = this.props

    const { emptyTableImageSrc, active } = this.state

    const { filterData, items, searchQuery, isLoading } = transactions
    const isFilterOpen = filterData.isOpen

    if (isLoading) {
      return <div className='transactions-table transactions-table--loading'><JLoader /></div>
    }

    if (!(items && items.length)) {
      return this.renderEmptyTable()
    }

    return (
      <div className={`transactions-table ${isFilterOpen ? 'transactions-table--filter' : ''}`}>
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
          setCurrentAccount={setCurrentAccount}
          sortTransactions={this.sortTransactions}
          toggleActive={this.toggleActive}
          accountItems={accountItems}
          transactions={transactions}
          currentAccountSymbol={currentAccountSymbol}
          emptyTableImageSrc={emptyTableImageSrc}
          activeTransactionIndex={active}
        />
      </div>
    )
  }

  renderEmptyTable = () => {
    return (
      <div className='transactions-table transactions-table--empty'>
        <div
          className='transactions-table-empty'
          style={{ backgroundImage: `url(${this.state.emptyTableImageSrc})` }}
        >
          {this.getEmptyTableMessage(this.props.currentAccountSymbol)}
        </div>
      </div>
    )
  }

  getEmptyTableMessage = (currentAccountSymbol) => {
    const message = currentAccountSymbol.length
      ? `Look like there isn't any ${currentAccountSymbol} in your account yet`
      : 'Look like there isn\'t any active account'

    if (currentAccountSymbol === 'ETH') {
      return (
        <div className='transactions-table__title'>
          {'At the moment we can not load your ETH transactions'}
          <a
            className='transactions-table__etherscan'
            href='//etherscan.io'
            target='_blank'
            rel='noopener noreferrer'
          >
            {'See them in the blockexplorer'}
          </a>
        </div>
      )
    }

    return <div className='transactions-table__title'>{message}</div>
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
  setCurrentAccount: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  setStartFilterTime: PropTypes.func.isRequired,
  setEndFilterTime: PropTypes.func.isRequired,
  filterTransactions: PropTypes.func.isRequired,
  accountItems: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string.isRequired,
    isActive: PropTypes.bool.isRequired,
    isAuthRequired: PropTypes.bool.isRequired,
  })).isRequired,
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
