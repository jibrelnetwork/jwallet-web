import { connect } from 'react-redux'

import {
  getAccounts,
  openAccountManager,
  closeAccountManager,
  setCurrentAccount,
  toggleAccount,
  searchAccounts,
  sortAccounts,
  addCustomToken,
} from 'routes/JWallet/modules/accounts'

import { getTransactions } from 'routes/JWallet/modules/transactions'

import JWallet from '../components/JWallet'

const mapStateToProps = state => ({
  accounts: state.accounts,
  transactions: state.transactions,
})

const mapDispatchToProps = {
  getAccounts,
  openAccountManager,
  closeAccountManager,
  setCurrentAccount,
  toggleAccount,
  searchAccounts,
  sortAccounts,
  addCustomToken,
  getTransactions,
}

export default connect(mapStateToProps, mapDispatchToProps)(JWallet)
