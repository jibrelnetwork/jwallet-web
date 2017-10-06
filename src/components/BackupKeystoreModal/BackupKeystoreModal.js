import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class BackupKeystoreModal extends Component {
  render() {
    const { closeBackupKeystoreModal, keystore } = this.props
    const { alert, password } = keystore.backupData

    return (
      <JModal
        closeModal={closeBackupKeystoreModal}
        submitModal={handleEnterKeyPress(this.backupKeystore(password))}
        name='backup-keystore'
        alert={alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keystore.isBackupKeystoreModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Backup Keystore'}</div>
  }

  renderBody = () => {
    return (
      <div className='backup-keys__body'>
        {this.renderPassword()}
      </div>
    )
  }

  renderPassword = () => {
    const { setBackupKeystorePassword, keystore } = this.props

    return (
      <JTextInput
        onValueChange={setBackupKeystorePassword}
        name='backup-password'
        placeholder='Keystore password'
        value={keystore.backupData.password}
        errorMessage={this.getInvalidFieldMessage('password')}
        successMessage={this.getValidFieldMessage('password')}
        editable={this.isEnabledField('password')}
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    const { backupKeystore, keystore } = this.props

    return (
      <JModalButton
        onPress={this.backupKeystore(keystore.backupData.password)}
        name={'backup-keystore'}
        title={'Save as TXT'}
        iconName={'txt'}
        disabled={this.props.keystore.backupData.invalidFields.length > 0}
      />
    )
  }

  isEnabledField = n => (this.props.keystore.backupData.disabledFields.indexOf(n) === -1)
  getValidFieldMessage = n => getFieldMessage(this.props.keystore.backupData.validFields, n)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keystore.backupData.invalidFields, n)
  backupKeystore = password => (/* event */) => this.props.backupData(password)
}

BackupKeystoreModal.propTypes = {
  closeBackupKeystoreModal: PropTypes.func.isRequired,
  setBackupKeystorePassword: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    backupData: PropTypes.shape({
      validFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      invalidFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      disabledFields: PropTypes.arrayOf(PropTypes.string).isRequired,
      password: PropTypes.string.isRequired,
      alert: PropTypes.string,
    }).isRequired,
    isBackupKeystoreModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default BackupKeystoreModal
