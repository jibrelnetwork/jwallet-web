// @flow

import React from 'react'

import { AssetPicker, AddressPicker, DoubleInput } from 'components'
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
        asset={assets[formFields.assetAddress]}
        addresses={recepientAddresses}
      />
      <AssetPicker
        assets={assets}
        selectedAsset={formFields.assetAddress}
        onSelect={setAssetAddressFieldHandler(setField)}
      />
      <DoubleInput
        onChange={setFieldHandler('amount', setField)}
        valueAmount={formFields.amount}
        errorMessageAmount={invalidFields.amount}
        valueFiat={formFields.amountFiat}
        errorMessageFiat={invalidFields.amountFiat}
      />
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
      <div className='value-group'>
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
