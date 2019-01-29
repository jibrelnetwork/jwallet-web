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
  JText,
  JInput,
  JRaisedButton,
} from 'components/base'

import DigitalAssetsSendFormAssetPicker from './AssetPicker'
import DigitalAssetsSendFormPriorityPicker from './PriorityPicker'

type Props = {|
  +submit: () => void,
  +setPriority: (priority: TXPriorityKey) => void,
  +setFormFieldValue: (fieldName: $Keys<DigitalAssetsSendFormFields>) => (value: string) => void,
  +setNonceEditable: (isEditable: boolean) => void,
  +digitalAssets: DigitalAssetWithBalance[],
  +addressNames: AddressNames,
  +formFieldValues: DigitalAssetsSendFormFields,
  +formFieldErrors: DigitalAssetsSendFormFields,
  +formFieldWarnings: DigitalAssetsSendFormFields,
  +formError: string,
  +ownerAddress: OwnerAddress,
  +priority: TXPriorityKey,
  +isLoading: boolean,
|}

function DigitalAssetsSendForm({
  submit,
  setPriority,
  setNonceEditable,
  setFormFieldValue,
  digitalAssets,
  addressNames,
  formFieldValues,
  formFieldErrors,
  formFieldWarnings,
  formError,
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
              onActivate={setNonceEditable}
              icon='plus'
              name='nonce'
              label='Show nonce'
              placeholder='Nonce'
            />
          </div>
        </div>
        {formError &&
          <div className='error'>
            <JText value={formError} color='red' whiteSpace='wrap' />
          </div>}
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
      <div className='message'>
        <JText
          value='The app doesn’t charge you any fees.
          But you have to pay the blockchain fee to create a new transaction.'
          color='gray'
          whiteSpace='wrap'
          align='center'
        />
      </div>
    </div>
  )
}

export default DigitalAssetsSendForm
