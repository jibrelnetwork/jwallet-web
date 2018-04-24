// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import { JFlatButton, JRaisedButton } from 'components/base'

const PasswordStep = ({
  setPassword,
  setPrevStep,
  setNextStep,
  setPasswordConfirm,
  invalidFields,
  password,
  inputColor,
  labelColor,
  buttonColor,
  loaderColor,
  passwordConfirm,
  buttonPrevLabel,
  buttonNextLabel,
  isLoading,
}: Props) => (
  <div className='form'>
    <PasswordField
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      color={inputColor}
      password={password}
      passwordConfirm={passwordConfirm}
      passwordError={invalidFields.password}
      passwordConfirmError={invalidFields.passwordConfirm}
      withConfirm={!!setPasswordConfirm}
    />
    <div className='actions'>
      {setPrevStep && (
        <JFlatButton
          onClick={setPrevStep}
          label={buttonPrevLabel}
          iconSize='small'
          iconName='arrow'
          iconColor='white'
          isTransparent
        />
      )}
      <div className='next'>
        <JRaisedButton
          onClick={setNextStep}
          color={buttonColor}
          label={buttonNextLabel}
          labelColor={labelColor}
          loaderColor={loaderColor}
          isLoading={isLoading}
          isWide
        />
      </div>
    </div>
  </div>
)

type Props = {
  setPassword: Function,
  setNextStep: Function,
  setPrevStep: ?Function,
  setPasswordConfirm: ?Function,
  invalidFields: FormFields,
  inputColor: 'gray' | 'white',
  labelColor: 'blue' | 'white',
  buttonColor: 'blue' | 'white',
  loaderColor: 'blue' | 'white',
  password: string,
  buttonPrevLabel: string,
  buttonNextLabel: string,
  passwordConfirm: string,
  isLoading: boolean,
}

PasswordStep.defaultProps = {
  setPrevStep: null,
  setPasswordConfirm: null,
  inputColor: 'white',
  labelColor: 'white',
  buttonColor: 'white',
  loaderColor: 'white',
  buttonNextLabel: 'Confirm',
  buttonPrevLabel: 'Previous step',
  isLoading: false,
}

export default PasswordStep
