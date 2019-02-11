// @flow

import React from 'react'
import { t } from 'ttag'

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
  +ownerAddress: OwnerAddress,
  +priority: TXPriorityKey,
  +isLoading: boolean,
  +fiatCurrency: FiatCurrency,
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
  ownerAddress,
  priority,
  isLoading,
  fiatCurrency,
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

  const selectedAssetSymbol: string = selectedAsset ? selectedAsset.symbol : ''
  const hasManyRecipientAddresses: boolean = Object.keys(addressNames).length > 0

  return (
    <div className='digital-assets-send-form'>
      <form className='form' onSubmit={ignoreEvent(isLoading ? null : submit)()}>
        <JInput
          value={ownerAddress}
          color='gray'
          name='owner-address'
          label={t`Current address`}
          isDisabled
        />
        {hasManyRecipientAddresses ? (<AddressPicker
          onSelect={setFormFieldValue('recipient')}
          addressNames={addressNames}
          selectedAddress={recipient}
          infoMessage={formFieldWarnings.recipient}
          errorMessage={formFieldErrors.recipient}
        />) : (<JInput
          onChange={setFormFieldValue('recipient')}
          value={recipient}
          color='gray'
          name='owner-address'
          placeholder={t`Recipient address`}
        />)}
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
            placeholder: t`Value ${selectedAssetSymbol}`,
          }, {
            value: amountFiat,
            placeholder: t`Value ${fiatCurrency}`,
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
              label={t`Add comment`}
              placeholder={t`Comment`}
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
              label={t`Show nonce`}
              placeholder={t`Nonce`}
            />
          </div>
        </div>
        <div className='actions'>
          <JRaisedButton
            onClick={submit}
            color='blue'
            label={t`Confirm`}
            labelColor='white'
            isWide
          />
        </div>
      </form>
      <div className='message'>
        <JText
          // eslint-disable-next-line max-len
          value={t`The app doesn’t charge you any fees. But you have to pay the blockchain fee to create a new transaction.`}
          color='gray'
          whiteSpace='wrap'
          align='center'
        />
      </div>
    </div>
  )
}

export default DigitalAssetsSendForm
