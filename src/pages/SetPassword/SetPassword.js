// @flow strict

import { t } from 'ttag'
import { connect } from 'react-redux'

import { setNewPassword } from 'store/modules/password'

import {
  getNonce,
  generateSalt,
  encryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

import { SetPasswordView } from './SetPasswordView'

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

  const derivedKey: Uint8Array = await deriveKeyFromPassword(
    password,
    generateSalt(),
  )

  const internalKeyEnc: EncryptedData = encryptInternalKey(
    getNonce(),
    derivedKey,
  )

  dispatch(setNewPassword(
    internalKeyEnc,
    passwordHint || '',
  ))
}

function validateSetPasswordForm({
  password,
  passwordHint,
  passwordConfirm,
}: FormFields): ?FormFields {
  if (password !== passwordConfirm) {
    return {
      passwordConfirm: t`Password does not match confirmation`,
    }
  }

  if (!passwordHint) {
    return {
      passwordHint: t`Password hint is required`,
    }
  }

  if (password === passwordHint) {
    return {
      passwordHint: t`Password and hint should not be equal`,
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

/* ::
type OwnProps = {|
  dispatch?: Function,
|}
*/

export const SetPassword = connect/* :: < AppState, null, OwnProps, _, _ > */(
  mapStateToProps,
)(SetPasswordView)
