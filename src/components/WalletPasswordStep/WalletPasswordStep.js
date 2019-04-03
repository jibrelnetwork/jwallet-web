// @flow

import React, {
  Fragment,
  PureComponent,
} from 'react'

import { t } from 'ttag'

import { JInput } from 'components/base'

import {
  WalletStep,
  PasswordField,
} from 'components'

type Props = {|
  +onSubmit: Function,
  +onChangePassword: Function,
  onChangePasswordHint?: Function,
  onChangePasswordConfirm?: Function,
  +title: ?string[],
  +invalidFields: FormFields,
  +buttonLabel: string,
  +valuePassword: string,
  valuePasswordHint?: string,
  valuePasswordConfirm?: string,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

class WalletPasswordStep extends PureComponent<Props> {
  static defaultProps = {
    onChangePasswordHint: () => {},
    onChangePasswordConfirm: () => {},
    title: null,
    valuePasswordHint: '',
    valuePasswordConfirm: '',
  }

  render() {
    const {
      onSubmit,
      onChangePassword,
      onChangePasswordHint,
      onChangePasswordConfirm,
      title,
      invalidFields,
      buttonLabel,
      valuePassword,
      valuePasswordHint,
      valuePasswordConfirm,
      isLoading,
      isPasswordExists,
    } = this.props

    return (
      <WalletStep
        onSubmit={onSubmit}
        title={isPasswordExists ? null : title}
        buttonLabel={buttonLabel}
        isLoading={isLoading}
      >
        {isPasswordExists ? (
          <JInput
            onChange={onChangePassword}
            value={valuePassword}
            errorMessage={invalidFields.password}
            color='white'
            name='password'
            type='password'
            placeholder={t`Payment password`}
            isDisabled={isLoading}
            isAutoFocus
          />
        ) : (
          <Fragment>
            <PasswordField
              onChange={onChangePassword}
              onChangeConfirm={onChangePasswordConfirm}
              invalidFields={invalidFields}
              value={valuePassword}
              valueConfirm={valuePasswordConfirm}
              placeholder={t`Payment password`}
              placeholderConfirm={t`Confirm payment password`}
              isDisabled={isLoading}
              isAutoFocus
            />
            <JInput
              onChange={onChangePasswordHint}
              value={valuePasswordHint}
              errorMessage={invalidFields.passwordHint}
              color='white'
              name='password-hint'
              placeholder={t`Password hint`}
              isDisabled={isLoading}
            />
          </Fragment>
        )}
      </WalletStep>
    )
  }
}

export default WalletPasswordStep
