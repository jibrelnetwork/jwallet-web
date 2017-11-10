import { connect } from 'react-redux'

import { toggleActiveCurrency, setCurrentCurrency } from 'routes/JWallet/modules/currencies'

import {
  getTransactions,
  searchTransactions,
  sortTransactions,
  setStartFilterTime,
  setEndFilterTime,
  filterTransactions,
} from 'routes/JWallet/modules/transactions'

import { openConvertFundsModal } from 'routes/JWallet/modules/modals/convertFunds'
import { openReceiveFundsModal } from 'routes/JWallet/modules/modals/receiveFunds'
import { openSendFundsModal } from 'routes/JWallet/modules/modals/sendFunds'
import { openNewKeystoreAccountModal } from 'routes/JWallet/modules/modals/newKeystoreAccount'
import { openImportKeystoreAccountModal } from 'routes/JWallet/modules/modals/importKeystoreAccount'

import Transactions from './Transactions'

const mapStateToProps = (state) => {
  const { currencies, keystore, networks, transactions } = state
  const { items, currentActiveIndex } = currencies
  const currentCurrency = items[currentActiveIndex]
  const currentCurrencySymbol = currentCurrency ? currentCurrency.symbol : ''
  const isKeystoreInitialised = !!keystore.accounts.length

  return {
    transactions,
    currentCurrencySymbol,
    isKeystoreInitialised,
    currencyItems: items,
    currentCurrencyIndex: currentActiveIndex,
    isCustomNetwork: (networks.currentActiveIndex > 3),
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
  openNewKeystoreAccountModal: openNewKeystoreAccountModal.bind(null, null),
  openImportKeystoreAccountModal: openImportKeystoreAccountModal.bind(null, null),
}

export default connect(mapStateToProps, mapDispatchToProps)(Transactions)
