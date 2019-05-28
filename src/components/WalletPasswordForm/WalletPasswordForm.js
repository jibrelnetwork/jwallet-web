// @flow strict

import React from 'react'
import { t } from 'ttag'
import { Field } from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import { PasswordInput } from 'components'

import {
  JLink,
  Button,
} from 'components/base'

import walletPasswordFormStyle from './walletPasswordForm.m.scss'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?Object>,
  +values: FormFields,
  +hint: string,
  +isSubmitting: boolean,
|}

export function WalletPasswordForm({
  handleSubmit,
  values: {
    password,
  } = {},
  hint,
  isSubmitting,
}: Props) {
  return (
    <form
      onSubmit={handleSubmit}
      className={walletPasswordFormStyle.core}
    >
      <Field
        component={PasswordInput}
        value={password}
        label={t`Security Password`}
        infoMessage={`${t`Hint`}: ${hint}`}
        theme='white-icon'
        name='password'
        isDisabled={isSubmitting}
      />
      <Button
        className={ofssetsStyle.mt16}
        type='submit'
        isLoading={isSubmitting}
        isDisabled={!(password || '').trim()}
      >
        {t`Continue`}
      </Button>
      <JLink
        className={walletPasswordFormStyle.forgot}
        color='blue'
        href='/forgot-password'
      >
        {t`Forgot?`}
      </JLink>
    </form>
  )
}

WalletPasswordForm.defaultProps = {
  isSubmitting: false,
}
