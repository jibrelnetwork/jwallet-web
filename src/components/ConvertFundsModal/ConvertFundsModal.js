import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JModal from 'components/base/JModal'

class ConvertFundsModal extends Component {
  render() {
    const { closeConvertFundsModal, funds } = this.props

    return (
      <JModal
        closeModal={closeConvertFundsModal}
        name='send-funds'
        header={'Convert Funds'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={funds.isConvertFundsModalOpen}
      />
    )
  }

  renderBody = () => {
    return 'Convert Funds Body'
  }

  renderFooter = () => {
    return 'Convert Funds Footer'
  }
}

ConvertFundsModal.propTypes = {
  closeConvertFundsModal: PropTypes.func.isRequired,
  setConvertFundsFromAmount: PropTypes.func.isRequired,
  setConvertFundsFromSymbol: PropTypes.func.isRequired,
  setConvertFundsFromAddress: PropTypes.func.isRequired,
  setConvertFundsToAmount: PropTypes.func.isRequired,
  setConvertFundsToSymbol: PropTypes.func.isRequired,
  setConvertFundsToAddress: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  funds: PropTypes.shape({
    convertFormData: PropTypes.shape({
      from: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
      to: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
      }).isRequired,
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
    }).isRequired,
    isConvertFundsModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ConvertFundsModal
