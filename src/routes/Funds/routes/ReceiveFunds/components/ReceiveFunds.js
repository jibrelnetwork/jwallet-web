import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { JButton, JPicker, JTextInput } from 'components/base'

const ReceiveFunds = ({
  setAsset,
  setAmount,
  saveQRCode,
  copyAddress,
  digitalAssets,
  invalidFields,
  assetAddress,
  recipient,
  amount,
}) => (
  <div className='receive-funds-view'>
    <div
      onClick={saveQRCode}
      className={classNames('qr-code', { 'qr-code--hidden': (!amount || invalidFields.amount) })}
      id='qr-code'
    />
    <JPicker
      onValueChange={setAsset}
      selectedValue={assetAddress}
      name='receive-funds-asset'
      placeholder={i18n('routes.receiveFunds.placeholder.symbol')}
      enabled
    >
      {digitalAssets.map(({ address, symbol }) => (
        <JPicker.Item key={address} label={symbol} value={address} />
      ))}
    </JPicker>
    <JTextInput
      name='receive-funds-recipient'
      placeholder={i18n('routes.receiveFunds.placeholder.recipient')}
      value={recipient}
    />
    <JTextInput
      onValueChange={setAmount}
      name='receive-funds-amount'
      placeholder={i18n('routes.receiveFunds.placeholder.amount')}
      value={amount}
      errorMessage={invalidFields.amount}
      editable
    />
    <JButton onClick={copyAddress} label={i18n('routes.receiveFunds.buttonTitleCopy')} blue />
  </div>
)

ReceiveFunds.propTypes = {
  setAsset: PropTypes.func.isRequired,
  setAmount: PropTypes.func.isRequired,
  saveQRCode: PropTypes.func.isRequired,
  copyAddress: PropTypes.func.isRequired,
  digitalAssets: PropTypes.arrayOf(PropTypes.object).isRequired,
  invalidFields: PropTypes.shape({}).isRequired,
  assetAddress: PropTypes.string.isRequired,
  amount: PropTypes.string.isRequired,
  recipient: PropTypes.string.isRequired,
}

export default ReceiveFunds
