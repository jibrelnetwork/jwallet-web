import React from 'react'
import PropTypes from 'prop-types'

import { Expandable, SymbolPicker } from 'components'
import { JModal, JModalButton, JPicker, JTextInput } from 'components/base'

class SendFundsModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'send-funds' }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Send Funds'}</div>
  }

  renderBody = () => {
    return (
      <div>
        {this.renderRecipientAddress()}
        {this.renderAccount()}
        {this.renderAmmountAndSymbol()}
        {this.renderCustomOptions()}
      </div>
    )
  }

  renderRecipientAddress = () => {
    const fieldName = 'address'

    return (
      <JTextInput
        onValueChange={this.props.setSendFundsAddress}
        name='recipient-address'
        placeholder='Recipient address'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        editable={this.isEnabledField(fieldName)}
      />
    )
  }

  renderAccount = () => {
    const fieldName = 'accountId'

    return (
      <JPicker
        onValueChange={this.props.setSendFundsAccount}
        name='account'
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

  renderAmmountAndSymbol = () => {
    const { setSendFundsAmount, setSendFundsSymbol, symbol } = this.props
    const fieldName = 'amount'

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setSendFundsAmount}
          name={fieldName}
          placeholder='Amount'
          value={this.props[fieldName]}
          errorMessage={this.getInvalidFieldMessage(fieldName)}
          successMessage={this.getValidFieldMessage(fieldName)}
          editable={this.isEnabledField(fieldName)}
        />
        <SymbolPicker
          onValueChange={setSendFundsSymbol}
          selectedValue={symbol}
          name='send-funds-symbol'
          enabled={this.isEnabledField('symbol')}
        />
      </div>
    )
  }

  renderCustomOptions = () => {
    return (
      <Expandable>
        {this.renderGas()}
        {this.renderGasPriceAndSymbol()}
      </Expandable>
    )
  }

  renderGas = () => {
    const fieldName = 'gas'

    return (
      <JTextInput
        onValueChange={this.props.setSendFundsGas}
        name={fieldName}
        placeholder='Gas'
        value={this.props[fieldName]}
        errorMessage={this.getInvalidFieldMessage(fieldName)}
        successMessage={this.getValidFieldMessage(fieldName)}
        editable={this.isEnabledField(fieldName)}
      />
    )
  }

  renderGasPriceAndSymbol = () => {
    const { setSendFundsGasPrice, setSendFundsGasSymbol, gasSymbol } = this.props
    const fieldName = 'gasPrice'

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setSendFundsGasPrice}
          name='gas-price'
          placeholder='Gas price'
          value={this.props[fieldName]}
          errorMessage={this.getInvalidFieldMessage(fieldName)}
          successMessage={this.getValidFieldMessage(fieldName)}
          editable={this.isEnabledField(fieldName)}
        />
        <SymbolPicker
          onValueChange={setSendFundsGasSymbol}
          selectedValue={gasSymbol}
          name='gas-symbol'
          enabled={this.isEnabledField('gasSymbol')}
        />
      </div>
    )
  }

  renderFooter = () => {
    // const { setSendFundsPassword, sendFunds, password } = this.props

    /*
    if (isTypingOfPincode) {
      return (
        <PincodeButton setPincode={setSendFundsPassword} onPress={sendFunds} pincode={pincode} />
      )
    }
    */

    return (
      <JModalButton
        onPress={this.props.sendFunds}
        name={'send-funds'}
        title={'Send Funds'}
        iconName={'send-funds'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  closeModal = () => this.props.closeSendFundsModal()

  submitModal = (/* e */) => {
    return null

    /*
    if (e.key !== 'Enter') {
      return
    }

    const { typeSendFundsPincode, sendFunds, funds } = this.props

    if (funds.sendFormData.isTypingOfPincode) {
      sendFunds()

      return
    }

    typeSendFundsPincode(true)
    */
  }

  isModalButtonDisabled = () => (this.props.invalidFields.length > 0)
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
  setSendFundsPassword: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
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
  accountId: PropTypes.string.isRequired,
  gas: PropTypes.string.isRequired,
  gasPrice: PropTypes.string.isRequired,
  gasSymbol: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

SendFundsModal.defaultProps = {
  onClose: null,
}

export default SendFundsModal
