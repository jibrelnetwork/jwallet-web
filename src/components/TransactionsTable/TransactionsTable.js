import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JLoader, JTable } from 'components/base'

import TransactionsTableFilters from './TransactionsTableFilters'
import TransactionsTableBody from './TransactionsTableBody'

const transactionsTableHeaderItems = [
  { name: 'amount', title: 'Amount', colWidth: 'col--2-4' },
  { name: 'timestamp', title: 'Time', colWidth: 'col--2-4' },
  { name: 'address', title: 'From/To', colWidth: 'col--4-8' },
  { name: 'status', title: 'Status', colWidth: 'col--2-4' },
]

class TransactionsTable extends Component {
  constructor(props) {
    super(props)
    this.state = { active: -1, emptyTableImageSrc: '/img/no-data.svg' }
  }

  componentWillMount() {
    this.preloadEmptyTableImage()

    const { getTransactions, transactions } = this.props

    if (!(transactions.items && transactions.items.length)) {
      getTransactions()
    }
  }

  render() {
    const {
      setCurrentCurrency,
      searchTransactions,
      setStartFilterTime,
      setEndFilterTime,
      currenciesItems,
      transactions,
      currentCurrencySymbol,
    } = this.props

    const { sortField, sortDirection } = transactions

    const { emptyTableImageSrc, active } = this.state

    const { filterData, items, searchQuery, isLoading } = transactions
    const isFilterOpen = filterData.isOpen

    if (isLoading) {
      return <JTable name='transactions transactions transactions--loading'><JLoader /></JTable>
    }

    if (!(items && items.length)) {
      return this.renderEmptyTable()
    }

    return (
      <JTable name={`transactions transactions ${isFilterOpen ? 'transactions--filter' : ''}`}>
        <TransactionsTableFilters
          searchTransactions={searchTransactions}
          sendFunds={this.sendFunds}
          receiveFunds={this.receiveFunds}
          convertFunds={this.convertFunds}
          filterTransactions={this.filterTransactions}
          removeCurrency={this.removeCurrency}
          setStartFilterTime={setStartFilterTime}
          setEndFilterTime={setEndFilterTime}
          filterData={filterData}
          searchQuery={searchQuery}
        />
        <JTable.Header
          items={transactionsTableHeaderItems}
          onClick={this.sortTransactions}
          sortField={sortField}
          sortDirection={sortDirection}
        />
        <JTable.Body>
          <TransactionsTableBody
            setCurrentCurrency={setCurrentCurrency}
            toggleActive={this.toggleActive}
            currenciesItems={currenciesItems}
            transactions={transactions}
            currentCurrencySymbol={currentCurrencySymbol}
            emptyTableImageSrc={emptyTableImageSrc}
            activeTransactionIndex={active}
          />
        </JTable.Body>
      </JTable>
    )
  }

  renderEmptyTable = () => {
    return (
      <JTable name='transactions transactions transactions--empty'>
        <div
          className='transactions-table__empty'
          style={{ backgroundImage: `url(${this.state.emptyTableImageSrc})` }}
        >
          {this.getEmptyTableMessage(this.props.currentCurrencySymbol)}
        </div>
      </JTable>
    )
  }

  getEmptyTableMessage = (currentCurrencySymbol) => {
    const message = currentCurrencySymbol.length
      ? `Look like there isn't any ${currentCurrencySymbol} in your account yet`
      : 'Look like there isn\'t any active currency'

    if (currentCurrencySymbol === 'ETH') {
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

  preloadEmptyTableImage = () => {
    const emptyTableImage = new Image()
    emptyTableImage.src = this.state.emptyTableImageSrc
  }

  sortTransactions = field => (/* event */) => this.props.sortTransactions(field)
  sendFunds = (/* event */) => this.props.openSendFundsModal(this.props.currentCurrencyIndex)
  receiveFunds = (/* event */) => this.props.openReceiveFundsModal(this.props.currentCurrencyIndex)
  convertFunds = (/* event */) => this.props.openConvertFundsModal(this.props.currentCurrencyIndex)
  filterTransactions = isFilterOpen => (/* event */) => this.props.filterTransactions(isFilterOpen)
  removeCurrency = (/* event */) => this.props.toggleActiveCurrency(this.props.currentCurrencyIndex)
  toggleActive = i => (/* event */) => this.setState({ active: (this.state.active === i) ? -1 : i })
}

TransactionsTable.propTypes = {
  toggleActiveCurrency: PropTypes.func.isRequired,
  setCurrentCurrency: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  setStartFilterTime: PropTypes.func.isRequired,
  setEndFilterTime: PropTypes.func.isRequired,
  filterTransactions: PropTypes.func.isRequired,
  currenciesItems: PropTypes.arrayOf(PropTypes.shape({
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
  currentCurrencySymbol: PropTypes.string.isRequired,
  currentCurrencyIndex: PropTypes.number.isRequired,
}

export default TransactionsTable
