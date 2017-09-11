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

import YourAccounts from './YourAccounts'

const mapStateToProps = state => ({
  accounts: state.accounts,
  isTransactionsLoading: state.transactions.isLoading,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(YourAccounts)
