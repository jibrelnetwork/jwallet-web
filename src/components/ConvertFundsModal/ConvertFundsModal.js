import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { getFieldMessage, handleEnterKeyPress } from 'utils'

import SymbolPicker from 'components/SymbolPicker'
import { JIcon, JModal, JModalButton, JPicker, JTextInput } from 'components/base'

class ConvertFundsModal extends Component {
  render() {
    const { closeConvertFundsModal, convertFunds, funds } = this.props

    return (
      <JModal
        closeModal={closeConvertFundsModal}
        submitModal={handleEnterKeyPress(convertFunds)}
        name='convert-funds'
        alert={funds.convertFormData.alert}
        header={this.renderHeader()}
        body={this.renderBody()}
        footer={this.renderFooter()}
        isOpen={funds.isConvertFundsModalOpen}
      />
    )
  }

  renderHeader = () => {
    return (
      <div className='convert-funds__header'>
        <div className='modal__title'>{'Convert Funds'}</div>
      </div>
    )
  }

  renderBody = () => {
    return (
      <div className='convert-funds__body'>
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
    const { setConvertFundsFromAmount, setConvertFundsFromSymbol, funds } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setConvertFundsFromAmount}
          name='convert-funds-from-amount'
          placeholder='Amount'
          value={funds.convertFormData.from.amount}
          errorMessage={this.getInvalidFieldMessage('from.amount')}
          successMessage={this.getValidFieldMessage('from.amount')}
          editable={this.isEnabledField('from.amount')}
        />
        <SymbolPicker
          onValueChange={setConvertFundsFromSymbol}
          selectedValue={funds.convertFormData.from.symbol}
          name='convert-funds-from-symbol'
          enabled={this.isEnabledField('from.symbol')}
        />
      </div>
    )
  }

  renderFromAccount = () => {
    const { setConvertFundsFromAccount, funds } = this.props

    return (
      <JPicker
        onValueChange={setConvertFundsFromAccount}
        name='convert-funds-from-account'
        placeholder='Account'
        selectedValue={funds.convertFormData.from.account}
        errorMessage={this.getInvalidFieldMessage('from.account')}
        successMessage={this.getValidFieldMessage('from.account')}
        enabled={this.isEnabledField('from.account')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderToText = () => {
    return <div className='modal__text'><JIcon name='switch' className='modal__icon' />{'To'}</div>
  }

  renderToAmmountAndSymbol = () => {
    const { setConvertFundsToAmount, setConvertFundsToSymbol, funds } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setConvertFundsToAmount}
          name='convert-funds-to-amount'
          placeholder='Amount'
          value={funds.convertFormData.to.amount}
          errorMessage={this.getInvalidFieldMessage('to.amount')}
          successMessage={this.getValidFieldMessage('to.amount')}
          editable={this.isEnabledField('to.amount')}
        />
        <SymbolPicker
          onValueChange={setConvertFundsToSymbol}
          selectedValue={funds.convertFormData.to.symbol}
          name='convert-funds-to-symbol'
          enabled={this.isEnabledField('to.symbol')}
        />
      </div>
    )
  }

  renderToAccount = () => {
    const { setConvertFundsToAccount, funds } = this.props

    return (
      <JPicker
        onValueChange={setConvertFundsToAccount}
        name='convert-funds-to-account'
        placeholder='Account'
        selectedValue={funds.convertFormData.to.account}
        errorMessage={this.getInvalidFieldMessage('to.account')}
        successMessage={this.getValidFieldMessage('to.account')}
        enabled={this.isEnabledField('to.account')}
      >
        <JPicker.Item label='example' value='example' />
      </JPicker>
    )
  }

  renderFooter = () => {
    const { convertFunds, funds } = this.props

    return (
      <JModalButton
        onPress={convertFunds}
        name={'convert-funds'}
        iconName={'convert-funds'}
        title={'Convert Funds'}
        disabled={(funds.convertFormData.invalidFields.length > 0)}
      />
    )
  }

  isEnabledField = name => (this.props.funds.convertFormData.disabledFields.indexOf(name) === -1)
  getValidFieldMessage = name => getFieldMessage(this.props.funds.convertFormData.validFields, name)
  getInvalidFieldMessage = n => getFieldMessage(this.props.funds.convertFormData.invalidFields, n)
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
  funds: PropTypes.shape({
    convertFormData: PropTypes.shape({
      from: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        account: PropTypes.string.isRequired,
      }).isRequired,
      to: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        symbol: PropTypes.string.isRequired,
        account: PropTypes.string.isRequired,
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
    }).isRequired,
    isConvertFundsModalOpen: PropTypes.bool.isRequired,
  }).isRequired,
}

export default ConvertFundsModal
