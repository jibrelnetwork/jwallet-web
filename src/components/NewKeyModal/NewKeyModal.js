import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class NewKeyModal extends Component {
  render() {
    const { closeNewKeyModal, createKeystoreAccount, keystore } = this.props

    return (
      <JModal
        closeModal={closeNewKeyModal}
        submitModal={handleEnterKeyPress(createKeystoreAccount)}
        name='new-key'
        alert={keystore.newKeyData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keystore.isNewKeysModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'New Key'}</div>
  }

  renderBody = () => {
    const { setNewKeysMnemonic, keystore } = this.props

    return (
      <JTextInput
        onValueChange={setNewKeysMnemonic}
        name='new-key-mnemonic'
        placeholder='Mnemonic'
        value={keystore.newKeyData.mnemonic}
        errorMessage={this.getInvalidFieldMessage('mnemonic')}
        successMessage={this.getValidFieldMessage('mnemonic')}
        editable={this.isEnabledField('mnemonic')}
        multiline
      />
    )
  }

  renderFooter = () => {
    const { saveNewKeysAsTXT, keystore } = this.props

    return (
      <JModalButton
        onPress={saveNewKeysAsTXT}
        name={'new-key'}
        iconName={'txt'}
        title={'Save as TXT'}
        disabled={keystore.newKeyData.invalidFields.length > 0}
      />
    )
  }

  isEnabledField = n => (this.props.keystore.newKeyData.disabledFields.indexOf(n) === -1)
  getValidFieldMessage = n => getFieldMessage(this.props.keystore.newKeyData.validFields, n)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keystore.newKeyData.invalidFields, n)
}

NewKeyModal.propTypes = {
  closeNewKeyModal: PropTypes.func.isRequired,
  setNewKeyMnemonicConfirm: PropTypes.func.isRequired,
  setNewKeyPassword: PropTypes.func.isRequired,
  setNewKeyPasswordConfirm: PropTypes.func.isRequired,
  createKeystoreAccount: PropTypes.func.isRequired,
  backupKeystore: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    newKeyData: PropTypes.shape({
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
      mnemonicConfirm: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      passwordConfirm: PropTypes.string.isRequired,
    }).isRequired,
    isNewKeyModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default NewKeyModal
