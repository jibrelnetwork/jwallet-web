// @flow

import React from 'react'

import { STEPS } from 'routes/DigitalAssets/routes/Send/modules/digitalAssetsSend'

import DigitalAssetsSendForm from '../Form'
import DigitalAssetsSendConfirm from '../Confirm'

type Props = {|
  +goToNextStep: () => void,
  +setPriority: (priority: TXPriorityKey) => void,
  +setFormFieldValue: (fieldName: $Keys<DigitalAssetsSendFormFields>) => (value: string) => void,
  +setNonceEditable: (isEditable: boolean) => void,
  +digitalAssets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +selectedAsset: ?DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +formFieldWarnings: DigitalAssetsSendFormFields,
  +formError: string,
  +ownerAddress: OwnerAddress,
  +priority: TXPriorityKey,
  +currentStep: DigitalAssetsSendStepIndex,
  +gasValues: GasValues,
  +isLoading: boolean,
|}

function DigitalAssetsSendSteps({
  setPriority,
  goToNextStep,
  setFormFieldValue,
  setNonceEditable,
  digitalAssets,
  addressNames,
  selectedAsset,
  formFieldValues,
  formFieldErrors,
  formFieldWarnings,
  formError,
  ownerAddress,
  priority,
  currentStep,
  isLoading,
  gasValues,
}: Props) {
  return (
    <div className='digital-assets-send-steps'>
      {(currentStep === STEPS.FORM) && (
        <DigitalAssetsSendForm
          setPriority={setPriority}
          setFormFieldValue={setFormFieldValue}
          setNonceEditable={setNonceEditable}
          formFieldValues={formFieldValues}
          formFieldErrors={formFieldErrors}
          formFieldWarnings={formFieldWarnings}
          formError={formError}
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
          ownerAddress={ownerAddress}
          formFieldValues={formFieldValues}
          errorMessage={formFieldErrors.password}
          isLoading={isLoading}
          gasValues={gasValues}
        />
      )}
    </div>
  )
}

export default DigitalAssetsSendSteps
