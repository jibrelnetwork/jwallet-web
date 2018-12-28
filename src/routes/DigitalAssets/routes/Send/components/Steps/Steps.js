// @flow

import React from 'react'

import { STEPS } from 'routes/DigitalAssets/routes/Send/modules/digitalAssetsSend'

import DigitalAssetsSendForm from '../Form'
import DigitalAssetsSendConfirm from '../Confirm'

type Props = {|
  +goToNextStep: () => void,
  +setPriority: (priority: TXPriorityKey) => void,
  +setFormFieldValue: (fieldName: $Keys<DigitalAssetsSendFormFields>) => (value: string) => void,
  +digitalAssets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +selectedAsset: ?DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +ownerAddress: OwnerAddress,
  +priority: TXPriorityKey,
  +currentStep: DigitalAssetsSendStepIndex,
  +isLoading: boolean,
|}

function DigitalAssetsSendSteps({
  setPriority,
  goToNextStep,
  setFormFieldValue,
  digitalAssets,
  addressNames,
  selectedAsset,
  formFieldValues,
  formFieldErrors,
  ownerAddress,
  priority,
  currentStep,
  isLoading,
}: Props) {
  return (
    <div className='digital-assets-send-steps'>
      {(currentStep === STEPS.FORM) && (
        <DigitalAssetsSendForm
          setPriority={setPriority}
          setFormFieldValue={setFormFieldValue}
          formFieldValues={formFieldValues}
          formFieldErrors={formFieldErrors}
          submit={goToNextStep}
          addressNames={addressNames}
          digitalAssets={digitalAssets}
          ownerAddress={ownerAddress}
          priority={priority}
          isLoading={isLoading}
        />
      )}
      {(currentStep === STEPS.CONFIRM) && (
        <DigitalAssetsSendConfirm
          submit={goToNextStep}
          setPassword={setFormFieldValue('password')}
          addressNames={addressNames}
          selectedAsset={selectedAsset}
          priority={priority}
          ownerAddress={ownerAddress}
          formFieldValues={formFieldValues}
          errorMessage={formFieldErrors.password}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

export default DigitalAssetsSendSteps
