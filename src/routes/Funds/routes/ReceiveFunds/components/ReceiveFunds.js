import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import ModalLayout from 'layouts/ModalLayout'
import JPicker from 'components/base/JPicker'
import ModalHeader from 'components/__new__/ModalHeader'
import { JButton, JInput } from 'components/base/__new__'

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
  isCopied,
}) => (
  <ModalLayout>
    <ModalHeader title='Receive Funds' color='gray' withMenu />
    <div className='content'>
      <div className='form'>
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
        <JInput
          placeholder={i18n('routes.receiveFunds.placeholder.recipient')}
          value={recipient}
          color='gray'
          name='receive-funds-recipient'
          disabled
        />
        <JInput
          onChange={setAmount}
          value={amount}
          placeholder={i18n('routes.receiveFunds.placeholder.amount')}
          errorMessage={invalidFields.amount}
          color='gray'
          name='receive-funds-amount'
        />
        <div className='actions'>
          <JButton onClick={copyAddress} text={isCopied ? 'copied' : 'copy'} color='white' />
        </div>
      </div>
    </div>
  </ModalLayout>
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
  isCopied: PropTypes.bool.isRequired,
}

export default ReceiveFunds
