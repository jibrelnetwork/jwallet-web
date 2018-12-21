// @flow

import React from 'react'

import {
  AssetPicker,
  AddressPicker,
  PriorityPicker,
  DoubleInput,
} from 'components'

import { JInput, JRaisedButton } from 'components/base'

type SetFieldFunction = (
  fieldName: $Keys<DigitalAssetSendFormFields>,
  value: string | TXPriority
) => void

const setFieldHandler = (
  fieldName: $Keys<DigitalAssetSendFormFields>,
  setField: SetFieldFunction
) => (value: string | TXPriority) => setField(fieldName, value)

type Props = {|
  +submit: () => void,
  +setField: SetFieldFunction,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
  +assets: Array<DigitalAssetWithBalance>,
  +recepientAddresses: Array<AddressPickerAddress>,
|}

const DigitalAssetSendForm = ({
  assets,
  submit,
  setField,
  formFields,
  invalidFields,
  recepientAddresses,
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
        isDisabled
      />
      <AddressPicker
        onSelect={setFieldHandler('recepient', setField)}
        errorMessage={invalidFields.recepient}
        selectedAddress={formFields.recepient}
        addresses={recepientAddresses}
      />
      <AssetPicker
        assets={assets}
        selectedAsset={formFields.assetAddress}
        onSelect={setFieldHandler('assetAddress', setField)}
      />
      <DoubleInput
        onChange={setFieldHandler('amount', setField)}
        valueAmount={formFields.amount}
        valueFiat={formFields.amountFiat}
        errorMessageAmount={invalidFields.amount}
      />
      <PriorityPicker
        selectedPriority={formFields.priority}
        onSelect={setFieldHandler('priority', setField)}
      />
      <JInput
        onChange={setFieldHandler('comment', setField)}
        value={formFields.comment}
        name='comment'
        errorMessage={invalidFields.comment}
        placeholder='Comment'
        type='text'
        color='gray'
        isLoading={false}
      />
      <JInput
        onChange={setFieldHandler('nonce', setField)}
        value={formFields.nonce}
        name='nonce'
        errorMessage={invalidFields.nonce}
        placeholder='Nonce'
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
