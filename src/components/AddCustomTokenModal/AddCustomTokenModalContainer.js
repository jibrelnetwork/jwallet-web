import { connect } from 'react-redux'

import {
  closeAddCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  addCustomToken,
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
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomTokenModal)
