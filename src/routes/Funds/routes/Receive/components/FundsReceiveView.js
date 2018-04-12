// @flow

import React from 'react'

import ethereum from 'data/assets/ethereum'
import ModalLayout from 'layouts/ModalLayout'
import JPicker from 'components/base/JPicker'
import { ModalHeader, QRCode } from 'components'
import { JButton, JInput } from 'components/base'

const FundsReceiveView = ({
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
}: Props) => (
  <ModalLayout>
    <div className='funds-receive-view'>
      <div className='header'>
        <ModalHeader title='Receive Funds' color='gray' withMenu />
      </div>
      <div className='content'>
        <div className='form'>
          <QRCode
            saveQRCode={saveQRCode}
            isActive={amount && !invalidFields.amount}
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
            <JButton
              onClick={copyAddress}
              text={isCopied ? 'Copied!' : 'Copy address'}
              color='white'
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
  digitalAssets: DigitalAssets,
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
  digitalAssets: [],
  invalidFields: {},
  assetAddress: ethereum.address,
  amount: '',
  recipient: '',
  isCopied: false,
}

export default FundsReceiveView
