import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class ImportKeysModal extends Component {
  render() {
    const { closeImportKeysModal, importKeys, keys } = this.props

    return (
      <JModal
        closeModal={closeImportKeysModal}
        submitModal={handleEnterKeyPress(importKeys)}
        name='import-keys'
        alert={keys.importKeysData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={keys.isImportKeysModalOpen}
      />
    )
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Import Keys'}</div>
  }

  renderBody = () => {
    return (
      <div className='import-keys__body'>
        {this.renderData()}
        {this.renderPincode()}
      </div>
    )
  }

  renderData = () => {
    const { setImportKeysData, keys } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeysData}
        name='import-keys-data'
        placeholder='Address, private key, mnemonic'
        value={keys.importKeysData.data}
        errorMessage={this.getInvalidFieldMessage('data')}
        successMessage={this.getValidFieldMessage('data')}
        editable={this.isEnabledField('data')}
        multiline
        secureTextEntry
      />
    )
  }

  renderPincode = () => {
    const { setImportKeysPincode, keys } = this.props

    return (
      <JTextInput
        onValueChange={setImportKeysPincode}
        name='pincode'
        placeholder='Create your pincode'
        value={keys.importKeysData.pincode}
        errorMessage={this.getInvalidFieldMessage('pincode')}
        successMessage={this.getValidFieldMessage('pincode')}
        editable={this.isEnabledField('pincode')}
        secureTextEntry
      />
    )
  }

  renderFooter = () => {
    const { importKeys, keys } = this.props

    return (
      <JModalButton
        onPress={importKeys}
        name={'import-keys'}
        iconName={'import-keys'}
        title={'Import Keys'}
        disabled={keys.importKeysData.invalidFields.length > 0}
      />
    )
  }

  isEnabledField = name => (this.props.keys.importKeysData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.keys.importKeysData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.keys.importKeysData.invalidFields, n)
}

ImportKeysModal.propTypes = {
  closeImportKeysModal: PropTypes.func.isRequired,
  setImportKeysData: PropTypes.func.isRequired,
  setImportKeysPincode: PropTypes.func.isRequired,
  importKeys: PropTypes.func.isRequired,
  keys: PropTypes.shape({
    importKeysData: PropTypes.shape({
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
      data: PropTypes.string.isRequired,
      pincode: PropTypes.string.isRequired,
    }).isRequired,
    isImportKeysModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ImportKeysModal
