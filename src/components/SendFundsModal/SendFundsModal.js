import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getFieldMessage from 'utils/getFieldMessage'

import { JModal, JPicker, JTextInput } from 'components/base'

class SendFundsModal extends Component {
  render() {
    const { closeSendFundsModal, funds } = this.props

    return (
      <JModal
        closeModal={closeSendFundsModal}
        name='send-funds'
        alert={funds.sendFormData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={funds.isSendFundsModalOpen}
      />
    )
  }

  renderHeader = () => {
    return (
      <div className='send-funds__header'>
        <div className='modal__title'>{'Send Funds'}</div>
      </div>
    )
  }

  renderBody = () => {
    return (
      <div className='send-funds__body'>
        {this.renderRecipientAddress()}
        {this.renderAccount()}
        {this.renderAmmountAndSymbol()}
        {this.renderGas()}
        {this.renderGasPriceAndSymbol()}
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
        editable={this.isEnabledField('address')}
      />
    )
  }

  renderAccount = () => {
    const { setSendFundsAccount, funds } = this.props

    return (
      <JPicker
        onValueChange={setSendFundsAccount}
        name='account'
        placeholder='Account'
        selectedValue={funds.sendFormData.account}
        errorMessage={this.getInvalidFieldMessage('address')}
        successMessage={this.getValidFieldMessage('address')}
        enabled={this.isEnabledField('address')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderAmmountAndSymbol = () => {
    const { setSendFundsAmount, setSendFundsSymbol, funds } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setSendFundsAmount}
          name='amount'
          placeholder='Amount'
          value={funds.sendFormData.amount}
          errorMessage={this.getInvalidFieldMessage('amount')}
          successMessage={this.getValidFieldMessage('amount')}
          editable={this.isEnabledField('amount')}
        />
        <JPicker
          onValueChange={setSendFundsSymbol}
          name='symbol'
          placeholder=''
          selectedValue={funds.sendFormData.symbol}
          errorMessage={this.getInvalidFieldMessage('symbol')}
          successMessage={this.getValidFieldMessage('symbol')}
          enabled={this.isEnabledField('symbol')}
        >
          <JPicker.Item label='ETH' value='ETH' />
        </JPicker>
      </div>
    )
  }

  renderGas = () => {
    const { setSendFundsGas, funds } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsGas}
        name='gas'
        placeholder='Gas'
        value={funds.sendFormData.gas}
        errorMessage={this.getInvalidFieldMessage('gas')}
        successMessage={this.getValidFieldMessage('gas')}
        editable={this.isEnabledField('gas')}
      />
    )
  }

  renderGasPriceAndSymbol = () => {
    const { setSendFundsGasPrice, setSendFundsGasSymbol, funds } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setSendFundsGasPrice}
          name='gas-price'
          placeholder='Gas price'
          value={funds.sendFormData.gasPrice}
          errorMessage={this.getInvalidFieldMessage('gasPrice')}
          successMessage={this.getValidFieldMessage('gasPrice')}
          editable={this.isEnabledField('gasPrice')}
        />
        <JPicker
          onValueChange={setSendFundsGasSymbol}
          name='gas-symbol'
          placeholder=''
          selectedValue={funds.sendFormData.gasSymbol}
          errorMessage={this.getInvalidFieldMessage('gasSymbol')}
          successMessage={this.getValidFieldMessage('gasSymbol')}
          enabled={this.isEnabledField('gasSymbol')}
        >
          <JPicker.Item label='ETH' value='ETH' />
        </JPicker>
      </div>
    )
  }

  renderFooter = () => {
    return 'Send Funds Footer'
  }

  isEnabledField = name => (this.props.funds.sendFormData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.funds.sendFormData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.funds.sendFormData.invalidFields, n)
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
