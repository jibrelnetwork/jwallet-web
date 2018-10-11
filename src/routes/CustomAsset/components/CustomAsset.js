// @flow

import React from 'react'

import { JInput, JRaisedButton } from '../../../components/base'
import { ModalHeader } from '../../../components'

type CustomAssetFormType = 'add' | 'edit'

type CustomAssetProps = {
  formFields: CustomAssetFormFields,
  invalidFields: CustomAssetFormFields,
  setField: SetFieldFunction<CustomAssetFormFields>,
  submit: () => void,

  // optional
  isAssetLoading: boolean,
  type: CustomAssetFormType,
}

const CustomAsset = ({
  formFields,
  invalidFields,
  submit,
  setField,
  isAssetLoading,
  type,
}: CustomAssetProps) => {
  const setFieldHandler = (fieldName: $Keys<CustomAssetFormFields>) =>
    (value: string) => setField(fieldName, value)

  const isAddressFieldDisabled = (type === 'edit')
  const i18nKey = (type === 'add') ? 'addCustomAsset' : 'editCustomAsset'

  const fields: Array<{
    key: $Keys<CustomAssetFormFields>,
    isDisabled: boolean,
    isLoading: boolean,
  }> = [
    { key: 'address', isDisabled: isAddressFieldDisabled, isLoading: isAssetLoading },
    { key: 'name', isDisabled: false, isLoading: false },
    { key: 'symbol', isDisabled: false, isLoading: false },
    { key: 'decimals', isDisabled: false, isLoading: false },
  ]

  return (
    <div className='custom-asset'>
      <div className='header'>
        <ModalHeader
          title={`routes.${i18nKey}.title`}
          color='gray'
          withMenu
        />
      </div>
      <div className='form'>
        {fields.map(({ key, isDisabled, isLoading }) => (
          <JInput
            key={key}
            onChange={setFieldHandler(key)}
            value={formFields[key]}
            name={`custom-asset-${key}`}
            errorMessage={invalidFields[key]}
            placeholder={`routes.${i18nKey}.placeholder.${key}`}
            type='text'
            color='gray'
            isDisabled={isDisabled}
            isLoading={isLoading}
          />
        ))}
        <div className='actions'>
          <div className='confirm'>
            <JRaisedButton
              onClick={submit}
              label={`routes.${i18nKey}.buttonTitle`}
              color='blue'
              labelColor='white'
              isWide
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CustomAsset.defaultProps = {
  type: 'add',
  isAssetLoading: false,
}

export default CustomAsset
