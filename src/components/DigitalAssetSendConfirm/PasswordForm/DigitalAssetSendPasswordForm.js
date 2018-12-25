// @flow

import React from 'react'

import { JInput, JRaisedButton } from 'components/base'

type SetFieldFunction = (fieldName: $Keys<DigitalAssetSendFormFields>, value: string) => void

const setFieldHandler = (
  fieldName: $Keys<DigitalAssetSendFormFields>,
  setField: SetFieldFunction
) => (value: string) => setField(fieldName, value)

export type Props = {|
  +submit: () => void,
  +isLoading: boolean,
  +setField: SetFieldFunction,
  +formFields: DigitalAssetSendFormFields,
  +invalidFields: DigitalAssetSendFormFields,
|}

const DigitalAssetSendPasswordForm = ({
  submit,
  isLoading,
  setField,
  formFields,
  invalidFields,
}: Props) => (
  <div className='digital-asset-send-password-form'>
    <div className='form'>
      <JInput
        type='password'
        onChange={setFieldHandler('password', setField)}
        value={formFields.password}
        name='password'
        errorMessage={invalidFields.password}
        placeholder='Security password'
        color='gray'
        isDisabled={isLoading}
      />
      <div className='actions'>
        <JRaisedButton
          onClick={submit}
          isLoading={isLoading}
          label='Send asset'
          isWide
        />
      </div>
    </div>
  </div>
)

export default DigitalAssetSendPasswordForm
