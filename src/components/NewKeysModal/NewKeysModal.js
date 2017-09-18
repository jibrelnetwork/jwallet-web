import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class NewKeysModal extends Component {
  render() {
    const { closeNewKeysModal, saveNewKeysAsTXT, keys } = this.props

    return (
      <JModal
        closeModal={closeNewKeysModal}
        submitModal={handleEnterKeyPress(saveNewKeysAsTXT)}
        name='new-keys'
        alert={keys.newKeysData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keys.isNewKeysModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'New Keys'}</div>
  }

  renderBody = () => {
    const { setNewKeysMnemonic, keys } = this.props

    return (
      <JTextInput
        onValueChange={setNewKeysMnemonic}
        name='new-keys-mnemonic'
        placeholder='Mnemonic'
        value={keys.newKeysData.mnemonic}
        errorMessage={this.getInvalidFieldMessage('mnemonic')}
        successMessage={this.getValidFieldMessage('mnemonic')}
        editable={this.isEnabledField('mnemonic')}
        multiline
      />
    )
  }

  renderFooter = () => {
    const { saveNewKeysAsTXT, keys } = this.props

    return (
      <JModalButton
        onPress={saveNewKeysAsTXT}
        name={'new-keys'}
        iconName={'txt'}
        title={'Save as TXT'}
        disabled={keys.newKeysData.invalidFields.length > 0}
      />
    )
  }

  isEnabledField = name => (this.props.keys.newKeysData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.keys.newKeysData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keys.newKeysData.invalidFields, n)
}

NewKeysModal.propTypes = {
  closeNewKeysModal: PropTypes.func.isRequired,
  setNewKeysMnemonic: PropTypes.func.isRequired,
  saveNewKeysAsTXT: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    newKeysData: PropTypes.shape({
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
      mnemonic: PropTypes.string.isRequired,
    }).isRequired,
    isNewKeysModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default NewKeysModal
