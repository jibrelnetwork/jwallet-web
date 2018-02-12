import React from 'react'
import PropTypes from 'prop-types'

import JTextInput from 'components/base/JTextInput'
import { Expandable, SubmitModal, SymbolPicker } from 'components'

class SendFundsModal extends SubmitModal {
  renderModalBody = () => {
    return (
      <div>
        {this.renderSender()}
        {this.renderAmmountAndSymbol()}
        {this.renderRecipient()}
        {this.renderCustomOptions()}
      </div>
    )
  }

  renderSender = () => {
    const { sender, accountName } = this.props
    const name = (accountName.length > 20) ? `${accountName.substr(0, 20)}...` : accountName
    const addr = `${sender.substr(0, 6)}...${sender.substr(-2)}`

    return (
      <JTextInput
        name='send-funds-sender'
        placeholder={i18n('modals.sendFunds.placeholder.sender')}
        value={`${name}   ${addr}`}
      />
    )
  }

  renderRecipient = () => {
    const { setSendFundsRecipient, invalidFields, recipient } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsRecipient}
        name='send-funds-recipient'
        placeholder={i18n('modals.sendFunds.placeholder.recipient')}
        value={recipient}
        errorMessage={invalidFields.recipient}
        editable
      />
    )
  }

  renderAmmountAndSymbol = () => {
    return (
      <div className='field-group'>
        {this.renderAmount()}
        {this.renderSymbol()}
      </div>
    )
  }

  renderAmount = () => {
    const { setSendFundsAmount, invalidFields, amount } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsAmount}
        name='amount'
        placeholder={i18n('modals.sendFunds.placeholder.amount')}
        value={amount}
        errorMessage={invalidFields.amount}
        editable
      />
    )
  }

  renderSymbol = () => {
    const { setSendFundsSymbol, currencies, symbol } = this.props
    const symbols = currencies.map(c => c.symbol).filter(s => (s && s.length))

    return (
      <SymbolPicker
        onValueChange={setSendFundsSymbol}
        items={symbols}
        selectedValue={symbol}
        name='send-funds-symbol'
        enabled
      />
    )
  }

  renderCustomOptions = () => {
    return (
      <Expandable title={i18n('modals.sendFunds.customGasTitle')} >
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
        placeholder={i18n('modals.sendFunds.placeholder.gas')}
        value={gas}
        errorMessage={invalidFields.gas}
        editable
      />
    )
  }

  renderGasPriceAndSymbol = () => {
    const { setSendFundsGasPrice, invalidFields, gasPrice } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsGasPrice}
        name='gas-price'
        placeholder={i18n('modals.sendFunds.placeholder.gasPrice')}
        value={gasPrice}
        errorMessage={invalidFields.gasPrice}
        editable
      />
    )
  }

  isModalButtonDisabled = () => {
    const { recipient, amount, isETHBalanceEmpty } = this.props

    return (isETHBalanceEmpty || !(recipient && amount))
  }

  closeModal = () => this.props.closeSendFundsModal()
  submitModal = () => (this.props.password.length ? this.props.sendFunds() : null)
  setPassword = password => this.props.setSendFundsPassword(password)
}

SendFundsModal.propTypes = {
  closeSendFundsModal: PropTypes.func.isRequired,
  setSendFundsRecipient: PropTypes.func.isRequired,
  setSendFundsAmount: PropTypes.func.isRequired,
  setSendFundsSymbol: PropTypes.func.isRequired,
  setSendFundsGas: PropTypes.func.isRequired,
  setSendFundsGasPrice: PropTypes.func.isRequired,
  setSendFundsPassword: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired,
  })).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  accountName: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  gas: PropTypes.string.isRequired,
  gasPrice: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  buttonType: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  isETHBalanceEmpty: PropTypes.bool.isRequired,
}

export default SendFundsModal
