// @flow strict

import React from 'react'
import { useI18n } from 'app/hooks'
import { Field } from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import buttonStyle from 'components/base/Button/button.m.scss'
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
  const i18n = useI18n()

  return (
    <form
      onSubmit={handleSubmit}
      className={walletPasswordFormStyle.core}
    >
      <Field
        component={PasswordInput}
        value={password}
        label={i18n._(
          'WalletPasswordForm.password',
          null,
          { defaults: 'Security Password' },
        )}
        infoMessage={i18n._(
          'WalletPasswordForm.hint',
          { hint },
          { defaults: 'Hint: {hint}' },
        )}
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
        {i18n._(
          'WalletPasswordForm.submit',
          null,
          { defaults: 'Continue' },
        )}
      </Button>
      <JLink
        className={`${buttonStyle.additional} ${walletPasswordFormStyle.forgot}`}
        color='blue'
        href='/forgot-password'
      >
        {i18n._(
          'WalletPasswordForm.forgot',
          null,
          { defaults: 'Forgot?' },
        )}
      </JLink>
    </form>
  )
}

WalletPasswordForm.defaultProps = {
  isSubmitting: false,
}
