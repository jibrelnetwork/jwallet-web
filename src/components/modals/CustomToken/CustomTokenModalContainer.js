import { connect } from 'react-redux'

import {
  closeCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  setCustomTokenInvalidField,
} from 'routes/JWallet/modules/modals/customToken'

import { addCustomToken } from 'routes/JWallet/modules/currencies'

import CustomTokenModal from './CustomTokenModal'

const mapStateToProps = state => state.customTokenModal

const mapDispatchToProps = {
  closeCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  setCustomTokenInvalidField,
  addCustomToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTokenModal)
