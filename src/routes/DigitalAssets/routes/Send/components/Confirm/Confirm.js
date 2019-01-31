// @flow

import React from 'react'

import {
  JText,
  JIcon,
  JFlatButton,
} from 'components/base'

import DigitalAssetsSendConfirmCard from './Card'
import DigitalAssetsSendConfirmPassword from './Password'

type Props = {|
  +submit: () => void,
  +goBack: () => void,
  +setPassword: (value: string) => void,
  +addressNames: AddressNames,
  +selectedAsset: ?DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +gasValues: GasValues,
  +errorMessage: string,
  +ownerAddress: OwnerAddress,
  +isLoading: boolean,
  +isPotentiallyFail: boolean,
|}

function DigitalAssetsSendConfirm({
  submit,
  goBack,
  setPassword,
  addressNames,
  selectedAsset,
  formFieldValues,
  formFieldErrors,
  gasValues,
  errorMessage,
  ownerAddress,
  isLoading,
  isPotentiallyFail,
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
          isPotentiallyFail={isPotentiallyFail}
        />
      </div>
      <DigitalAssetsSendConfirmPassword
        submit={submit}
        onChange={setPassword}
        value={formFieldValues.password}
        errorMessage={formFieldErrors.password}
        isLoading={isLoading}
      />
      {errorMessage &&
      <div className='error'>
        <div className='icon'>
          <JIcon name='alert' size='medium' color='white' />
        </div>
        <div className='text'>
          <JText value={errorMessage} color='white' size='semismall' whiteSpace='wrap' />
        </div>
        <div className='button'>
          <JFlatButton
            onClick={goBack}
            label='Change parameters'
            isBordered
          />
        </div>
      </div>}
    </div>
  )
}

export default DigitalAssetsSendConfirm
