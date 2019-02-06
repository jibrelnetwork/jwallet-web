// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

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

    const passwordStepTitle: Array<string> =
      (t`You will use this password to unlock and transfer your funds.
        Keep it secure!`).split('\n')

    return (
      <div className='wallets-view -create'>
        <ModalHeader
          onBack={goToPrevStep}
          color='white'
          title={t`Create wallet`}
          isDisabled={isLoading}
        />
        <div className='content'>
          {(currentStep === STEPS.NAME) && (
            <WalletNameStep
              onSubmit={goToNextStep}
              onChangeName={changeNameInput}
              invalidFields={invalidFields}
              valueName={name}
              buttonLabel={t`Next step`}
              fieldName={t`wallets-name`}
              placeholder={t`Wallet name`}
              isLoading={isLoading}
            />
          )}
          {(currentStep === STEPS.PASSWORD) && (
            <WalletPasswordStep
              onSubmit={goToNextStep}
              onChangePassword={changePasswordInput}
              onChangePasswordHint={changePasswordHintInput}
              onChangePasswordConfirm={changePasswordConfirmInput}
              title={passwordStepTitle}
              invalidFields={invalidFields}
              valuePassword={password}
              valuePasswordHint={passwordHint}
              valuePasswordConfirm={passwordConfirm}
              buttonLabel={t`Create wallet`}
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
