import React from 'react'
import PropTypes from 'prop-types'

import { Expandable, SubmitModal, SymbolPicker } from 'components'
import { JPicker, JTextInput } from 'components/base'

class SendFundsModal extends SubmitModal {
  renderModalBody = () => {
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
    const { setSendFundsAddress, invalidFields, address } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsAddress}
        name='recipient-address'
        placeholder='Recipient address'
        value={address}
        errorMessage={invalidFields['address']}
        editable
      />
    )
  }

  renderAccount = () => {
    const { accounts, currentAccount } = this.props

    return (
      <JPicker
        onValueChange={this.setSendFundsAccountId}
        name='account-id'
        placeholder='Account'
        selectedValue={currentAccount.accountName}
        enabled
      >
        {accounts.map((account) => {
          return <JPicker.Item key={account.id} label={account.accountName} value={account.id} />
        })}
      </JPicker>
    )
  }

  renderAmmountAndSymbol = () => {
    const { setSendFundsAmount, setSendFundsSymbol, invalidFields, amount, symbol } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setSendFundsAmount}
          name='amount'
          placeholder='Amount'
          value={amount}
          errorMessage={invalidFields['amount']}
          editable
        />
        <SymbolPicker
          onValueChange={setSendFundsSymbol}
          selectedValue={symbol}
          name='send-funds-symbol'
          enabled
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
    const { setSendFundsGas, invalidFields, gas } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsGas}
        name='gas'
        placeholder='Gas'
        value={gas}
        errorMessage={invalidFields['gas']}
        editable
      />
    )
  }

  renderGasPriceAndSymbol = () => {
    const {
      setSendFundsGasPrice,
      setSendFundsGasSymbol,
      invalidFields,
      gasSymbol,
      gasPrice,
    } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setSendFundsGasPrice}
          name='gas-price'
          placeholder='Gas price'
          value={gasPrice}
          errorMessage={invalidFields['gasPrice']}
          editable
        />
        <SymbolPicker
          onValueChange={setSendFundsGasSymbol}
          selectedValue={gasSymbol}
          name='gas-symbol'
          enabled
        />
      </div>
    )
  }

  /*renderFooter = () => {
    const { setSendFundsPassword, sendFunds, password } = this.props

    if (isTypingOfPincode) {
      return (
        <PincodeButton setPincode={setSendFundsPassword} onPress={sendFunds} pincode={pincode} />
      )
    }
  }
  */

  submitModal = (/* e */) => {
    return this.props.sendFunds()

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

  setSendFundsAccountId = id => this.props.setSendFundsAccountId(id, this.props.accounts)
  closeModal = () => this.props.closeSendFundsModal()
  isModalButtonDisabled = () => false
}

SendFundsModal.propTypes = {
  closeSendFundsModal: PropTypes.func.isRequired,
  setSendFundsAddress: PropTypes.func.isRequired,
  setSendFundsAmount: PropTypes.func.isRequired,
  setSendFundsSymbol: PropTypes.func.isRequired,
  setSendFundsAccountId: PropTypes.func.isRequired,
  setSendFundsGas: PropTypes.func.isRequired,
  setSendFundsGasPrice: PropTypes.func.isRequired,
  setSendFundsGasSymbol: PropTypes.func.isRequired,
  setSendFundsPassword: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
  })).isRequired,
  currentAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
  }).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  address: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  gas: PropTypes.string.isRequired,
  gasPrice: PropTypes.string.isRequired,
  gasSymbol: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

SendFundsModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default SendFundsModal
