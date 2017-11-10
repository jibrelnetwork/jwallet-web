import React from 'react'
import PropTypes from 'prop-types'
import isEmpty from 'lodash/isEmpty'

import { generateQRCode } from 'utils'

import { CopyableField, SubmitModal } from 'components'
import JTextInput from 'components/base/JTextInput'

class ReceiveFundsModal extends SubmitModal {
  renderModalBody = () => {
    return (
      <div>
        {this.renderAmmount()}
        {this.renderRecipientAddress()}
        {this.renderQRCode()}
      </div>
    )
  }

  renderAmmount = () => {
    const { setReceiveFundsAmount, amount } = this.props

    return (
      <JTextInput
        onValueChange={setReceiveFundsAmount}
        name={'amount'}
        placeholder='Amount (ETH)'
        value={amount}
        editable
      />
    )
  }

  renderRecipientAddress = () => {
    return <CopyableField placeholder='Recipient address' value={this.props.currentAddress} />
  }

  renderQRCode = () => {
    return <div id='qr-code' style={{ textAlign: 'center' }} />
  }

  generateQRCodeToReceive = () => {
    const { currentAddress, amount } = this.props

    return generateQRCode({
      requisites: {
        to: currentAddress,
        value: parseFloat(amount, 10),
      },
    })
  }

  isModalButtonDisabled = () => {
    const { amount, currentAddress } = this.props

    const isAmountInvalid = /[^\d.]/.test(amount)
    const isAmountLte0 = (!isAmountInvalid && (parseFloat(amount, 10) || 0) <= 0)
    const isAddressInvalid = isEmpty(currentAddress)

    return (isAmountLte0 || isAddressInvalid)
  }

  closeModal = () => this.props.closeReceiveFundsModal()
  submitModal = () => this.generateQRCodeToReceive()
}

ReceiveFundsModal.propTypes = {
  closeReceiveFundsModal: PropTypes.func.isRequired,
  setReceiveFundsAmount: PropTypes.func.isRequired,
  amount: PropTypes.string.isRequired,
  currentAddress: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

ReceiveFundsModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default ReceiveFundsModal
