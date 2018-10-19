// @flow

import React, { Fragment, PureComponent } from 'react'

import PasswordField from 'components/PasswordField'
import ignoreEvent from 'utils/eventHandlers/ignoreEvent'
import { JInput, JRaisedButton, JText } from 'components/base'

type Props = {|
  +onSubmit: Function,
  +onChangePassword: Function,
  onChangePasswordHint?: Function,
  onChangePasswordConfirm?: Function,
  +title: ?Array<string>,
  +invalidFields: FormFields,
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
      valuePassword,
      valuePasswordHint,
      valuePasswordConfirm,
      isLoading,
      isPasswordExists,
    } = this.props

    return (
      <div className='wallet-password-step'>
        {!isPasswordExists && !!title && (
          <div className='information'>
            {title.map((line: string) => (
              <div className='string' key={line}>
                <JText size='large' color='white' value={line} whiteSpace='wrap' align='center' />
              </div>
            ))}
          </div>
        )}
        <form className='form' onSubmit={ignoreEvent(onSubmit)()}>
          {isPasswordExists ? (
            <JInput
              onChange={onChangePassword}
              value={valuePassword}
              errorMessage={invalidFields.password}
              color='white'
              name='password'
              type='password'
              placeholder='Password'
            />
          ) : (
            <Fragment>
              <PasswordField
                onChange={onChangePassword}
                onChangeConfirm={onChangePasswordConfirm}
                invalidFields={invalidFields}
                value={valuePassword}
                valueConfirm={valuePasswordConfirm}
                placeholder='Password'
                placeholderConfirm='Confirm password'
              />
              <JInput
                onChange={onChangePasswordHint}
                value={valuePasswordHint}
                errorMessage={invalidFields.passwordHint}
                color='white'
                placeholder='Password hint'
                name='wallet-password-hint'
              />
            </Fragment>
          )}
          <div className='actions'>
            <JRaisedButton
              onClick={onSubmit}
              color='white'
              labelColor='blue'
              loaderColor='white'
              label='Create wallet'
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default WalletPasswordStep
