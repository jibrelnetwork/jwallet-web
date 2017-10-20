import React from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import SymbolPicker from 'components/SymbolPicker'
import { JIcon, JModal, JModalButton, JPicker, JTextInput } from 'components/base'

class ConvertFundsModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'convert-funds' }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Convert Funds'}</div>
  }

  renderBody = () => {
    return (
      <div>
        {this.renderFromText()}
        {this.renderFromAmmountAndSymbol()}
        {this.renderFromAccount()}
        {this.renderToText()}
        {this.renderToAmmountAndSymbol()}
        {this.renderToAccount()}
      </div>
    )
  }

  renderFromText = () => {
    return <div className='modal__text'>{'From'}</div>
  }

  renderFromAmmountAndSymbol = () => {
    const { setConvertFundsFromAmount, setConvertFundsFromSymbol, from } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setConvertFundsFromAmount}
          name='convert-funds-from-amount'
          placeholder='Amount'
          value={from.amount}
          errorMessage={this.getInvalidFieldMessage('from.amount')}
          successMessage={this.getValidFieldMessage('from.amount')}
          editable={this.isEnabledField('from.amount')}
        />
        <SymbolPicker
          onValueChange={setConvertFundsFromSymbol}
          selectedValue={from.symbol}
          name='convert-funds-from-symbol'
          enabled={this.isEnabledField('from.symbol')}
        />
      </div>
    )
  }

  renderFromAccount = () => {
    const { setConvertFundsFromAccount, from } = this.props

    return (
      <JPicker
        onValueChange={setConvertFundsFromAccount}
        name='convert-funds-from-account'
        placeholder='Account'
        selectedValue={from.accountId}
        errorMessage={this.getInvalidFieldMessage('from.accountId')}
        successMessage={this.getValidFieldMessage('from.accountId')}
        enabled={this.isEnabledField('from.accountId')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderToText = () => {
    return <div className='modal__text'><JIcon name='switch' className='modal__icon' />{'To'}</div>
  }

  renderToAmmountAndSymbol = () => {
    const { setConvertFundsToAmount, setConvertFundsToSymbol, to } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setConvertFundsToAmount}
          name='convert-funds-to-amount'
          placeholder='Amount'
          value={to.amount}
          errorMessage={this.getInvalidFieldMessage('to.amount')}
          successMessage={this.getValidFieldMessage('to.amount')}
          editable={this.isEnabledField('to.amount')}
        />
        <SymbolPicker
          onValueChange={setConvertFundsToSymbol}
          selectedValue={to.symbol}
          name='convert-funds-to-symbol'
          enabled={this.isEnabledField('to.symbol')}
        />
      </div>
    )
  }

  renderToAccount = () => {
    const { setConvertFundsToAccount, to } = this.props

    return (
      <JPicker
        onValueChange={setConvertFundsToAccount}
        name='convert-funds-to-account'
        placeholder='Account'
        selectedValue={to.accountId}
        errorMessage={this.getInvalidFieldMessage('to.accountId')}
        successMessage={this.getValidFieldMessage('to.accountId')}
        enabled={this.isEnabledField('to.accountId')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderFooter = () => {
    return (
      <JModalButton
        onPress={this.props.convertFunds}
        name={'convert-funds'}
        iconName={'convert-funds'}
        title={'Convert Funds'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  closeModal = () => this.props.closeConvertFundsModal()
  submitModal = event => handleEnterKeyPress(this.props.convertFunds)(event)
  isModalButtonDisabled = () => (this.props.invalidFields.length > 0)
}

ConvertFundsModal.propTypes = {
  closeConvertFundsModal: PropTypes.func.isRequired,
  setConvertFundsFromAmount: PropTypes.func.isRequired,
  setConvertFundsFromSymbol: PropTypes.func.isRequired,
  setConvertFundsFromAccount: PropTypes.func.isRequired,
  setConvertFundsToAmount: PropTypes.func.isRequired,
  setConvertFundsToSymbol: PropTypes.func.isRequired,
  setConvertFundsToAccount: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  from: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
  }).isRequired,
  to: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    accountId: PropTypes.string.isRequired,
  }).isRequired,
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
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

ConvertFundsModal.defaultProps = {
  onClose: null,
}

export default ConvertFundsModal
