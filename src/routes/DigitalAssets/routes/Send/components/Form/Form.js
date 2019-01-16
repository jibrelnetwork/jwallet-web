// @flow

import React from 'react'

import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import getDigitalAssetByAddress from 'utils/digitalAssets/getDigitalAssetByAddress'

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
  +formFieldWarnings: DigitalAssetsSendFormFieldWarnings,
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
  formFieldWarnings,
  ownerAddress,
  priority,
  isLoading,
}: Props) {
  const {
    nonce,
    amount,
    comment,
    recipient,
    amountFiat,
    assetAddress,
  }: DigitalAssetsSendFormFields = formFieldValues

  const selectedAsset: ?DigitalAssetWithBalance =
    getDigitalAssetByAddress/* :: <DigitalAssetWithBalance> */(digitalAssets, assetAddress)

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
          onSelect={setFormFieldValue('recipient')}
          addressNames={addressNames}
          selectedAddress={recipient}
          infoMessage={formFieldWarnings.recipient}
          errorMessage={formFieldErrors.recipient}
        />
        <DigitalAssetsSendFormAssetPicker
          onSelect={setFormFieldValue('assetAddress')}
          digitalAssets={digitalAssets}
          selectedAsset={assetAddress}
          errorMessage={formFieldErrors.assetAddress}
        />
        <DoubleInput
          items={[{
            onChange: setFormFieldValue('amount'),
            value: amount,
            placeholder: `Value ${selectedAsset ? selectedAsset.symbol : ''}`,
          }, {
            value: amountFiat,
            placeholder: 'Value USD',
            isDisabled: true,
          }]}
          errorMessage={formFieldErrors.amount}
        />
        <DigitalAssetsSendFormPriorityPicker
          onSelect={setPriority}
          setFormFieldValue={setFormFieldValue}
          formFieldValues={formFieldValues}
          formFieldErrors={formFieldErrors}
          formFieldWarnings={formFieldWarnings}
          selectedPriority={priority}
        />
        <div className='split'>
          <div className='box'>
            <InputButton
              onChange={setFormFieldValue('comment')}
              value={comment}
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
              value={nonce}
              errorMessage={formFieldErrors.nonce}
              infoMessage={formFieldWarnings.nonce}
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
