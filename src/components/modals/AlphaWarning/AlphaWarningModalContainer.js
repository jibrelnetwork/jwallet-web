import { connect } from 'react-redux'

import { closeModal, startTimer } from 'routes/JWallet/modules/modals/alphaWarning'

import AlphaWarningModal from './AlphaWarningModal'

const mapStateToProps = ({ alphaWarningModal: { isOpen, seconds } }) => ({
  isOpen,
  seconds,
  modalTitle: '',
  modalName: 'alpha-warning',
  buttonTitle: (seconds > 0) ? `${seconds}` : i18n('modals.alphaWarning.buttonTitle'),
})

const mapDispatchToProps = {
  closeModal,
  startTimer,
}

export default connect(mapStateToProps, mapDispatchToProps)(AlphaWarningModal)
