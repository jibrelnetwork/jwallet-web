// @flow strict

import React from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import { PasswordInput } from 'components'
import { Button } from 'components/base'

import walletPasswordFormStyle from './walletPasswordForm.m.scss'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?Object>,
  +values: FormFields,
  +hint: string,
  +isSubmitting: boolean,
|}

export function WalletPasswordForm({
  handleSubmit,
  values,
  hint,
  isSubmitting,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit}
      className={walletPasswordFormStyle.form}
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
      <Button
        type='submit'
        isLoading={isSubmitting}
      >
        {t`Import`}
      </Button>
    </form>
  )
}

WalletPasswordForm.defaultProps = {
  isSubmitting: false,
}
