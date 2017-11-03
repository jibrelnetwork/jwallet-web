import React from 'react'
import PropTypes from 'prop-types'
import Keystore from 'jwallet-web-keystore'

import SubmitModal from 'components/SubmitModal'
import JTextInput from 'components/base/JTextInput'

class CustomTokenModal extends SubmitModal {
  renderModalBody = () => {
    const {
      setCustomTokenAddress,
      setCustomTokenName,
      setCustomTokenSymbol,
      setCustomTokenDecimals,
      invalidFields,
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
              errorMessage={invalidFields[field]}
              editable
            />
          )
        })}
      </div>
    )
  }

  addCustomToken = () => {
    const { addCustomToken, address, name, symbol, decimals } = this.props

    if (!this.isTokenDataValid()) {
      return
    }

    addCustomToken({ address, name, symbol, decimals })
  }

  isTokenDataValid = () => {
    const { setCustomTokenInvalidField, address, name, symbol, decimals } = this.props
    const decimalsInt = parseInt(decimals, 10) || 0
    const alphaRe = /[^a-zA-Z]/
    let isValid = true

    if (!Keystore.isHexStringValid(address, 40)) {
      setCustomTokenInvalidField('address', 'Address should be valid contract address')
      isValid = false
    }

    if (alphaRe.test(name) || (name.length < 3) || (name.length > 100)) {
      setCustomTokenInvalidField('name', 'Name should be valid contract name')
      isValid = false
    }

    if (alphaRe.test(symbol) || (symbol.length < 3) || (symbol.length > 4)) {
      setCustomTokenInvalidField('symbol', 'Symbol should be valid contract symbol')
      isValid = false
    }

    if ((decimalsInt <= 0) || (decimalsInt > 18)) {
      setCustomTokenInvalidField('decimals', 'Decimals should be valid contract decimals')
      isValid = false
    }

    return isValid
  }

  isModalButtonDisabled = () => {
    const { address, name, symbol, decimals } = this.props

    return !(address.length && name.length && symbol.length && decimals.length)
  }

  submitModal = () => this.addCustomToken()
  closeModal = () => this.props.closeCustomTokenModal()
}

CustomTokenModal.propTypes = {
  closeCustomTokenModal: PropTypes.func.isRequired,
  setCustomTokenAddress: PropTypes.func.isRequired,
  setCustomTokenName: PropTypes.func.isRequired,
  setCustomTokenSymbol: PropTypes.func.isRequired,
  setCustomTokenDecimals: PropTypes.func.isRequired,
  setCustomTokenInvalidField: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

CustomTokenModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default CustomTokenModal
