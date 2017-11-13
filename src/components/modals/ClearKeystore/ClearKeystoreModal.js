import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'

class ClearKeystoreModal extends SubmitModal {
  renderModalBody = () => ''
  closeModal = () => this.props.closeClearKeystoreModal()
  setPassword = password => this.props.setClearKeystorePassword(password)
  submitModal = () => this.props.removeKeystoreAccounts(this.props.password)
}

ClearKeystoreModal.propTypes = {
  closeClearKeystoreModal: PropTypes.func.isRequired,
  setClearKeystorePassword: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  alert: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

ClearKeystoreModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default ClearKeystoreModal
