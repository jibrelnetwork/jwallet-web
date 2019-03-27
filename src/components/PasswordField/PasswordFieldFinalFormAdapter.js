// @flow

import React from 'react'
import PasswordField from 'components/PasswordField'

type Props = {
  onChange: (name: string, value: mixed) => void,
  errorMessages: PaymentPasswordForm,
  isLoading: ?boolean,
  values: ?Object,
}

const text = {
  passwordNew: 'New payment password',
  passwordNewConfirm: 'Repeat payment password',
}

const handlerChange = name => f => value => f(name, value)

function PasswordFieldFinalFormAdapter({
  onChange,
  values,
  errorMessages,
  isLoading,
}: Props) {
  const invalidFields = {
    password: errorMessages.passwordNew,
    passwordConfirm: errorMessages.passwordNewConfirm,
  }

  return (
    <PasswordField
      onChange={handlerChange('passwordNew')(onChange)}
      onChangeConfirm={handlerChange('passwordNewConfirm')(onChange)}
      invalidFields={invalidFields}
      value={values ? values.passwordNew : ''}
      placeholder={text.passwordNew}
      valueConfirm={values ? values.passwordNewConfirm : ''}
      placeholderConfirm={text.passwordNewConfirm}
      isDisabled={Boolean(isLoading)}
      isAutoFocus={false}
      color='gray'
    />
  )
}

export default PasswordFieldFinalFormAdapter
