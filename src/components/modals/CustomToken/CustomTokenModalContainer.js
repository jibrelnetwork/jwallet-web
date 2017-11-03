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

const mapStateToProps = state => ({
  ...state.customTokenModal,
  modalName: 'custom-token',
  modalTitle: 'Add Custom Token',
  buttonTitle: 'Save',
  iconName: '',
})

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
