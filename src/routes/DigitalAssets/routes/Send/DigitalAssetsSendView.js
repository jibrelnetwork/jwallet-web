// @flow

import React from 'react'
import { handle } from 'utils/eventHandlers'

import { CloseableScreen } from 'components'
import { JInput, JRaisedButton } from 'components/base'

import {
  type OpenViewParams,
} from './modules/digitalAssetsSend'

type SetFieldFunction = (fieldName: $Keys<DigitalAssetSendFormFields>, value: string) => void

type Props = {|
  +submit: () => void,
  +openView: (params: OpenViewParams) => void,
  +closeView: () => void,
  +closeClick: () => void,
  +setField: SetFieldFunction,
  +params: OpenViewParams,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
|}

declare type DigitalAssetSendFormFields = {|
  ownerAddress: string,
  recepientAddress: string,
  assetAddress: string,
  value: string,
  valueFiat: string,
  priority: string,
  comment: string,
  nonce: string,
|}

const setFieldHandler = (
  fieldName: $Keys<DigitalAssetSendFormFields>,
  setField: SetFieldFunction
) => (value: string) => setField(fieldName, value)

const DigitalAssetsSendView = ({
  submit,
  openView,
  setField,
  closeView,
  closeClick,
  params,
  formFields,
  invalidFields,
}: Props) => (
  <CloseableScreen
    title='Send digital asset'
    open={handle(openView)(params)}
    close={closeView}
    closeClick={closeClick}
  >
    <div className='digital-assets-send-view'>
      <div className='form'>
        <JInput
          onChange={setFieldHandler('ownerAddress', setField)}
          value={formFields.ownerAddress}
          name='ownerAddress'
          errorMessage={invalidFields.ownerAddress}
          placeholder='Your address'
          type='text'
          color='gray'
          isLoading={false}
        />
        <JInput
          onChange={setFieldHandler('recepientAddress', setField)}
          value={formFields.recepientAddress}
          name='recepientAddress'
          errorMessage={invalidFields.recepientAddress}
          placeholder='Recepient address'
          type='text'
          color='gray'
          isLoading={false}
        />
        <JInput
          onChange={setFieldHandler('assetAddress', setField)}
          value={formFields.assetAddress}
          name='assetAddress'
          errorMessage={invalidFields.assetAddress}
          placeholder='Asset address'
          type='text'
          color='gray'
          isLoading={false}
        />
        <div className='value-group'>
          <JInput
            onChange={setFieldHandler('value', setField)}
            value={formFields.value}
            name='value'
            errorMessage={invalidFields.value}
            placeholder='Value'
            type='text'
            color='gray'
            isLoading={false}
          />
          <JInput
            onChange={setFieldHandler('valueFiat', setField)}
            value={formFields.valueFiat}
            name='valueFiat'
            errorMessage={invalidFields.valueFiat}
            placeholder='Value Fiat'
            type='text'
            color='gray'
            isLoading={false}
          />
        </div>
        <JInput
          onChange={setFieldHandler('priority', setField)}
          value={formFields.priority}
          name='priority'
          errorMessage={invalidFields.priority}
          placeholder='Priority'
          type='text'
          color='gray'
          isLoading={false}
        />
        <div className='actions'>
          <JRaisedButton
            onClick={submit}
            label='Confirm'
            color='blue'
            labelColor='white'
            isWide
          />
        </div>
      </div>
    </div>
  </CloseableScreen>
)

export default DigitalAssetsSendView
