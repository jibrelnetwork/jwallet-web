// @flow

import React from 'react'

import handle from 'utils/eventHandlers/handle'

import {
  CloseableScreen,
  DigitalAssetSendForm,
  DigitalAssetSendConfirm,
} from 'components'

import type { OpenViewParams } from './modules/digitalAssetsSend'

type SetFieldFunction = (
  fieldName: $Keys<DigitalAssetSendFormFields>,
  value: string | TXPriority
) => void

type Props = {|
  // utility
  +close: () => void,
  +closeView: () => void,
  +openView: (params: OpenViewParams) => void,
  +params: OpenViewParams,
  +step: DigitalAssetSendStep,
  // step 1
  +setField: SetFieldFunction,
  +submitSendForm: () => void,
  +assets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
  // step 2
  +submitPasswordForm: () => void,
  +amount: string,
  +feeETH: string,
  +toName: ?string,
  +fromName: ?string,
  +amountCurrency: string,
  +isLoading: boolean,
|}

function DigitalAssetsSendView({
  // utility
  close,
  openView,
  closeView,
  params,
  step,
  // step 1
  setField,
  submitSendForm,
  assets,
  addressNames,
  formFields,
  invalidFields,
  // step 2
  submitPasswordForm,
  amount,
  feeETH,
  toName,
  fromName,
  amountCurrency,
  isLoading,
}: Props) {
  return (
    <CloseableScreen
      close={close}
      onClose={closeView}
      onOpen={handle(openView)(params)}
      title='Send digital asset'
    >
      <div className='digital-assets-send-view'>
        <div className='wrap'>
          {(step === '1') ? (
            <DigitalAssetSendForm
              setField={setField}
              formFields={formFields}
              invalidFields={invalidFields}
              submit={submitSendForm}
              addressNames={addressNames}
              assets={assets}
            />
          ) : (
            <DigitalAssetSendConfirm
              amount={amount}
              amountCurrency={amountCurrency}
              feeETH={feeETH}
              fromAddress={formFields.ownerAddress}
              toAddress={formFields.recepient}
              fromName={fromName}
              toName={toName}
              setField={setField}
              formFields={formFields}
              invalidFields={invalidFields}
              submit={submitPasswordForm}
              isLoading={isLoading}
            />
          )}
        </div>
      </div>
    </CloseableScreen>
  )
}

export default DigitalAssetsSendView
