import React from 'react'
import PropTypes from 'prop-types'

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
        {Object.keys(customTokenFieldsMap).map(field => (
          <JTextInput
            key={field}
            onValueChange={customTokenFieldsMap[field]}
            name={`custom-token-${field}`}
            placeholder={i18n(`routes.addCustomAsset.placeholder.${field}`)}
            value={this.props[field]}
            errorMessage={invalidFields[field]}
            editable
          />
        ))}
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
