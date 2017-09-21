import { connect } from 'react-redux'

import {
  closeAddCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  addCustomToken,
  openAccountManager,
} from 'routes/JWallet/modules/accounts'

import AddCustomTokenModal from './AddCustomTokenModal'

const mapStateToProps = state => ({
  accounts: state.accounts,
})

const mapDispatchToProps = {
  closeAddCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  addCustomToken,
  openAccountManager,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomTokenModal)
