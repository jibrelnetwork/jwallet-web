import React from 'react'
import PropTypes from 'prop-types'

import { generateQRCode } from 'utils'

import { CopyableField, SubmitModal, SymbolPicker } from 'components'
import { JPicker, JTextInput } from 'components/base'

class ReceiveFundsModal extends SubmitModal {
  renderModalBody = () => {
    return (
      <div>
        {this.renderAmmountAndSymbol()}
        {this.renderAccount()}
        {this.renderRecipientAddress()}
        {this.renderQRCode()}
      </div>
    )
  }

  renderAmmountAndSymbol = () => {
    const { setReceiveFundsAmount, setReceiveFundsSymbol, amount, symbol } = this.props

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setReceiveFundsAmount}
          name={'amount'}
          placeholder='Amount'
          value={amount}
          editable
        />
        <SymbolPicker
          onValueChange={setReceiveFundsSymbol}
          items={[]}
          selectedValue={symbol}
          name='receive-funds-symbol'
          enabled
        />
      </div>
    )
  }

  renderAccount = () => {
    const { accounts, currentAccount } = this.props

    return (
      <JPicker
        onValueChange={this.setReceiveFundsAccountId}
        name={'accountId'}
        placeholder='Account'
        selectedValue={currentAccount.accountName || ''}
        enabled={!!accounts.length}
      >
        {accounts.map((account) => {
          return <JPicker.Item key={account.id} label={account.accountName} value={account.id} />
        })}
      </JPicker>
    )
  }

  renderRecipientAddress = () => {
    const { address } = this.props.currentAccount

    return <CopyableField placeholder='Recipient address' value={address} />
  }

  renderQRCode = () => {
    return <div id='qr-code' style={{ textAlign: 'center' }} />
  }

  generateQRCodeToReceive = () => {
    const { currentAccount, amount } = this.props

    return generateQRCode({
      requisites: {
        to: currentAccount.address,
        value: parseInt(amount, 10) || 0,
      },
    })
  }

  isModalButtonDisabled = () => {
    const { currentAccount, amount } = this.props
    const isAmountValid = (parseInt(amount, 10) || 0) > 0
    const isAccountValid = !!currentAccount.id.length

    return !(isAmountValid && isAccountValid)
  }

  setReceiveFundsAccountId = (accountId) => {
    const { setReceiveFundsAccountId, accounts, addressesFromMnemonic } = this.props

    return setReceiveFundsAccountId(accountId, accounts, addressesFromMnemonic)
  }

  closeModal = () => this.props.closeReceiveFundsModal()
  submitModal = () => this.generateQRCodeToReceive()
}

ReceiveFundsModal.propTypes = {
  closeReceiveFundsModal: PropTypes.func.isRequired,
  setReceiveFundsAmount: PropTypes.func.isRequired,
  setReceiveFundsSymbol: PropTypes.func.isRequired,
  setReceiveFundsAccountId: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    address: PropTypes.string,
    addressIndex: PropTypes.number,
  })).isRequired,
  addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentAccount: PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  modalName: PropTypes.string.isRequired,
  modalTitle: PropTypes.string.isRequired,
  buttonTitle: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  /* optional */
  onClose: PropTypes.func,
}

ReceiveFundsModal.defaultProps = {
  ...SubmitModal.defaultProps,
  onClose: () => {},
}

export default ReceiveFundsModal
