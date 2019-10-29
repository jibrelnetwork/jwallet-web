// @flow strict

import React from 'react'
import { Field } from 'react-final-form'
import { type I18n } from '@lingui/core'

import ofssetsStyle from 'styles/offsets.m.scss'
import { useI18n } from 'app/hooks'
import { Button } from 'components/base'
import { PasswordInput } from 'components'

import styles from './passwordForm.m.scss'
import { Forgot } from './components/Forgot/Forgot'

type Props = {|
  +handleSubmit: (?SyntheticEvent<HTMLFormElement>) => ?Promise<?Object>,
  +values: FormFields,
  +hint: string,
  +description: ?string,
  +isSubmitting: boolean,
|}

export function PasswordForm({
  handleSubmit,
  values: {
    password,
  } = {},
  hint,
  description,
  isSubmitting,
}: Props) {
  const i18n: I18n = useI18n()

  return (
    <div className={styles.core}>
      {description && (
        <div className={styles.description}>
          {description}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className={styles.form}
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
      </form>
      <Forgot />
    </div>
  )
}

PasswordForm.defaultProps = {
  description: null,
  isSubmitting: false,
}
