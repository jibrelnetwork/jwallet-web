import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getFieldMessage from 'utils/getFieldMessage'

import { JIcon, JModal, JModalButton, JPicker, JTextInput } from 'components/base'

import PincodeButton from 'components/PincodeButton'

class BackupKeysModal extends Component {
  render() {
    const { closeBackupKeysModal, keys } = this.props

    return (
      <JModal
        closeModal={closeBackupKeysModal}
        name='backup-keys'
        alert={keys.backupKeysData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keys.isBackupKeysModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Backup Keys'}</div>
  }

  renderBody = () => {
    return (
      <div className='backup-keys__body'>
        {this.renderAddress()}
        {this.renderPrivateKey()}
        {this.renderMnemonic()}
      </div>
    )
  }

  renderAddress = () => {
    const { setBackupKeysAddress, keys } = this.props

    return (
      <JPicker
        onValueChange={setBackupKeysAddress}
        name='address'
        placeholder='Select address'
        selectedValue={keys.backupKeysData.address}
        errorMessage={this.getInvalidFieldMessage('address')}
        successMessage={this.getValidFieldMessage('address')}
        enabled={this.isEnabledField('address')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderPrivateKey = () => {
    const { setBackupKeysPrivateKey, keys } = this.props

    return (
      <JTextInput
        onValueChange={setBackupKeysPrivateKey}
        name='private-key'
        placeholder='Private key'
        value={keys.backupKeysData.privateKey}
        errorMessage={this.getInvalidFieldMessage('privateKey')}
        successMessage={this.getValidFieldMessage('privateKey')}
        editable={this.isEnabledField('privateKey')}
        secureTextEntry
      />
    )
  }

  renderMnemonic = () => {
    const { setBackupKeysMnemonic, keys } = this.props

    return (
      <JTextInput
        onValueChange={setBackupKeysMnemonic}
        name='mnemonic'
        placeholder='Mnemonic'
        value={keys.backupKeysData.mnemonic}
        errorMessage={this.getInvalidFieldMessage('mnemonic')}
        successMessage={this.getValidFieldMessage('mnemonic')}
        editable={this.isEnabledField('mnemonic')}
        multiline
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    const { setBackupKeysPincode, backupKeys, keys } = this.props

    return (
      <PincodeButton
        setPincode={setBackupKeysPincode}
        onPress={backupKeys}
        pincode={keys.backupKeysData.pincode}
      />
    )
  }

  isEnabledField = name => (this.props.keys.backupKeysData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.keys.backupKeysData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keys.backupKeysData.invalidFields, n)
}

BackupKeysModal.propTypes = {
  closeBackupKeysModal: PropTypes.func.isRequired,
  setBackupKeysAddress: PropTypes.func.isRequired,
  setBackupKeysPrivateKey: PropTypes.func.isRequired,
  setBackupKeysMnemonic: PropTypes.func.isRequired,
  setBackupKeysPincode: PropTypes.func.isRequired,
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
