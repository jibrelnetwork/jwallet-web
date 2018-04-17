// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import { JButton, JFlatButton } from 'components/base'

const PasswordStep = ({
  setPassword,
  setPasswordConfirm,
  setPrevStep,
  setNextStep,
  invalidFields,
  password,
  passwordConfirm,
  color,
  buttonPrevText,
  buttonNextText,
}: Props) => (
  <div className='form'>
    <PasswordField
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      password={password}
      passwordConfirm={passwordConfirm}
      passwordError={invalidFields.password}
      passwordConfirmError={invalidFields.passwordConfirm}
      color={(color !== 'white') ? 'white' : 'gray'}
      withConfirm={!!setPasswordConfirm}
    />
    <div className='actions'>
      {setPrevStep && (
        <JFlatButton
          onClick={setPrevStep}
          text={buttonPrevText}
          iconName='arrow'
          transparent
        />
      )}
      <div className='next'>
        <JButton onClick={setNextStep} text={buttonNextText} color={color} wide />
      </div>
    </div>
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setNextStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
  setPasswordConfirm?: (passwordConfirm: Password) => Dispatch,
  setPrevStep?: () => Dispatch,
  color?: string,
  buttonPrevText?: string,
  buttonNextText?: string,
  passwordConfirm?: Password,
}

PasswordStep.defaultProps = {
  setPasswordConfirm: undefined,
  setPrevStep: undefined,
  color: 'white',
  buttonPrevText: 'Previous step',
  buttonNextText: 'Confirm',
  passwordConfirm: '',
}

export default PasswordStep
