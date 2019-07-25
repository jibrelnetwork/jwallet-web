// @flow strict

import { i18n } from 'i18n/lingui'
import { connect } from 'react-redux'

import { setNewPassword } from 'store/modules/password'

import {
  getNonce,
  generateSalt,
  encryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

import {
  SetPasswordView,
  type Props,
} from './SetPasswordView'

async function submitSetPasswordForm(
  values: FormFields,
  dispatch: Function,
): Promise<void> {
  const {
    password,
    passwordHint,
  }: FormFields = values

  if (!password) {
    return
  }

  const salt: string = generateSalt()

  const derivedKey: Uint8Array = await deriveKeyFromPassword(
    password,
    salt,
  )

  const internalKeyEnc: EncryptedData = encryptInternalKey(
    getNonce(),
    derivedKey,
  )

  dispatch(setNewPassword({
    salt,
    internalKey: internalKeyEnc,
    hint: passwordHint || '',
  }))
}

function validateSetPasswordForm({
  password,
  passwordHint,
  passwordConfirm,
}: FormFields): ?FormFields {
  if (password !== passwordConfirm) {
    return {
      passwordConfirm: i18n._(
        'SetPassword.errors.passwordsNotMatch',
        null,
        { defaults: 'Password does not match confirmation' },
      ),
    }
  }

  if (!passwordHint) {
    return {
      passwordHint: i18n._(
        'SetPassword.errors.hintRequired',
        null,
        { defaults: 'Password hint is required' },
      ),
    }
  }

  if (password === passwordHint) {
    return {
      passwordHint: i18n._(
        'SetPassword.errors.hintEqualsPassword',
        null,
        { defaults: 'Password and hint should not be equal' },
      ),
    }
  }

  return null
}

function mapStateToProps() {
  return {
    submit: submitSetPasswordForm,
    validate: validateSetPasswordForm,
  }
}

type OwnProps = {|
  dispatch?: Function,
|}

export const SetPassword = connect< Props, OwnProps, _, _, _, _ >(
  mapStateToProps,
)(SetPasswordView)
