// @flow

import React from 'react'

import {
  PasswordStep,
  CloseableScreen,
  DigitalAssetSendConfirm,
} from 'components'

type Props = {|
  openView: () => void,
  // closeView: () => void,
  closeClick: () => void,
  passwordSubmit: (password: string) => void,
  passwordError: string,
  isLoading: boolean,
  amount: string,
  amountCurrency: string,
  feeETH: string,
  // networkId: NetworkId,
  fromName: string,
  fromAddress: string,
  toName: string,
  toAddress: string,
|}

const DigitalAssetsSendConfirmView = ({
  openView,
  // closeView,
  closeClick,
  passwordSubmit,
  passwordError,
  isLoading,
  amount,
  amountCurrency,
  feeETH,
  // networkId,
  fromName,
  fromAddress,
  toName,
  toAddress,
}: Props) => (
  <CloseableScreen
    title='Send digital asset'
    open={openView}
    closeClick={closeClick}
  >
    <div className='digital-assets-send-view'>
      <div className='wrap'>
        <PasswordStep
          onSubmit={passwordSubmit}
          submitLabel='Send asset'
          errorMessage={passwordError}
          placeholder='Security password'
          isLoading={isLoading}
        >
          <DigitalAssetSendConfirm
            amount={amount}
            amountCurrency={amountCurrency}
            feeETH={feeETH}
            fromName={fromName}
            fromAddress={fromAddress}
            toName={toName}
            toAddress={toAddress}
          />
        </PasswordStep>
      </div>
    </div>
  </CloseableScreen>
)

export default DigitalAssetsSendConfirmView
