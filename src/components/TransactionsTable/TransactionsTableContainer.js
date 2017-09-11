import { connect } from 'react-redux'

import { toggleAccount } from 'routes/JWallet/modules/accounts'

import {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
} from 'routes/JWallet/modules/funds'

import {
  getTransactions,
  searchTransactions,
  sortTransactions,
  filterTransactions,
} from 'routes/JWallet/modules/transactions'

import TransactionsTable from './TransactionsTable'

const mapStateToProps = (state) => {
  const { items, currentActiveIndex } = state.accounts
  const currentAccount = items[currentActiveIndex]
  const currentAccountSymbol = currentAccount ? currentAccount.symbol : ''

  return {
    currentAccountSymbol,
    currentAccountIndex: currentActiveIndex,
    transactions: state.transactions,
  }
}

const mapDispatchToProps = {
  toggleAccount,
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
  getTransactions,
  searchTransactions,
  sortTransactions,
  filterTransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsTable)
