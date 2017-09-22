import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { generateQRCode, getFieldMessage, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JPicker, JTextInput } from 'components/base'

import { CopyableField, SymbolPicker } from 'components'

class ReceiveFundsModal extends Component {
  render() {
    const { closeReceiveFundsModal, funds } = this.props

    return (
      <JModal
        closeModal={closeReceiveFundsModal}
        submitModal={handleEnterKeyPress(this.generateQRCodeToReceive)}
        name='receive-funds'
        alert={funds.receiveFormData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={funds.isReceiveFundsModalOpen}
      />
    )
  }

  renderHeader = () => {
    return (
      <div className='receive-funds__header'>
        <div className='modal__title'>{'Receive Funds'}</div>
      </div>
    )
  }

  renderBody = () => {
    return (
      <div className='receive-funds__body'>
        {this.renderAmmountAndSymbol()}
        {this.renderAccount()}
        {this.renderRecipientAddress()}
        {this.renderQRCode()}
      </div>
    )
  }

  renderAmmountAndSymbol = () => {
    const { setReceiveFundsAmount, setReceiveFundsSymbol, funds } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setReceiveFundsAmount}
          name='amount'
          placeholder='Amount'
          value={funds.receiveFormData.amount}
          errorMessage={this.getInvalidFieldMessage('amount')}
          successMessage={this.getValidFieldMessage('amount')}
          editable={this.isEnabledField('amount')}
        />
        <SymbolPicker
          onValueChange={setReceiveFundsSymbol}
          selectedValue={funds.receiveFormData.symbol}
          name='receive-funds-symbol'
          enabled={this.isEnabledField('symbol')}
        />
      </div>
    )
  }

  renderAccount = () => {
    const { setReceiveFundsAccount, funds } = this.props

    return (
      <JPicker
        onValueChange={setReceiveFundsAccount}
        name='account'
        placeholder='Account'
        selectedValue={funds.receiveFormData.account}
        errorMessage={this.getInvalidFieldMessage('address')}
        successMessage={this.getValidFieldMessage('address')}
        enabled={this.isEnabledField('address')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderRecipientAddress = () => {
    return (
      <CopyableField
        placeholder='Recipient address'
        value={this.props.funds.receiveFormData.address}
      />
    )
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
        disabled={this.props.funds.receiveFormData.invalidFields.length > 0}
      />
    )
  }

  generateQRCodeToReceive = () => {
    const { amount } = this.props.funds.receiveFormData
    const value = parseInt(amount, 10) || 0

    // Just for test
    const requisites = {
      value,
      to: '0x01360d2b7d240ec0643b6d819ba81a09e40e5bcd',
    }

    return generateQRCode({ requisites })
  }

  isEnabledField = name => (this.props.funds.receiveFormData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.funds.receiveFormData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.funds.receiveFormData.invalidFields, n)
}

ReceiveFundsModal.propTypes = {
  closeReceiveFundsModal: PropTypes.func.isRequired,
  setReceiveFundsAmount: PropTypes.func.isRequired,
  setReceiveFundsSymbol: PropTypes.func.isRequired,
  setReceiveFundsAccount: PropTypes.func.isRequired,
  setReceiveFundsAddress: PropTypes.func.isRequired,
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
