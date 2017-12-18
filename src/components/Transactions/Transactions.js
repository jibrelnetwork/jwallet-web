import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { find, isEmpty } from 'lodash'

import config from 'config'
import getWindowWidth from 'utils/getWindowWidth'

import KeystoreButtons from 'components/KeystoreButtons'

import TransactionsEmpty from './Empty'
import TransactionsFilters from './Filters'
import TransactionsLoading from './Loading'
import TransactionsTable from './Table'

const { mobileWidth } = config

class Transactions extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: -1,
      emptyImageSrc: '/img/no-data.svg',
      isMobile: (getWindowWidth() <= mobileWidth),
    }
  }

  componentDidMount() {
    this.preloadEmptyTableImage()
  }

  componentWillMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.currentCurrencySymbol !== nextProps.currentCurrencySymbol) {
      this.setState({ active: -1 })
    }
  }

  render() {
    const {
      transactions,
      currentCurrencySymbol,
      isKeystoreInitialised,
      isCustomNetwork,
    } = this.props

    const { isLoading, isBlockExplorerError } = transactions
    const isCurrenciesEmpty = isEmpty(currentCurrencySymbol)

    if (isLoading) {
      return this.renderTransactionsLoading()
    } else if (!isKeystoreInitialised) {
      return this.renderKeystoreButtons()
    } else if (isCustomNetwork || isBlockExplorerError || isCurrenciesEmpty) {
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
    const { transactions, accountAddress, isCustomNetwork } = this.props

    return (
      <TransactionsEmpty
        accountAddress={accountAddress}
        emptyImageSrc={this.state.emptyImageSrc}
        isCustomNetwork={isCustomNetwork}
        isBlockExplorerError={transactions.isBlockExplorerError}
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

    const { filterData, sortField, sortDirection, searchQuery } = transactions
    const { emptyImageSrc, active, isMobile } = this.state
    const foundAndFilteredTransactions = this.getTransactions()

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
          setCurrentDigitalAssetAddress={this.setCurrentDigitalAssetAddress}
          toggleActive={this.toggleActive}
          isToken={this.isToken}
          transactions={foundAndFilteredTransactions}
          sortField={sortField}
          sortDirection={sortDirection}
          currentCurrencySymbol={currentCurrencySymbol}
          emptyImageSrc={emptyImageSrc}
          activeTransactionIndex={active}
          isTransactionsEmpty={isEmpty(foundAndFilteredTransactions)}
          isFilterOpen={filterData.isOpen}
          isMobile={isMobile}
        />
      </div>
    )
  }

  preloadEmptyTableImage = () => {
    const emptyImage = new Image()
    emptyImage.src = this.state.emptyImageSrc
  }

  setCurrentDigitalAssetAddress = (contractAddress) => {
    return isEmpty(contractAddress) ? null : (e) => {
      e.preventDefault()

      this.props.setCurrentDigitalAssetAddress(contractAddress)

      e.stopPropagation()
    }
  }

  isToken = (contractAddress) => {
    if (isEmpty(contractAddress)) {
      return false
    }

    return !!find(this.props.currencyItems, { address: contractAddress })
  }

  getTransactions = () => {
    const { items, foundItemsHashes, searchQuery } = this.props.transactions

    if (isEmpty(items)) {
      return []
    }

    const isItemsFound = item => (foundItemsHashes.indexOf(item.transactionHash) > -1)
    const foundItems = isEmpty(searchQuery) ? items : items.filter(isItemsFound)

    return this.getFilteredTransactions(foundItems)
  }

  getFilteredTransactions = (foundItems) => {
    const { startTime, endTime, isOpen } = this.props.transactions.filterData

    const isStartTime = (isOpen && (startTime !== 0))
    const isEndTime = (isOpen && (endTime !== 0))

    return foundItems
      .map((item) => {
        const { timestamp } = item
        const isAfterStartTime = isStartTime ? (timestamp > startTime) : true
        const isBeforeEndTime = isEndTime ? (timestamp < endTime) : true

        return (isAfterStartTime && isBeforeEndTime) ? item : null
      })
      .filter(item => !!item)
  }

  onResize = () => {
    const { isMobile } = this.state
    const isMobileWidth = (getWindowWidth() <= mobileWidth)

    /**
     * ignore if was mobile and will be mobile
     * ignore if was not mobile and will not be mobile
     */
    if (isMobile && isMobileWidth) {
      return
    } else if (!(isMobile || isMobileWidth)) {
      return
    }

    this.setState({ isMobile: isMobileWidth })
  }

  sortTransactions = field => () => this.props.sortTransactions(field)
  sendFunds = () => this.props.openSendFundsModal(this.props.currentAddress)
  receiveFunds = () => this.props.openReceiveFundsModal(this.props.currentAddress)
  convertFunds = () => this.props.openConvertFundsModal(this.props.currentAddress)
  filterTransactions = isFilterOpen => () => this.props.filterTransactions(isFilterOpen)
  removeCurrency = () => this.props.toggleDigitalAsset(this.props.currentAddress)
  toggleActive = i => () => this.setState({ active: (this.state.active === i) ? -1 : i })
}

Transactions.propTypes = {
  toggleDigitalAsset: PropTypes.func.isRequired,
  setCurrentDigitalAssetAddress: PropTypes.func.isRequired,
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
      transactionHash: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      contractAddress: PropTypes.string.isRequired,
      fee: PropTypes.number.isRequired,
      amount: PropTypes.number.isRequired,
      timestamp: PropTypes.number.isRequired,
      /* optional */
      from: PropTypes.string,
      to: PropTypes.string,
      address: PropTypes.string,
    })).isRequired,
    foundItemsHashes: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isBlockExplorerError: PropTypes.bool.isRequired,
  }).isRequired,
  currentCurrencySymbol: PropTypes.string.isRequired,
  accountAddress: PropTypes.string.isRequired,
  isKeystoreInitialised: PropTypes.bool.isRequired,
  isCustomNetwork: PropTypes.bool.isRequired,
  /* optional */
  currentAddress: PropTypes.string,
}

Transactions.defaultProps = {
  currentAddress: null,
}

export default Transactions
