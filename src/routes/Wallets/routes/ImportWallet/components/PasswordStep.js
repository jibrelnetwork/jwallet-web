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
        text={i18n('routes.importWallet.buttonTitle.prevStep')}
        iconName='arrow-back'
        iconSize='small'
        trasparent
      />
      <JButton
        onClick={setNextStep}
        text={i18n('routes.importWallet.buttonTitle.finish')}
        color='blue'
        large
        right
      />
    </div>
  </div>
)

type Props = {
  setPassword: (password: string) => Dispatch,
  setPasswordConfirm: (passwordConfirm: string) => Dispatch,
  setNextStep: () => Dispatch,
  setPrevStep: () => Dispatch,
  invalidFields: Object,
  password: string,
  passwordConfirm: string,
}

export default PasswordStep
