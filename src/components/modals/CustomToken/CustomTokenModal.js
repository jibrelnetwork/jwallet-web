import React from 'react'
import PropTypes from 'prop-types'

import i18n from 'i18n/en'

import SubmitModal from 'components/SubmitModal'
import JTextInput from 'components/base/JTextInput'

const { placeholder } = i18n.modals.addCustomToken

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
          const i18nPlaceholder = placeholder[field]

          return (
            <JTextInput
              key={field}
              onValueChange={handler}
              name={`custom-token-${field}`}
              placeholder={i18nPlaceholder}
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

    addCustomToken({ address, name, symbol, decimals })
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
  addCustomToken: PropTypes.func.isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  address: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  decimals: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

CustomTokenModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default CustomTokenModal
