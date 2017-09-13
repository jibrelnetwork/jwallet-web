import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JModal from 'components/base/JModal'

class BackupKeysModal extends Component {
  render() {
    const { closeBackupKeysModal, keys } = this.props

    return (
      <JModal
        closeModal={closeBackupKeysModal}
        name='backup-keys'
        header={'Backup Keys'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keys.isBackupKeysModalOpen}
      />
    )
  }

  renderBody = () => {
    return 'Backup Keys Body'
  }

  renderFooter = () => {
    return 'Backup Keys Footer'
  }
}

BackupKeysModal.propTypes = {
  closeBackupKeysModal: PropTypes.func.isRequired,
  setBackupKeysAddress: PropTypes.func.isRequired,
  setBackupKeysPrivateKey: PropTypes.func.isRequired,
  setBackupKeysMnemonic: PropTypes.func.isRequired,
  backupKeys: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    backupKeysData: PropTypes.shape({
      validFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      invalidFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      disabledFields: PropTypes.arrayOf(PropTypes.string).isRequired,
      alert: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      privateKey: PropTypes.string.isRequired,
      mnemonic: PropTypes.string.isRequired,
    }).isRequired,
    isNewKeysModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default BackupKeysModal
