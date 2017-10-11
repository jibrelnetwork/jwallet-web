import { connect } from 'react-redux'

import { toggleActiveCurrency, setCurrentCurrency } from 'routes/JWallet/modules/currencies'

import {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
} from 'routes/JWallet/modules/funds'

import {
  getTransactions,
  searchTransactions,
  sortTransactions,
  setStartFilterTime,
  setEndFilterTime,
  filterTransactions,
} from 'routes/JWallet/modules/transactions'

import Transactions from './Transactions'

const mapStateToProps = (state) => {
  const { items, currentActiveIndex } = state.currencies
  const currentCurrency = items[currentActiveIndex]
  const currentCurrencySymbol = currentCurrency ? currentCurrency.symbol : ''

  return {
    currentCurrencySymbol,
    currentCurrencyIndex: currentActiveIndex,
    currenciesItems: items,
    transactions: state.transactions,
  }
}

const mapDispatchToProps = {
  toggleActiveCurrency,
  setCurrentCurrency,
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
  getTransactions,
  searchTransactions,
  sortTransactions,
  setStartFilterTime,
  setEndFilterTime,
  filterTransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
