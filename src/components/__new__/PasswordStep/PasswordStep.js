// @flow

import React from 'react'

import PasswordField from 'components/PasswordField'
import JButton from 'components/base/__new__/JButton'

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
  <div className='password-step'>
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
          <JButton
            onClick={setPrevStep}
            text={buttonPrevText}
            color='white'
            iconSize='small'
            iconName='arrow-back'
            minimal
            transparent
          />
        )}
        <JButton
          onClick={setNextStep}
          text={buttonNextText}
          color={color}
          right={!!setPrevStep}
          large
        />
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
