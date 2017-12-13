import { connect } from 'react-redux'

import { closeAlphaWarningModal } from 'routes/JWallet/modules/modals/alphaWarning'

import AlphaWarningModal from './AlphaWarningModal'

const mapStateToProps = state => ({
  ...state.alphaWarningModal,
  modalTitle: '',
  modalName: 'alpha-warning',
  buttonTitle: i18n('modals.alphaWarning.buttonTitle'),
})

const mapDispatchToProps = { closeAlphaWarningModal }

export default connect(mapStateToProps, mapDispatchToProps)(AlphaWarningModal)
