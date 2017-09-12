import { connect } from 'react-redux'

import {
  closeAccountManager,
  toggleAccount,
  searchAccounts,
  sortAccounts,
  openAddCustomTokenModal,
} from 'routes/JWallet/modules/accounts'

import AccountManager from './AccountManager'

const mapStateToProps = state => ({
  accounts: state.accounts,
})

const mapDispatchToProps = {
  closeAccountManager,
  toggleAccount,
  searchAccounts,
  sortAccounts,
  openAddCustomTokenModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountManager)
