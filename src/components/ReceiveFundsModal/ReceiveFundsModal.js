import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

class ReceiveFundsModal extends Component {
  render() {
    const { closeReceiveFundsModal, funds } = this.props

    return (
      <JbModal
        closeModal={closeReceiveFundsModal}
        name='receive-funds'
        header={'Receive Funds'}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={funds.isReceiveFundsModalOpen}
      />
    )
  }

  renderBody = () => {
    return 'Receive Funds Body'
  }

  renderFooter = () => {
    return 'Receive Funds Footer'
  }
}

ReceiveFundsModal.propTypes = {
  closeReceiveFundsModal: PropTypes.func.isRequired,
  setReceiveFundsAmount: PropTypes.func.isRequired,
  setReceiveFundsSymbol: PropTypes.func.isRequired,
  setReceiveFundsAccount: PropTypes.func.isRequired,
  setReceiveFundsAddress: PropTypes.func.isRequired,
  generateQRCode: PropTypes.func.isRequired,
  receiveFunds: PropTypes.func.isRequired,
  funds: PropTypes.shape({
    receiveFormData: PropTypes.shape({
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
      amount: PropTypes.string.isRequired,
      symbol: PropTypes.string.isRequired,
      account: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
    }).isRequired,
    isReceiveFundsModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ReceiveFundsModal
