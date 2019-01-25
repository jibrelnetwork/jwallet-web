// @flow

import React from 'react'

import DigitalAssetsSendConfirmCard from './Card'
import DigitalAssetsSendConfirmPassword from './Password'

type Props = {|
  +submit: () => void,
  +setPassword: (value: string) => void,
  +addressNames: AddressNames,
  +selectedAsset: ?DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +gasValues: GasValues,
  +errorMessage: string,
  +ownerAddress: OwnerAddress,
  +isLoading: boolean,
|}

function DigitalAssetsSendConfirm({
  submit,
  setPassword,
  addressNames,
  selectedAsset,
  formFieldValues,
  gasValues,
  errorMessage,
  ownerAddress,
  isLoading,
}: Props) {
  if (!selectedAsset) {
    return null
  }

  return (
    <div className='digital-assets-send-confirm'>
      <div className='card'>
        <DigitalAssetsSendConfirmCard
          formFieldValues={formFieldValues}
          addressNames={addressNames}
          selectedAsset={selectedAsset}
          ownerAddress={ownerAddress}
          gasValues={gasValues}
        />
      </div>
      <DigitalAssetsSendConfirmPassword
        submit={submit}
        onChange={setPassword}
        value={formFieldValues.password}
        errorMessage={errorMessage}
        isLoading={isLoading}
      />
    </div>
  )
}

export default DigitalAssetsSendConfirm
