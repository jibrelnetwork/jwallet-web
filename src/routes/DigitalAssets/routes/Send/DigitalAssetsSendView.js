// @flow

import React from 'react'
import { handle } from 'utils/eventHandlers'

import {
  CloseableScreen,
  DigitalAssetSendForm,
  DigitalAssetSendConfirm,
} from 'components'

import {
  type OpenViewParams,
} from './modules/digitalAssetsSend'

type SetFieldFunction = (fieldName: $Keys<DigitalAssetSendFormFields>, value: string) => void

type Props = {|
  // utility
  +openView: (params: OpenViewParams) => void,
  +closeView: () => void,
  +closeClick: () => void,
  +params: OpenViewParams,
  +step: DigitalAssetSendStep,
  // forms
  +setField: SetFieldFunction,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
  +submitSendForm: () => void,
  // step 2
  +amount: string,
  +amountCurrency: string,
  +feeETH: string,
  +fromName: ?string,
  +toName: ?string,
  +submitPasswordForm: () => void,
  +isLoading: boolean,
|}

const DigitalAssetsSendView = ({
  // utility
  openView,
  closeView,
  closeClick,
  params,
  step,
  // step 1
  setField,
  formFields,
  invalidFields,
  submitSendForm,
  // step 2 - card
  amount,
  amountCurrency,
  feeETH,
  fromName,
  toName,
  // step 2 - password form
  submitPasswordForm,
  isLoading,
}: Props) => (
  <CloseableScreen
    title='Send digital asset'
    open={handle(openView)(params)}
    close={closeView}
    closeClick={closeClick}
  >
    <div className='digital-assets-send-view'>
      <div className='wrap'>
        {step === '1' ?
          <DigitalAssetSendForm
            setField={setField}
            formFields={formFields}
            invalidFields={invalidFields}
            submit={submitSendForm}
          /> :
          <DigitalAssetSendConfirm
            amount={amount}
            amountCurrency={amountCurrency}
            feeETH={feeETH}
            fromAddress={formFields.ownerAddress}
            toAddress={formFields.recepientAddress}
            fromName={fromName}
            toName={toName}
            setField={setField}
            formFields={formFields}
            invalidFields={invalidFields}
            submit={submitPasswordForm}
            isLoading={isLoading}
          />}
      </div>
    </div>
  </CloseableScreen>
)

export default DigitalAssetsSendView
