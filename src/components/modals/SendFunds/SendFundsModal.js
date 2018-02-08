import React from 'react'
import PropTypes from 'prop-types'

import { Expandable, SubmitModal, SymbolPicker } from 'components'
import { JPicker, JTextInput } from 'components/base'

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

    return (
      <JTextInput
        name='send-funds-sender'
        placeholder={i18n('modals.sendFunds.placeholder.sender')}
        value={`${accountName}   ${sender.substr(0, 6)}...${sender.substr(-2)}`}
      />
    )
  }

  renderRecipient = () => {
    const { setSendFundsAddress, invalidFields, address } = this.props

    return (
      <JTextInput
        onValueChange={setSendFundsAddress}
        name='send-funds-recipient'
        placeholder={i18n('modals.sendFunds.placeholder.recipient')}
        value={address}
        errorMessage={invalidFields.address}
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
    const { address, amount } = this.props

    return !(address.length && amount.length)
  }

  closeModal = () => this.props.closeSendFundsModal()
  submitModal = () => (this.props.password.length ? this.props.sendFunds() : null)
  setPassword = password => this.props.setSendFundsPassword(password)
  setSendFundsAccountId = id => this.props.setSendFundsAccountId(id, this.props.accounts)
}

SendFundsModal.propTypes = {
  closeSendFundsModal: PropTypes.func.isRequired,
  setSendFundsAddress: PropTypes.func.isRequired,
  setSendFundsAmount: PropTypes.func.isRequired,
  setSendFundsSymbol: PropTypes.func.isRequired,
  setSendFundsAccountId: PropTypes.func.isRequired,
  setSendFundsGas: PropTypes.func.isRequired,
  setSendFundsGasPrice: PropTypes.func.isRequired,
  setSendFundsPassword: PropTypes.func.isRequired,
  sendFunds: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.shape({
    symbol: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    decimals: PropTypes.number.isRequired,
  })).isRequired,
  currentAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    /* optional */
    addressIndex: PropTypes.number,
  }).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  accountName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
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
  /* optional */
  onClose: PropTypes.func,
}

SendFundsModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default SendFundsModal
