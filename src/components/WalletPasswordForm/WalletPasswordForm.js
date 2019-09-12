// @flow strict

import React from 'react'
import { Field } from 'react-final-form'

import ofssetsStyle from 'styles/offsets.m.scss'
import { useI18n } from 'app/hooks'
import { Button } from 'components/base'
import { PasswordInput } from 'components'

import styles from './walletPasswordForm.m.scss'
import { Forgot } from './components/Forgot/Forgot'

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
      className={styles.core}
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
        isAutoFocus
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
      <Forgot />
    </form>
  )
}

WalletPasswordForm.defaultProps = {
  isSubmitting: false,
}
