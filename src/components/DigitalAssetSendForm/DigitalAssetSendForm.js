// @flow

import React from 'react'

import {
  AssetPicker,
  AddressPicker,
  PriorityPicker,
  DoubleInput,
  InputButton,
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
      <div className='split'>
        <div className='box'>
          <InputButton
            onChange={setFieldHandler('comment', setField)}
            value={formFields.comment}
            errorMessage={invalidFields.comment}
            icon='plus'
            label='Add comment'
            name='comment'
            placeholder='Comment'
            isLoading={false}
          />
        </div>
        <div className='box'>
          <InputButton
            onChange={setFieldHandler('nonce', setField)}
            value={formFields.nonce}
            errorMessage={invalidFields.nonce}
            icon='plus'
            label='Show nonce'
            name='nonce'
            placeholder='Nonce'
            isLoading={false}
          />
        </div>
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
