import React from 'react'
import PropTypes from 'prop-types'

import handleEnterKeyPress from 'utils/handleEnterKeyPress'

import { JModal, JModalButton, JTextInput } from 'components/base'

class CustomTokenModal extends JModal {
  renderHeader = () => {
    return <div className='modal__title'>{'Add Custom Token'}</div>
  }

  renderBody = () => {
    const {
      setCustomTokenAddress,
      setCustomTokenName,
      setCustomTokenSymbol,
      setCustomTokenDecimals,
    } = this.props

    const customTokenFieldsMap = {
      address: setCustomTokenAddress,
      name: setCustomTokenName,
      symbol: setCustomTokenSymbol,
      decimals: setCustomTokenDecimals,
    }

    return (
      <div>
        {Object.keys(customTokenFieldsMap).map((field) => {
          const handler = customTokenFieldsMap[field]
          const placeholder = `${field.charAt(0).toUpperCase()}${field.slice(1)}`

          return (
            <JTextInput
              key={field}
              onValueChange={handler}
              name={`custom-token-${field}`}
              placeholder={placeholder}
              value={this.props[field]}
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
    const { addCustomToken } = this.props

    return (
      <JModalButton
        onPress={addCustomToken}
        name={'custom-token'}
        title={'Save'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  closeModal = () => this.props.closeCustomTokenModal()
  submitModal = event => handleEnterKeyPress(this.props.addCustomToken)(event)
  isModalButtonDisabled = () => (this.props.invalidFields.length > 0)
}

CustomTokenModal.propTypes = {
  closeCustomTokenModal: PropTypes.func.isRequired,
  setCustomTokenAddress: PropTypes.func.isRequired,
  setCustomTokenName: PropTypes.func.isRequired,
  setCustomTokenSymbol: PropTypes.func.isRequired,
  setCustomTokenDecimals: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

CustomTokenModal.defaultProps = {
  onClose: null,
}

export default CustomTokenModal
