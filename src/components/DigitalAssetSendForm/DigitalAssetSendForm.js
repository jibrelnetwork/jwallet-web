// @flow

import React from 'react'

import { AssetPicker } from 'components'
import { JInput, JRaisedButton } from 'components/base'

type SetFieldFunction = (fieldName: $Keys<DigitalAssetSendFormFields>, value: string) => void

const setFieldHandler = (
  fieldName: $Keys<DigitalAssetSendFormFields>,
  setField: SetFieldFunction
) => (value: string) => setField(fieldName, value)

const setAssetAddressFieldHandler = (
  setField: SetFieldFunction,
) => (value: Address) => setField('assetAddress', value)

type Props = {|
  +submit: () => void,
  +setField: SetFieldFunction,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
  +assets: Array<DigitalAsset>,
|}

const DigitalAssetSendForm = ({
  assets,
  submit,
  setField,
  formFields,
  invalidFields,
}: Props) => (
  <div className='digital-assets-send-form'>
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
        onChange={setFieldHandler('recepient', setField)}
        value={formFields.recepient}
        name='recepient'
        errorMessage={invalidFields.recepient}
        placeholder='Recepient address'
        type='text'
        color='gray'
        isLoading={false}
      />
      <AssetPicker
        activeAssets={assets}
        currentAsset={formFields.assetAddress}
        onSelect={setAssetAddressFieldHandler(setField)}
        label='Asset address'
      />
      {/* <JInput
        onChange={setFieldHandler('assetAddress', setField)}
        value={formFields.assetAddress}
        name='assetAddress'
        errorMessage={invalidFields.assetAddress}
        placeholder='Asset address'
        type='text'
        color='gray'
        isLoading={false}
      /> */}
      <div className='value-group'>
        <JInput
          onChange={setFieldHandler('amount', setField)}
          value={formFields.amount}
          name='value'
          errorMessage={invalidFields.amount}
          placeholder='Value'
          type='text'
          color='gray'
          isLoading={false}
        />
        {/* <JInput
          onChange={setFieldHandler('amountFiat', setField)}
          value={formFields.amountFiat}
          name='valueFiat'
          errorMessage={invalidFields.amountFiat}
          placeholder='Value Fiat'
          type='text'
          color='gray'
          isLoading={false}
        /> */}
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
)

export default DigitalAssetSendForm
