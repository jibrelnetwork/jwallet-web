// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'

import {
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
        <JInput
          onChange={setFormFieldValue('comment')}
          value={formFieldValues.comment}
          errorMessage={formFieldErrors.comment}
          color='gray'
          name='comment'
          placeholder='Comment'
        />
        <JInput
          onChange={setFormFieldValue('nonce')}
          value={formFieldValues.nonce}
          errorMessage={formFieldErrors.nonce}
          type='text'
          name='nonce'
          color='gray'
          placeholder='Nonce'
        />
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
