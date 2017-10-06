import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class ImportKeyModal extends Component {
  render() {
    const { closeImportKeyModal, createKeystoreAccount, keystore } = this.props

    return (
      <JModal
        closeModal={closeImportKeyModal}
        submitModal={handleEnterKeyPress(createKeystoreAccount)}
        name='import-key'
        alert={keystore.importKeyData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keystore.isImportKeyModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Import Key'}</div>
  }

  renderBody = () => {
    return (
      <div className='import-key__body'>
        {this.renderData()}
        {this.renderPassword()}
        {this.renderPasswordConfirm()}
      </div>
    )
  }

  renderData = () => {
    const { setImportKeyData, keystore } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeyData}
        name='import-key-data'
        placeholder='Address, private key, mnemonic, BIP32 xpub'
        value={keystore.importKeyData.data}
        errorMessage={this.getInvalidFieldMessage('data')}
        successMessage={this.getValidFieldMessage('data')}
        editable={this.isEnabledField('data')}
        multiline
      />
    )
  }

  renderPassword = () => {
    const { setImportKeyPassword, keystore } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeyPassword}
        name='password'
        placeholder='Your new keystore password'
        value={keystore.importKeyData.password}
        errorMessage={this.getInvalidFieldMessage('password')}
        successMessage={this.getValidFieldMessage('password')}
        editable={this.isEnabledField('password')}
        secureTextEntry
      />
    )
  }

  renderPasswordConfirm = () => {
    const { setImportKeyPasswordConfirm, keystore } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeyPasswordConfirm}
        name='password-confirm'
        placeholder='Confirm your password'
        value={keystore.importKeyData.passwordConfirm}
        errorMessage={this.getInvalidFieldMessage('passwordConfirm')}
        successMessage={this.getValidFieldMessage('passwordConfirm')}
        editable={this.isEnabledField('passwordConfirm')}
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    const { createKeystoreAccount, keystore } = this.props

    return (
      <JModalButton
        onPress={createKeystoreAccount}
        name={'import-key'}
        iconName={'import-key'}
        title={'Import Key'}
        disabled={keystore.importKeyData.invalidFields.length > 0}
      />
    )
  }

  isEnabledField = n => (this.props.keystore.importKeyData.disabledFields.indexOf(n) === -1)
  getValidFieldMessage = n => getFieldMessage(this.props.keystore.importKeyData.validFields, n)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keystore.importKeyData.invalidFields, n)
}

ImportKeyModal.propTypes = {
  closeImportKeyModal: PropTypes.func.isRequired,
  setImportKeyData: PropTypes.func.isRequired,
  setImportKeyPassword: PropTypes.func.isRequired,
  setImportKeyPasswordConfirm: PropTypes.func.isRequired,
  createKeystoreAccount: PropTypes.func.isRequired,
  keystore: PropTypes.shape({
    importKeyData: PropTypes.shape({
      validFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      invalidFields: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        message: PropTypes.string.isRequired,
      })).isRequired,
      disabledFields: PropTypes.arrayOf(PropTypes.string).isRequired,
      data: PropTypes.string.isRequired,
      password: PropTypes.string.isRequired,
      passwordConfirm: PropTypes.string.isRequired,
      alert: PropTypes.string,
    }).isRequired,
    isImportKeyModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ImportKeyModal
