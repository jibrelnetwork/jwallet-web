// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

import {
  InputButton,
  DoubleInput,
  AddressPicker,
} from 'components'

import {
  JInput,
  JRaisedButton,
} from 'components/base'

import DigitalAssetsSendFormAssetPicker from './AssetPicker'
import DigitalAssetsSendFormPriorityPicker from './PriorityPicker'

type Props = {|
  +submit: () => void,
  +setPriority: (priority: TXPriorityKey) => void,
  +setFormFieldValue: (fieldName: $Keys<DigitalAssetsSendFormFields>) => (value: string) => void,
  +digitalAssets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +ownerAddress: OwnerAddress,
  +priority: TXPriorityKey,
  +isLoading: boolean,
|}

function DigitalAssetsSendForm({
  submit,
  setPriority,
  setFormFieldValue,
  digitalAssets,
  addressNames,
  formFieldValues,
  formFieldErrors,
  ownerAddress,
  priority,
  isLoading,
}: Props) {
  return (
    <div className='digital-assets-send-form'>
      <form className='form' onSubmit={ignoreEvent(isLoading ? null : submit)()}>
        <JInput
          value={ownerAddress}
          color='gray'
          name='owner-address'
          placeholder='Current address'
          isDisabled
        />
        <AddressPicker
          onSelect={setFormFieldValue('recepient')}
          addressNames={addressNames}
          errorMessage={formFieldErrors.recepient}
          selectedAddress={formFieldValues.recepient}
        />
        <DigitalAssetsSendFormAssetPicker
          onSelect={setFormFieldValue('assetAddress')}
          digitalAssets={digitalAssets}
          selectedAsset={formFieldValues.assetAddress}
        />
        <DoubleInput
          items={[{
            onChange: setFormFieldValue('amount'),
            value: formFieldValues.amount,
            placeholder: 'Value',
          }, {
            value: formFieldValues.amountFiat,
            placeholder: 'Value',
          }]}
          errorMessage={formFieldErrors.amount}
        />
        <DigitalAssetsSendFormPriorityPicker
          onSelect={setPriority}
          setFormFieldValue={setFormFieldValue}
          formFieldValues={formFieldValues}
          formFieldErrors={formFieldErrors}
          selectedPriority={priority}
        />
        <div className='split'>
          <div className='box'>
            <InputButton
              onChange={setFormFieldValue('comment')}
              value={formFieldValues.comment}
              errorMessage={formFieldErrors.comment}
              icon='plus'
              name='comment'
              label='Add comment'
              placeholder='Comment'
            />
          </div>
          <div className='box'>
            <InputButton
              onChange={setFormFieldValue('nonce')}
              value={formFieldValues.nonce}
              errorMessage={formFieldErrors.nonce}
              icon='plus'
              name='nonce'
              label='Show nonce'
              placeholder='Nonce'
            />
          </div>
        </div>
        <div className='actions'>
          <JRaisedButton
            onClick={submit}
            color='blue'
            label='Confirm'
            labelColor='white'
            isWide
          />
        </div>
      </form>
    </div>
  )
}

export default DigitalAssetsSendForm
