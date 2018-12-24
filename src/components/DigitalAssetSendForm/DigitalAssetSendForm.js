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
  +assets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
|}

const DigitalAssetSendForm = ({
  assets,
  submit,
  setField,
  formFields,
  invalidFields,
  addressNames,
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
        addressNames={addressNames}
        errorMessage={invalidFields.recepient}
        selectedAddress={formFields.recepient}
      />
      <AssetPicker
        assets={assets}
        selectedAsset={formFields.assetAddress}
        onSelect={setFieldHandler('assetAddress', setField)}
      />
      <DoubleInput
        items={[{
          onChange: setFieldHandler('amount', setField),
          value: formFields.amount,
          placeholder: 'Value',
        }, {
          value: formFields.amountFiat,
          placeholder: 'Value',
        }]}
        warningMessage=''
        errorMessage={invalidFields.amount}
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
