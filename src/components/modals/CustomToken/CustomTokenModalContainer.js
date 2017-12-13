import { connect } from 'react-redux'

import {
  closeCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
} from 'routes/JWallet/modules/modals/customToken'

import { addCustomToken } from 'routes/JWallet/modules/currencies'

import CustomTokenModal from './CustomTokenModal'

const mapStateToProps = ({ customTokenModal }) => ({
  ...customTokenModal,
  modalName: 'custom-token',
  modalTitle: i18n('modals.addCustomToken.title'),
  buttonTitle: i18n('modals.addCustomToken.buttonTitle'),
})

const mapDispatchToProps = {
  closeCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  addCustomToken,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTokenModal)
