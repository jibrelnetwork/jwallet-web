import React, { Component } from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import KeystoreButtons from 'components/KeystoreButtons'

import TransactionsEmpty from './Empty'
import TransactionsFilters from './Filters'
import TransactionsLoading from './Loading'
import TransactionsTable from './Table'

class Transactions extends Component {
  constructor(props) {
    super(props)
    this.state = { active: -1, emptyImageSrc: '/img/no-data.svg' }
  }

  componentDidMount() {
    this.preloadEmptyTableImage()
  }

  render() {
    const { transactions, isKeystoreInitialised, isCustomNetwork } = this.props
    const { isLoading, isBlockExplorerError } = transactions

    if (isLoading) {
      return this.renderTransactionsLoading()
    } else if (!isKeystoreInitialised) {
      return this.renderKeystoreButtons()
    } else if (isCustomNetwork || isBlockExplorerError) {
      return this.renderTransactionsEmpty()
    }

    return this.renderTransactions()
  }

  renderTransactionsLoading = () => {
    return <TransactionsLoading />
  }

  renderKeystoreButtons = () => {
    const { openNewKeystoreAccountModal, openImportKeystoreAccountModal } = this.props

    return (
      <KeystoreButtons
        openNewKeystoreAccountModal={openNewKeystoreAccountModal}
        openImportKeystoreAccountModal={openImportKeystoreAccountModal}
      />
    )
  }

  renderTransactionsEmpty = () => {
    return (
      <TransactionsEmpty
        emptyImageSrc={this.state.emptyImageSrc}
        isCustomNetwork={this.props.isCustomNetwork}
      />
    )
  }

  renderTransactions = () => {
    const {
      searchTransactions,
      setStartFilterTime,
      setEndFilterTime,
      transactions,
      currentCurrencySymbol,
    } = this.props

    const { filterData, searchQuery } = transactions
    const { emptyImageSrc, active } = this.state

    return (
      <div className='transactions'>
        <TransactionsFilters
          searchTransactions={searchTransactions}
          sendFunds={this.sendFunds}
          receiveFunds={this.receiveFunds}
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
          emptyImageSrc={emptyImageSrc}
          activeTransactionIndex={active}
          isTransactionsEmpty={this.isTransactionsEmpty()}
        />
      </div>
    )
  }

  preloadEmptyTableImage = () => {
    const emptyImage = new Image()
    emptyImage.src = this.state.emptyImageSrc
  }

  getCurrencyIndex = (requestedAddress) => {
    let foundIndex = -1

    if (isEmpty(requestedAddress)) {
      return foundIndex
    }

    this.props.currencyItems.forEach(({ address, isActive, isAuthRequired }, index) => {
      if (!isActive || isAuthRequired) {
        return
      }

      if (address.toLowerCase() === requestedAddress) {
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

  sortTransactions = field => () => this.props.sortTransactions(field)
  sendFunds = () => this.props.openSendFundsModal(this.props.currentCurrencyIndex)
  receiveFunds = () => this.props.openReceiveFundsModal(this.props.currentCurrencyIndex)
  convertFunds = () => this.props.openConvertFundsModal(this.props.currentCurrencyIndex)
  filterTransactions = isFilterOpen => () => this.props.filterTransactions(isFilterOpen)
  removeCurrency = () => this.props.toggleActiveCurrency(this.props.currentCurrencyIndex)
  toggleActive = i => () => this.setState({ active: (this.state.active === i) ? -1 : i })
}

Transactions.propTypes = {
  toggleActiveCurrency: PropTypes.func.isRequired,
  setCurrentCurrency: PropTypes.func.isRequired,
  openSendFundsModal: PropTypes.func.isRequired,
  openReceiveFundsModal: PropTypes.func.isRequired,
  openConvertFundsModal: PropTypes.func.isRequired,
  openNewKeystoreAccountModal: PropTypes.func.isRequired,
  openImportKeystoreAccountModal: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  searchTransactions: PropTypes.func.isRequired,
  sortTransactions: PropTypes.func.isRequired,
  setStartFilterTime: PropTypes.func.isRequired,
  setEndFilterTime: PropTypes.func.isRequired,
  filterTransactions: PropTypes.func.isRequired,
  currencyItems: PropTypes.arrayOf(PropTypes.shape({
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
      contractAddress: PropTypes.string.isRequired,
      fee: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
    })).isRequired,
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isBlockExplorerError: PropTypes.bool.isRequired,
  }).isRequired,
  currentCurrencySymbol: PropTypes.string.isRequired,
  currentCurrencyIndex: PropTypes.number.isRequired,
  isKeystoreInitialised: PropTypes.bool.isRequired,
  isCustomNetwork: PropTypes.bool.isRequired,
}

export default Transactions
