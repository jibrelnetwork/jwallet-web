import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JModal from 'components/base/JModal'
import JTextInput from 'components/base/JTextInput'

class SendFundsModal extends Component {
  render() {
    const { closeSendFundsModal, funds } = this.props

    return (
      <JModal
        closeModal={closeSendFundsModal}
        name='send-funds'
        header={'Send Funds'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={funds.isSendFundsModalOpen}
      />
    )
  }

  renderBody = () => {
    return (
      <div className='send-funds__body'>
        {this.renderRecipientAddress()}
      </div>
    )
  }

  renderRecipientAddress = () => {
    const { setSendFundsAddress, funds } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsAddress}
        name='recipient-address'
        placeholder='Recipient address'
        value={funds.sendFormData.address}
        errorMessage={this.getInvalidFieldMessage('address')}
        successMessage={this.getValidFieldMessage('address')}
        editable={this.isEditableField('address')}
      />
    )
  }

  renderFooter = () => {
    return 'Send Funds Footer'
  }

  getValidFieldMessage = (name) => {
    return this.getFieldMessage(this.props.funds.sendFormData.validFields, name)
  }

  getInvalidFieldMessage = (name) => {
    return this.getFieldMessage(this.props.funds.sendFormData.invalidFields, name)
  }

  getFieldMessage = (fields, name) => {
    for (let i = 0; i < fields.length; i += 1) {
      const field = fields[i]

      if (field.name === name) {
        return field.message
      }
    }

    return ''
  }

  isEditableField = name => (this.props.funds.sendFormData.disabledFields.indexOf(name) === -1)
}

SendFundsModal.propTypes = {
  closeSendFundsModal: PropTypes.func.isRequired,
  setSendFundsAddress: PropTypes.func.isRequired,
  setSendFundsAmount: PropTypes.func.isRequired,
  setSendFundsSymbol: PropTypes.func.isRequired,
  setSendFundsAccount: PropTypes.func.isRequired,
  setSendFundsGas: PropTypes.func.isRequired,
  setSendFundsGasPrice: PropTypes.func.isRequired,
  setSendFundsGasSymbol: PropTypes.func.isRequired,
  setSendFundsPincode: PropTypes.func.isRequired,
  typeSendFundsPincode: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  funds: PropTypes.shape({
    sendFormData: PropTypes.shape({
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
      amount: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      account: PropTypes.string.isRequired,
      gas: PropTypes.string.isRequired,
      gasPrice: PropTypes.string.isRequired,
      gasSymbol: PropTypes.string.isRequired,
    }).isRequired,
    isSendFundsModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default SendFundsModal
