import React from 'react'
import PropTypes from 'prop-types'

import { SubmitModal, SymbolPicker } from 'components'
import { JIcon, JPicker, JTextInput } from 'components/base'

class ConvertFundsModal extends SubmitModal {
  renderModalBody = () => {
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
    const { setConvertFundsFromAmount, setConvertFundsFromSymbol, invalidFields, from } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setConvertFundsFromAmount}
          name='convert-funds-from-amount'
          placeholder='Amount'
          value={from.amount}
          errorMessage={invalidFields['from.amount']}
          editable
        />
        <SymbolPicker
          onValueChange={setConvertFundsFromSymbol}
          items={[]}
          selectedValue={from.symbol}
          name='convert-funds-from-symbol'
          enabled
        />
      </div>
    )
  }

  renderFromAccount = () => {
    const { accounts, invalidFields, from } = this.props

    return (
      <JPicker
        onValueChange={this.setConvertAccountId('from')}
        name='convert-funds-from-account'
        placeholder='Account'
        selectedValue={from.account.accountName}
        errorMessage={invalidFields['from.accountId']}
        enabled
      >
        {accounts.map((account) => {
          return <JPicker.Item key={account.id} label={account.accountName} value={account.id} />
        })}
      </JPicker>
    )
  }

  renderToText = () => {
    return <div className='modal__text'><JIcon name='switch' className='modal__icon' />{'To'}</div>
  }

  renderToAmmountAndSymbol = () => {
    const { setConvertFundsToSymbol, invalidFields, to } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setConvertFundsToSymbol}
          name='convert-funds-to-amount'
          placeholder='Amount'
          value={to.amount}
          errorMessage={invalidFields['to.amount']}
          editable
        />
        <SymbolPicker
          onValueChange={setConvertFundsToSymbol}
          items={[]}
          selectedValue={to.symbol}
          name='convert-funds-to-symbol'
          enabled
        />
      </div>
    )
  }

  renderToAccount = () => {
    const { accounts, invalidFields, to } = this.props

    return (
      <JPicker
        onValueChange={this.setConvertAccountId('to')}
        name='convert-funds-to-account'
        placeholder='Account'
        selectedValue={to.account.accountName}
        errorMessage={invalidFields['to.accountId']}
        enabled
      >
        {accounts.map((account) => {
          return <JPicker.Item key={account.id} label={account.accountName} value={account.id} />
        })}
      </JPicker>
    )
  }

  setConvertAccountId = container => (accountId) => {
    const { setConvertFundsFromAccountId, setConvertFundsToAccountId, accounts } = this.props
    const setId = (container === 'from') ? setConvertFundsFromAccountId : setConvertFundsToAccountId

    return setId(accountId, accounts)
  }

  closeModal = () => this.props.closeConvertFundsModal()
  submitModal = () => this.props.convertFunds()
  isModalButtonDisabled = () => false
}

ConvertFundsModal.propTypes = {
  closeConvertFundsModal: PropTypes.func.isRequired,
  setConvertFundsFromAmount: PropTypes.func.isRequired,
  setConvertFundsFromSymbol: PropTypes.func.isRequired,
  setConvertFundsFromAccountId: PropTypes.func.isRequired,
  setConvertFundsToAmount: PropTypes.func.isRequired,
  setConvertFundsToSymbol: PropTypes.func.isRequired,
  setConvertFundsToAccountId: PropTypes.func.isRequired,
  convertFunds: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
  })).isRequired,
  from: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    account: PropTypes.shape({
      id: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  to: PropTypes.shape({
    amount: PropTypes.string.isRequired,
    symbol: PropTypes.string.isRequired,
    account: PropTypes.shape({
      id: PropTypes.string.isRequired,
      accountName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

ConvertFundsModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default ConvertFundsModal
