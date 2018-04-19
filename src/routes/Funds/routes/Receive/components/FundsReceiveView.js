// @flow

import React from 'react'

import ethereum from 'data/assets/ethereum'
import ModalLayout from 'layouts/ModalLayout'
import { JButton, JInput } from 'components/base'
import { AssetPicker, ModalHeader, QRCode } from 'components'

const FundsReceiveView = ({
  setAsset,
  setAmount,
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
            saveQRCode={saveQRCode}
            isActive={amount && !invalidFields.amount}
          />
          <AssetPicker onSelect={setAsset} currentAsset={assetAddress} />
          <JInput
            value={recipient}
            color='white'
            name='receive-funds-recipient'
            placeholder='routes.receiveFunds.placeholder.recipient'
            isDisabled
          />
          <JInput
            onChange={setAmount}
            value={amount}
            errorMessage={invalidFields.amount}
            color='white'
            name='receive-funds-amount'
            placeholder='routes.receiveFunds.placeholder.amount'
          />
          <div className='actions'>
            <JButton
              onClick={copyAddress}
              text={isCopied ? 'Copied!' : 'Copy address'}
              color='white'
              wide
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
  saveQRCode: Function,
  copyAddress: Function,
  invalidFields: FormFields,
  assetAddress: Address,
  amount: string,
  recipient: string,
  isCopied: boolean,
}

FundsReceiveView.defaultProps = {
  setAsset: () => {},
  setAmount: () => {},
  saveQRCode: () => {},
  copyAddress: () => {},
  invalidFields: {},
  assetAddress: ethereum.address,
  amount: '',
  recipient: '',
  isCopied: false,
}

export default FundsReceiveView
