// @flow

import React from 'react'

import { STEPS } from 'store/modules/digitalAssetsSend'

import DigitalAssetsSendForm from '../Form'
import DigitalAssetsSendConfirm from '../Confirm'

type Props = {|
  +goToNextStep: () => void,
  +goBack: () => void,
  +setPriority: (priority: TXPriorityKey) => void,
  +setFormFieldValue: (fieldName: $Keys<DigitalAssetsSendFormFields>) => (value: string) => void,
  +setNonceEditable: (isEditable: boolean) => void,
  +digitalAssets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +selectedAsset: ?DigitalAsset,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +formFieldWarnings: DigitalAssetsSendFormFields,
  +sendAssetError: string,
  +ownerAddress: OwnerAddress,
  +priority: TXPriorityKey,
  +currentStep: DigitalAssetsSendStepIndex,
  +gasValues: GasValues,
  +isLoading: boolean,
  +isPotentiallyFail: boolean,
  +fiatCurrency: FiatCurrency,
|}

function DigitalAssetsSendSteps({
  goBack,
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
  sendAssetError,
  ownerAddress,
  priority,
  currentStep,
  isLoading,
  gasValues,
  isPotentiallyFail,
  fiatCurrency,
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
          submit={goToNextStep}
          addressNames={addressNames}
          digitalAssets={digitalAssets}
          ownerAddress={ownerAddress}
          priority={priority}
          isLoading={isLoading}
          fiatCurrency={fiatCurrency}
        />
      )}
      {(currentStep === STEPS.CONFIRM) && (
        <DigitalAssetsSendConfirm
          submit={goToNextStep}
          goBack={goBack}
          setPassword={setFormFieldValue('password')}
          addressNames={addressNames}
          selectedAsset={selectedAsset}
          ownerAddress={ownerAddress}
          formFieldValues={formFieldValues}
          formFieldErrors={formFieldErrors}
          errorMessage={sendAssetError}
          isLoading={isLoading}
          gasValues={gasValues}
          isPotentiallyFail={isPotentiallyFail}
        />
      )}
    </div>
  )
}

export default DigitalAssetsSendSteps
