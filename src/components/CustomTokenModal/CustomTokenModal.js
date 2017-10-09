import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JTextInput } from 'components/base'

class CustomTokenModal extends Component {
  render() {
    const { addCustomToken, currencies } = this.props
    const { alert } = currencies.customTokenData

    return (
      <JModal
        closeModal={this.closeCustomTokenModal}
        submitModal={handleEnterKeyPress(addCustomToken)}
        name='add-custom-token'
        alert={alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={currencies.isCustomTokenModalOpen}
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
      currencies,
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
              value={currencies.customTokenData[field]}
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
    const { addCustomToken, currencies } = this.props

    return (
      <JModalButton
        onPress={addCustomToken}
        name={'add-custom-token'}
        title={'Save'}
        disabled={(currencies.customTokenData.invalidFields.length > 0)}
      />
    )
  }

  isEnabledField = name => (this.props.currencies.customTokenData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = n => getFieldMessage(this.props.currencies.customTokenData.validFields, n)

  getInvalidFieldMessage = (name) => {
    return getFieldMessage(this.props.currencies.customTokenData.invalidFields, name)
  }

  closeCustomTokenModal = (/* event */) => {
    const { openCurrenciesModal, closeCustomTokenModal } = this.props

    openCurrenciesModal()
    closeCustomTokenModal()
  }
}

CustomTokenModal.propTypes = {
  closeCustomTokenModal: PropTypes.func.isRequired,
  setCustomTokenAddress: PropTypes.func.isRequired,
  setCustomTokenName: PropTypes.func.isRequired,
  setCustomTokenSymbol: PropTypes.func.isRequired,
  setCustomTokenDecimals: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  openCurrenciesModal: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
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
    isCustomTokenModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default CustomTokenModal
