import React from 'react'
import PropTypes from 'prop-types'

import { generateQRCode, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JPicker, JTextInput } from 'components/base'

import { CopyableField, SymbolPicker } from 'components'

class ReceiveFundsModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'receive-funds' }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Receive Funds'}</div>
  }

  renderBody = () => {
    return (
      <div>
        {this.renderAmmountAndSymbol()}
        {this.renderAccount()}
        {this.renderRecipientAddress()}
        {this.renderQRCode()}
      </div>
    )
  }

  renderAmmountAndSymbol = () => {
    const { setReceiveFundsAmount, setReceiveFundsSymbol, symbol } = this.props
    const fieldName = 'amount'

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setReceiveFundsAmount}
          name={fieldName}
          placeholder='Amount'
          value={this.props[fieldName]}
          errorMessage={this.getInvalidFieldMessage(fieldName)}
          successMessage={this.getValidFieldMessage(fieldName)}
          editable={this.isEnabledField(fieldName)}
        />
        <SymbolPicker
          onValueChange={setReceiveFundsSymbol}
          selectedValue={symbol}
          name='receive-funds-symbol'
          enabled={this.isEnabledField('symbol')}
        />
      </div>
    )
  }

  renderAccount = () => {
    const fieldName = 'accountId'

    return (
      <JPicker
        onValueChange={this.props.setReceiveFundsAccount}
        name={fieldName}
        placeholder='Account'
        selectedValue={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        enabled={this.isEnabledField(fieldName)}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderRecipientAddress = () => {
    return <CopyableField placeholder='Recipient address' value={this.props.address} />
  }

  renderQRCode = () => {
    return <div id='qr-code' style={{ textAlign: 'center' }} />
  }

  renderFooter = () => {
    return (
      <JModalButton
        onPress={this.generateQRCodeToReceive}
        name={'receive-funds'}
        title={'Generate QR Code'}
        iconName={'qr-code'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  generateQRCodeToReceive = () => {
    const value = parseInt(this.props.amount, 10) || 0

    // Just for test
    const requisites = {
      value,
      to: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    }

    return generateQRCode({ requisites })
  }

  closeModal = () => this.props.closeReceiveFundsModal()
  submitModal = () => handleEnterKeyPress(this.generateQRCodeToReceive)
  isModalButtonDisabled = () => (this.props.invalidFields.length > 0)
}

ReceiveFundsModal.propTypes = {
  closeReceiveFundsModal: PropTypes.func.isRequired,
  setReceiveFundsAmount: PropTypes.func.isRequired,
  setReceiveFundsSymbol: PropTypes.func.isRequired,
  setReceiveFundsAccount: PropTypes.func.isRequired,
  setReceiveFundsAddress: PropTypes.func.isRequired,
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
  accountId: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

ReceiveFundsModal.defaultProps = {
  onClose: null,
}

export default ReceiveFundsModal
