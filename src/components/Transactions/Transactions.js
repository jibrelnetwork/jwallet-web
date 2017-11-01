import React, { Component } from 'react'
import PropTypes from 'prop-types'

import TransactionsFilters from './Filters'
import TransactionsTable from './Table'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = { active: -1, emptyTableImageSrc: '/img/no-data.svg' }
  }

  componentDidMount() {
    this.preloadEmptyTableImage()
  }

  render() {
    const {
      searchTransactions,
      setStartFilterTime,
      setEndFilterTime,
      transactions,
      currentCurrencySymbol,
    } = this.props

    const { emptyTableImageSrc, active } = this.state
    const { filterData, searchQuery } = transactions

    return (
      <div className='transactions'>
        <TransactionsFilters
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
        <TransactionsTable
          sortTransactions={this.sortTransactions}
          getCurrencyIndex={this.getCurrencyIndex}
          setCurrentCurrency={this.setCurrentCurrency}
          toggleActive={this.toggleActive}
          transactions={transactions}
          currentCurrencySymbol={currentCurrencySymbol}
          emptyTableImageSrc={emptyTableImageSrc}
          activeTransactionIndex={active}
          isTransactionsEmpty={this.isTransactionsEmpty()}
        />
      </div>
    )
  }

  preloadEmptyTableImage = () => {
    const emptyTableImage = new Image()
    emptyTableImage.src = this.state.emptyTableImageSrc
  }

  getCurrencyIndex = (requestedAddress) => {
    let foundIndex = -1

    this.props.currenciesItems.forEach(({ address, isActive, isAuthRequired }, index) => {
      if (!isActive || isAuthRequired) {
        return
      }

      if (address === requestedAddress) {
        foundIndex = index
      }
    })

    return foundIndex
  }

  setCurrentCurrency = currencyIndex => (e) => {
    e.preventDefault()

    this.props.setCurrentCurrency(currencyIndex)

    e.stopPropagation()
  }

  isTransactionsEmpty = () => {
    const { items, foundItemsHashes, searchQuery } = this.props.transactions

    if (!items.length) {
      return true
    }

    const isItemsFound = item => (foundItemsHashes.indexOf(item.txHash) > -1)
    const isSearching = (searchQuery && searchQuery.length)
    const foundItems = isSearching ? items.filter(isItemsFound) : items

    const isSearchedTransactionsEmpty = (isSearching && !foundItems.length)
    const isFilteredTransactionsEmpty = this.isFilteredTransactionsEmpty(foundItems)

    if (isSearchedTransactionsEmpty || isFilteredTransactionsEmpty) {
      return true
    }

    return false
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

  sortTransactions = field => (/* event */) => this.props.sortTransactions(field)
  sendFunds = (/* event */) => this.props.openSendFundsModal(this.props.currentCurrencyIndex)
  receiveFunds = (/* event */) => this.props.openReceiveFundsModal(this.props.currentCurrencyIndex)
  convertFunds = (/* event */) => this.props.openConvertFundsModal(this.props.currentCurrencyIndex)
  filterTransactions = isFilterOpen => (/* event */) => this.props.filterTransactions(isFilterOpen)
  removeCurrency = (/* event */) => this.props.toggleActiveCurrency(this.props.currentCurrencyIndex)
  toggleActive = i => (/* event */) => this.setState({ active: (this.state.active === i) ? -1 : i })
}

Transactions.propTypes = {
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
      status: PropTypes.string.isRequired,
      from: PropTypes.string.isRequired,
      to: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      transactionHash: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      fee: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
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

export default Transactions
