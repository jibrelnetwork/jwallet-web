import React from 'react'
import PropTypes from 'prop-types'

import { generateQRCode, handleEnterKeyPress } from 'utils'

import { JModal, JModalButton, JPicker, JTextInput } from 'components/base'

import { CopyableField, SymbolPicker } from 'components'

class ReceiveFundsModal extends JModal {
  constructor(props) {
    super(props)
    this.state = { name: 'receive-funds' }
  }

  renderHeader = () => {
    return <div className='modal__title'>{'Receive Funds'}</div>
  }

  renderBody = () => {
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
    const { setReceiveFundsAmount, setReceiveFundsSymbol, symbol } = this.props
    const fieldName = 'amount'

    return (
      <div className='field-group'>
        <JTextInput
          onValueChange={setReceiveFundsAmount}
          name={fieldName}
          placeholder='Amount'
          value={this.props[fieldName]}
          editable
        />
        <SymbolPicker
          onValueChange={setReceiveFundsSymbol}
          selectedValue={symbol}
          name='receive-funds-symbol'
          enabled
        />
      </div>
    )
  }

  renderAccount = () => {
    const { setReceiveFundsAccount, accounts } = this.props
    const currentAccount = this.getCurrentAccount()

    return (
      <JPicker
        onValueChange={setReceiveFundsAccount}
        name={'accountId'}
        placeholder='Account'
        selectedValue={currentAccount.accountName || ''}
        enabled
      >
        {accounts.map((account) => {
          const { id, accountName } = account

          return <JPicker.Item key={id} label={accountName} value={id} />
        })}
      </JPicker>
    )
  }

  renderRecipientAddress = () => {
    const { address } = this.getCurrentAccount()

    return <CopyableField placeholder='Recipient address' value={address} />
  }

  renderQRCode = () => {
    return <div id='qr-code' style={{ textAlign: 'center' }} />
  }

  renderFooter = () => {
    return (
      <JModalButton
        onPress={this.generateQRCodeToReceive}
        name={'receive-funds'}
        title={'Generate QR Code'}
        iconName={'qr-code'}
        disabled={this.isModalButtonDisabled()}
      />
    )
  }

  generateQRCodeToReceive = () => {
    return generateQRCode({
      requisites: {
        to: this.getCurrentAccount().address,
        value: parseInt(this.props.amount, 10) || 0,
      },
    })
  }

  getCurrentAccount = () => {
    const { accounts, accountId, addressesFromMnemonic } = this.props

    for (let i = 0; i < accounts.length; i += 1) {
      const account = accounts[i]

      if (account.id === accountId) {
        const { id, accountName, type, address, addressIndex } = account

        return {
          id,
          accountName,
          address: (type === 'mnemonic') ? addressesFromMnemonic[addressIndex] : address,
        }
      }
    }

    return {}
  }

  isModalButtonDisabled = () => {
    const { accountId, amount } = this.props
    const isAmountValid = (parseInt(amount, 10) || 0) > 0
    const isAccountValid = !!accountId.length

    return !(isAmountValid && isAccountValid)
  }

  closeModal = () => this.props.closeReceiveFundsModal()
  submitModal = () => handleEnterKeyPress(this.generateQRCodeToReceive)
}

ReceiveFundsModal.propTypes = {
  closeReceiveFundsModal: PropTypes.func.isRequired,
  setReceiveFundsAmount: PropTypes.func.isRequired,
  setReceiveFundsSymbol: PropTypes.func.isRequired,
  setReceiveFundsAccount: PropTypes.func.isRequired,
  accounts: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    accountName: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    address: PropTypes.string,
    addressIndex: PropTypes.number,
  })).isRequired,
  addressesFromMnemonic: PropTypes.arrayOf(PropTypes.string).isRequired,
  amount: PropTypes.string.isRequired,
  symbol: PropTypes.string.isRequired,
  accountId: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
}

ReceiveFundsModal.defaultProps = {
  onClose: null,
}

export default ReceiveFundsModal
