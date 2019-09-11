// @flow

import React from 'react'

import { useI18n } from 'app/hooks'

import {
  JInput,
  Button,
} from 'components/base'

import styles from './digitalAssetAddForm.m.scss'

type Props = {|
  +submit: () => void,
  +setField: SetFieldFunction<EditAssetFormFields>,
  +formFields: EditAssetFormFields,
  +invalidFields: EditAssetFormFields,
  +submitLabel: string,
  +isAddressLoading: boolean,
  +isAddressEditable: boolean,
|}

export function DigitalAssetAddForm({
  formFields,
  invalidFields,
  setField,
  submit,
  isAddressLoading,
  isAddressEditable,
  submitLabel,
}: Props) {
  const i18n = useI18n()

  const setFieldHandler = (fieldName: $Keys<EditAssetFormFields>) =>
    (value: string) => setField(fieldName, value)

  const fields: Array<{
    key: $Keys<EditAssetFormFields>,
    placeholder: string,
    isDisabled: boolean,
    isLoading: boolean,
  }> = [{
    key: 'address',
    placeholder: i18n._(
      'AssetItemEdit.addressLabel',
      null,
      { defaults: 'Address (ERC-20)' },
    ),
    isDisabled: !isAddressEditable,
    isLoading: isAddressLoading,
  }, {
    key: 'name',
    placeholder: i18n._(
      'AssetItemEdit.nameLabel',
      null,
      { defaults: 'Name' },
    ),
    isDisabled: false,
    isLoading: false,
  }, {
    key: 'symbol',
    placeholder: i18n._(
      'AssetItemEdit.symbolLabel',
      null,
      { defaults: 'Symbol' },
    ),
    isDisabled: false,
    isLoading: false,
  }, {
    key: 'decimals',
    placeholder: i18n._(
      'AssetItemEdit.decimalsLabel',
      null,
      { defaults: 'Decimals' },
    ),
    isDisabled: false,
    isLoading: false,
  }]

  return (
    <div className={styles.core}>
      <div className={styles.form}>
        {fields.map(({
          key,
          placeholder,
          isDisabled,
          isLoading,
        }) => (
          <JInput
            key={key}
            onChange={setFieldHandler(key)}
            value={formFields[key]}
            name={`custom-asset-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={placeholder}
            type='text'
            color='gray'
            isDisabled={isDisabled}
            isLoading={isLoading}
          />
        ))}
        <div className='actions'>
          <Button onClick={submit}>{submitLabel}</Button>
        </div>
      </div>
    </div>
  )
}

DigitalAssetAddForm.defaultProps = {
  isAddressLoading: false,
  isAddressEditable: true,
}
