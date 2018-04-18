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
