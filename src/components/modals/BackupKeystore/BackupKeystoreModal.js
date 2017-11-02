import React from 'react'
import PropTypes from 'prop-types'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import { JModal, JTextInput } from 'components/base'

class BackupKeystoreModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'backup-keystore' }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Backup Keystore'}</div>
  }

  renderBody = () => {
    return this.renderPassword()
  }

  renderFooter = () => {
    return (
      <JModal.Button
        onPress={this.backupKeystore}
        name={'backup-keystore'}
        title={'Save as TXT'}
        iconName={'txt'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  renderPassword = () => {
    const { setBackupKeystorePassword, password } = this.props

    return (
      <JTextInput
        onValueChange={setBackupKeystorePassword}
        name='backup-password'
        placeholder='Keystore password'
        value={password}
        errorMessage={this.getInvalidFieldMessage('password')}
        editable
        secureTextEntry
      />
    )
  }

  closeModal = () => {
    const { closeBackupKeystoreModal, onClose } = this.props

    if (onClose) {
      onClose()
    }

    closeBackupKeystoreModal()
  }

  submitModal = event => handleEnterKeyPress(this.backupKeystore)(event)

  backupKeystore = () => {
    const { backupKeystore, password } = this.props

    backupKeystore(password, this.closeModal, this.setIncorrectPassword)
  }

  setIncorrectPassword = (err) => {
    this.props.setBackupKeystoreInvalidField('password', err.message)
    this.shake()
  }

  isModalButtonDisabled = () => (this.props.password.length < 1)
}

BackupKeystoreModal.propTypes = {
  closeBackupKeystoreModal: PropTypes.func.isRequired,
  setBackupKeystorePassword: PropTypes.func.isRequired,
  setBackupKeystoreInvalidField: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  invalidFields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  })).isRequired,
  password: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

BackupKeystoreModal.defaultProps = {
  onClose: null,
}

export default BackupKeystoreModal
