// @flow

import React, { Component } from 'react'

import {
  ModalHeader,
  WalletNameStep,
  WalletPasswordStep,
} from 'components'

import { STEPS } from './modules/walletsCreate'

type Props = {|
  +openView: Function,
  +closeView: Function,
  +goToNextStep: Function,
  +goToPrevStep: Function,
  +changeNameInput: Function,
  +changePasswordInput: Function,
  +changePasswordHintInput: Function,
  +changePasswordConfirmInput: Function,
  +invalidFields: FormFields,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +currentStep: number,
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
