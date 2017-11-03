import React from 'react'
import PropTypes from 'prop-types'

import SubmitModal from 'components/SubmitModal'
import JTextInput from 'components/base/JTextInput'

class BackupKeystoreModal extends SubmitModal {
  renderModalBody = () => {
    return this.renderPassword()
  }

  renderPassword = () => {
    const { setBackupKeystorePassword, invalidFields, password } = this.props

    return (
      <JTextInput
        onValueChange={setBackupKeystorePassword}
        name='backup-password'
        placeholder='Keystore password'
        value={password}
        errorMessage={invalidFields.password}
        editable
        secureTextEntry
      />
    )
  }

  backupKeystore = () => {
    const { backupKeystore, password } = this.props

    backupKeystore(password, this.closeModal, this.setIncorrectPassword)
  }

  setIncorrectPassword = (err) => {
    this.props.setBackupKeystoreInvalidField('password', err.message)
    this.shake()
  }

  submitModal = () => this.backupKeystore()
  closeModal = () => this.props.closeBackupKeystoreModal()
  isModalButtonDisabled = () => (this.props.password.length < 1)
}

BackupKeystoreModal.propTypes = {
  closeBackupKeystoreModal: PropTypes.func.isRequired,
  setBackupKeystorePassword: PropTypes.func.isRequired,
  setBackupKeystoreInvalidField: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  password: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

BackupKeystoreModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default BackupKeystoreModal
