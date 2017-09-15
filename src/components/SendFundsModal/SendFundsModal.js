import React, { Component } from 'react'
import PropTypes from 'prop-types'

import getFieldMessage from 'utils/getFieldMessage'

import { JModal, JModalButton, JPicker, JTextInput } from 'components/base'

import PincodeButton from 'components/PincodeButton'

class SendFundsModal extends Component {
  render() {
    const { closeSendFundsModal, funds } = this.props
    const { alert, isPincodeIncorrect } = funds.sendFormData

    return (
      <JModal
        closeModal={closeSendFundsModal}
        submitModal={this.submitFormOnEnter}
        name={`send-funds ${isPincodeIncorrect ? 'modal--shake' : ''}`}
        alert={alert}
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
          selectedValue={funds.sendFormData.symbol}
          name='symbol'
          placeholder=''
          errorMessage=''
          successMessage=''
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
          selectedValue={funds.sendFormData.gasSymbol}
          name='gas-symbol'
          placeholder=''
          errorMessage=''
          successMessage=''
          enabled={this.isEnabledField('gasSymbol')}
        >
          <JPicker.Item label='ETH' value='ETH' />
        </JPicker>
      </div>
    )
  }

  renderFooter = () => {
    const { setSendFundsPincode, typeSendFundsPincode, sendFunds, funds } = this.props
    const { pincode, isTypingOfPincode } = funds.sendFormData

    if (isTypingOfPincode) {
      return (
        <PincodeButton setPincode={setSendFundsPincode} onPress={sendFunds} pincode={pincode} />
      )
    }

    return (
      <JModalButton
        onPress={typeSendFundsPincode}
        name={'send-funds'}
        title={'Send Funds'}
        iconName={'send-funds'}
        disabled={(funds.sendFormData.invalidFields.length > 0)}
      />
    )
  }

  isEnabledField = name => (this.props.funds.sendFormData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.funds.sendFormData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.funds.sendFormData.invalidFields, n)

  submitFormOnEnter = (e) => {
    if (e.key !== 'Enter') {
      return
    }

    const { typeSendFundsPincode, sendFunds, funds } = this.props

    if (funds.sendFormData.isTypingOfPincode) {
      sendFunds()

      return
    }

    typeSendFundsPincode(true)
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
      pincode: PropTypes.string.isRequired,
      isPincodeIncorrect: PropTypes.bool.isRequired,
      isTypingOfPincode: PropTypes.bool.isRequired,
    }).isRequired,
    isSendFundsModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default SendFundsModal
