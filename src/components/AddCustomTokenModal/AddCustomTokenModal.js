import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class AddCustomTokenModal extends Component {
  render() {
    const { addCustomToken, accounts } = this.props
    const { alert } = accounts.customTokenData

    return (
      <JModal
        closeModal={this.closeAddCustomTokenModal}
        submitModal={handleEnterKeyPress(addCustomToken)}
        name='add-custom-token'
        alert={alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={accounts.isAddCustomTokenModalOpen}
      />
    )
  }

  renderHeader = () => {
    return (
      <div className='add-custom-token__header'>
        <div className='modal__title'>{'Add Custom Token'}</div>
      </div>
    )
  }

  renderBody = () => {
    const {
      setCustomTokenAddress,
      setCustomTokenName,
      setCustomTokenSymbol,
      setCustomTokenDecimals,
      accounts,
    } = this.props

    const customTokenFieldsMap = {
      address: setCustomTokenAddress,
      name: setCustomTokenName,
      symbol: setCustomTokenSymbol,
      decimals: setCustomTokenDecimals,
    }

    return (
      <div className='add-custom-token__body'>
        {Object.keys(customTokenFieldsMap).map((field) => {
          const handler = customTokenFieldsMap[field]
          const placeholder = `${field.charAt(0).toUpperCase()}${field.slice(1)}`

          return (
            <JTextInput
              key={field}
              onValueChange={handler}
              name={`custom-token-${field}`}
              placeholder={placeholder}
              value={accounts.customTokenData[field]}
              errorMessage={this.getInvalidFieldMessage(field)}
              successMessage={this.getValidFieldMessage(field)}
              editable={this.isEnabledField(field)}
            />
          )
        })}
      </div>
    )
  }

  renderFooter = () => {
    const { addCustomToken, accounts } = this.props

    return (
      <JModalButton
        onPress={addCustomToken}
        name={'add-custom-token'}
        title={'Save'}
        disabled={(accounts.customTokenData.invalidFields.length > 0)}
      />
    )
  }

  isEnabledField = name => (this.props.accounts.customTokenData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = n => getFieldMessage(this.props.accounts.customTokenData.validFields, n)

  getInvalidFieldMessage = (name) => {
    return getFieldMessage(this.props.accounts.customTokenData.invalidFields, name)
  }

  closeAddCustomTokenModal = (/* event */) => {
    this.props.openAccountManager()
    this.props.closeAddCustomTokenModal()
  }
}

AddCustomTokenModal.propTypes = {
  closeAddCustomTokenModal: PropTypes.func.isRequired,
  setCustomTokenAddress: PropTypes.func.isRequired,
  setCustomTokenName: PropTypes.func.isRequired,
  setCustomTokenSymbol: PropTypes.func.isRequired,
  setCustomTokenDecimals: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  openAccountManager: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    customTokenData: PropTypes.shape({
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
      name: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      decimals: PropTypes.string.isRequired,
    }).isRequired,
    isAddCustomTokenModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AddCustomTokenModal
