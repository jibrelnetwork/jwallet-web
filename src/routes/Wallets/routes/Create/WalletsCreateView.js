// @flow

import React, { Component } from 'react'

import {
  ModalHeader,
  WalletNameStep,
  WalletPasswordStep,
} from 'components'

import { STEPS } from './modules/walletsCreate'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +goToNextStep: () => void,
  +goToPrevStep: () => void,
  +changeNameInput: (string) => void,
  +changePasswordInput: (string) => void,
  +changePasswordHintInput: (string) => void,
  +changePasswordConfirmInput: (string) => void,
  +invalidFields: FormFields,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +currentStep: WalletsCreateStepIndex,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

class WalletsCreateView extends Component<Props> {
  componentDidMount() {
    this.props.openView()
  }

  componentWillUnmount() {
    this.props.closeView()
  }

  render() {
    const {
      goToNextStep,
      goToPrevStep,
      changeNameInput,
      changePasswordInput,
      changePasswordHintInput,
      changePasswordConfirmInput,
      invalidFields,
      name,
      password,
      passwordHint,
      passwordConfirm,
      currentStep,
      isLoading,
      isPasswordExists,
    } = this.props

    return (
      <div className='wallets-create-view'>
        <ModalHeader
          onBack={goToPrevStep}
          color='white'
          location='/wallets'
          title='Create wallet'
        />
        <div className='content'>
          {(currentStep === STEPS.NAME) && (
            <WalletNameStep
              onSubmit={goToNextStep}
              onChangeName={changeNameInput}
              invalidFields={invalidFields}
              valueName={name}
              isLoading={isLoading}
            />
          )}
          {(currentStep === STEPS.PASSWORD) && (
            <WalletPasswordStep
              onSubmit={goToNextStep}
              onChangePassword={changePasswordInput}
              onChangePasswordHint={changePasswordHintInput}
              onChangePasswordConfirm={changePasswordConfirmInput}
              invalidFields={invalidFields}
              valuePassword={password}
              valuePasswordHint={passwordHint}
              valuePasswordConfirm={passwordConfirm}
              title={[
                'You will use this password to unlock and transfer your funds.',
                'Keep it secure!',
              ]}
              isLoading={isLoading}
              isPasswordExists={isPasswordExists}
            />
          )}
        </div>
      </div>
    )
  }
}

export default WalletsCreateView
