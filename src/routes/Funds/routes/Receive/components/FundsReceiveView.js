// @flow

import React from 'react'

import ModalLayout from 'layouts/ModalLayout'
import { JInput, JRaisedButton } from 'components/base'
import { AssetPicker, ModalHeader, QRCode } from 'components'

const FundsReceiveView = ({
  setAsset,
  setAmount,
  copyQRCode,
  saveQRCode,
  copyAddress,
  invalidFields,
  assetAddress,
  recipient,
  amount,
  isCopied,
}: Props) => (
  <ModalLayout>
    <div className='funds-receive-view'>
      <ModalHeader title='Receive Funds' color='gray' withMenu />
      <div className='content'>
        <div className='form'>
          <QRCode
            copy={copyQRCode}
            download={saveQRCode}
            isActive={!!amount && !invalidFields.amount}
          />
          <AssetPicker onSelect={setAsset} currentAsset={assetAddress} />
          <JInput
            value={recipient}
            type='text'
            color='gray'
            name='receive-funds-recipient'
            placeholder='routes.receiveFunds.placeholder.recipient'
            isDisabled
          />
          <JInput
            onChange={setAmount}
            value={amount}
            errorMessage={invalidFields.amount}
            type='text'
            color='gray'
            name='receive-funds-amount'
            placeholder='routes.receiveFunds.placeholder.amount'
          />
          <div className='actions'>
            <JRaisedButton
              onClick={copyAddress}
              label={isCopied ? 'Copied!' : 'Copy address'}
              color='white'
              labelColor='blue'
              isWide
            />
          </div>
        </div>
      </div>
    </div>
  </ModalLayout>
)

type Props = {
  setAsset: Function,
  setAmount: Function,
  copyQRCode: Function,
  saveQRCode: Function,
  copyAddress: Function,
  invalidFields: FormFields,
  amount: string,
  recipient: string,
  assetAddress: Address,
  isCopied: boolean,
}

FundsReceiveView.defaultProps = {
  isCopied: false,
}

export default FundsReceiveView
