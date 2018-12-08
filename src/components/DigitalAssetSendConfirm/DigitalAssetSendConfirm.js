// @flow

import React from 'react'

import DigitalAssetSendConfirmCard, {
  type Props as DigitalAssetSendConfirmCardProps,
} from './Card/DigitalAssetSendConfirmCard'

import DigitalAssetSendPasswordForm, {
  type Props as DigitalAssetSendPasswordFormProps,
} from './PasswordForm/DigitalAssetSendPasswordForm'

type Props = {|
  ...DigitalAssetSendConfirmCardProps,
  ...DigitalAssetSendPasswordFormProps,
|}

const DigitalAssetSendConfirm = ({
  // card
  amount,
  amountCurrency,
  feeETH,
  fromName,
  fromAddress,
  toName,
  toAddress,
  // form
  submit,
  isLoading,
  setField,
  formFields,
  invalidFields,
}: Props) => (
  <div className='digital-asset-send-confirm'>
    <div className='card'>
      <DigitalAssetSendConfirmCard
        amount={amount}
        amountCurrency={amountCurrency}
        feeETH={feeETH}
        fromName={fromName}
        fromAddress={fromAddress}
        toName={toName}
        toAddress={toAddress}
      />
    </div>
    <DigitalAssetSendPasswordForm
      submit={submit}
      isLoading={isLoading}
      setField={setField}
      formFields={formFields}
      invalidFields={invalidFields}
    />
  </div>
)

export default DigitalAssetSendConfirm
