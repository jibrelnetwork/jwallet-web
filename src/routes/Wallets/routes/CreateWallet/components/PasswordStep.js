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
}: Props) => (
  <div className='form'>
    <PasswordField
      onPasswordChange={setPassword}
      onPasswordConfirmChange={setPasswordConfirm}
      password={password}
      passwordConfirm={passwordConfirm}
      passwordError={invalidFields.password}
      passwordConfirmError={invalidFields.passwordConfirm}
      withConfirm
    />
    <div className='actions'>
      <JButton
        onClick={setPrevStep}
        text={i18n('routes.createWallet.buttonTitle.prevStep')}
        iconName='arrow-back'
        iconSize='small'
        trasparent
      />
      <JButton
        onClick={setNextStep}
        text={i18n('routes.createWallet.buttonTitle.finish')}
        color='blue'
        large
        right
      />
    </div>
  </div>
)

type Props = {
  setPassword: (password: Password) => Dispatch,
  setPasswordConfirm: (passwordConfirm: Password) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  invalidFields: Object,
  password: Password,
  passwordConfirm: Password,
}

export default PasswordStep
