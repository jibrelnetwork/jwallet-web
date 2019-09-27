// @flow strict

import React, { Component } from 'react'
import { connect } from 'react-redux'

import { StartLayout } from 'layouts'
import { NewPasswordForm } from 'components'
import { setNewPassword } from 'store/modules/password'

import {
  getNonce,
  generateSalt,
  encryptInternalKey,
  deriveKeyFromPassword,
} from 'utils/encryption'

type OwnProps = {|
  +dispatch?: Function,
|}

type Props = {|
  +dispatch: Function,
  +submit: (FormFields, Function) => Promise<void>,
|}

async function submitSetPasswordForm(
  values: FormFields,
  dispatch: Function,
): Promise<void> {
  const {
    passwordNew,
    passwordHint,
  }: FormFields = values

  if (!passwordNew) {
    return
  }

  const salt: string = generateSalt()

  const derivedKey: Uint8Array = await deriveKeyFromPassword(
    passwordNew,
    salt,
  )

  const internalKeyEnc: EncryptedData = encryptInternalKey(
    getNonce(),
    derivedKey,
  )

  dispatch(setNewPassword(
    internalKeyEnc,
    salt,
    passwordHint || '',
  ))
}

class SetPassword extends Component<Props> {
  handleSubmit = async (values: FormFields): Promise<void> => {
    const {
      submit,
      dispatch,
    }: Props = this.props

    await submit(values, dispatch)
  }

  render() {
    return (
      <StartLayout className='__new-password'>
        <NewPasswordForm onSubmit={this.handleSubmit} />
      </StartLayout>
    )
  }
}

function mapStateToProps() {
  return {
    submit: submitSetPasswordForm,
  }
}

const SetPasswordEnhanced = connect<Props, OwnProps, _, _, _, _>(mapStateToProps)(SetPassword)
export { SetPasswordEnhanced as SetPassword }
