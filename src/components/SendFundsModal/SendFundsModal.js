import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

class SendFundsModal extends Component {
  render() {
    const { closeSendFundsModal, funds } = this.props

    return (
      <JbModal
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
    return 'Send Funds Body'
  }

  renderFooter = () => {
    return 'Send Funds Footer'
  }
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
