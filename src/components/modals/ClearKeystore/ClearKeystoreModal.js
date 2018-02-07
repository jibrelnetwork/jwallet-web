import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'

class ClearKeystoreModal extends SubmitModal {
  renderModalBody = () => ''
  closeModal = () => this.props.closeClearKeystoreModal()
  submitModal = () => this.props.removeKeystoreAccounts()
}

ClearKeystoreModal.propTypes = {
  closeClearKeystoreModal: PropTypes.func.isRequired,
  removeKeystoreAccounts: PropTypes.func.isRequired,
  alert: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default ClearKeystoreModal
