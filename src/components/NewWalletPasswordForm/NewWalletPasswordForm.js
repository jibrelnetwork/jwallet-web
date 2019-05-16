// @flow strict

import React from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import { PasswordInput } from 'components'
import { JRaisedButton } from 'components/base'

import newWalletPasswordFormStyle from './newWalletPasswordForm.m.scss'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?Object>,
  +values: FormFields,
  +hint: string,
  +isSubmitting: boolean,
|}

export function NewWalletPasswordForm({
  handleSubmit,
  values,
  hint,
  isSubmitting,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit}
      className={newWalletPasswordFormStyle.form}
    >
      <Field
        component={PasswordInput}
        value={values.password}
        label={t`Security Password`}
        infoMessage={`${t`Hint`}: ${hint}`}
        theme='white-icon'
        name='password'
        isDisabled={isSubmitting}
      />
      <JRaisedButton
        type='submit'
        isLoading={isSubmitting}
      >
        {t`Import`}
      </JRaisedButton>
    </form>
  )
}

NewWalletPasswordForm.defaultProps = {
  isSubmitting: false,
}
