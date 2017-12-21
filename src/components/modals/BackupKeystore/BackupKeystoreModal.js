import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'

class BackupKeystoreModal extends SubmitModal {
  renderModalBody = () => ''
  submitModal = () => this.backupKeystore()
  closeModal = () => this.props.closeModal()
  setPassword = password => this.props.setPassword(password)
  backupKeystore = () => this.props.backupKeystore(this.props.password)
}

BackupKeystoreModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  imageName: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
}

export default BackupKeystoreModal
