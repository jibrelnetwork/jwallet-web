// @flow

import React, { Component } from 'react'

import {
  ModalHeader,
  WalletDataStep,
  WalletNameStep,
  WalletPasswordStep,
} from 'components'

import { STEPS } from './modules/walletsImport'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +goToNextStep: () => void,
  +goToPrevStep: () => void,
  +changeDataInput: (string) => void,
  +changeNameInput: (string) => void,
  +changePasswordInput: (string) => void,
  +changePassphraseInput: (string) => void,
  +changePasswordHintInput: (string) => void,
  +changeDerivationPathInput: (string) => void,
  +changePasswordConfirmInput: (string) => void,
  +invalidFields: FormFields,
  +data: string,
  +name: string,
  +password: string,
  +passphrase: string,
  +passwordHint: string,
  +derivationPath: string,
  +passwordConfirm: string,
  +walletType: WalletCustomType,
  +currentStep: WalletsImportStepIndex,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

class WalletsImportView extends Component<Props> {
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
      changeDataInput,
      changeNameInput,
      changePasswordInput,
      changePassphraseInput,
      changePasswordHintInput,
      changeDerivationPathInput,
      changePasswordConfirmInput,
      invalidFields,
      data,
      name,
      password,
      passphrase,
      walletType,
      passwordHint,
      derivationPath,
      passwordConfirm,
      currentStep,
      isLoading,
      isPasswordExists,
    } = this.props

    return (
      <div className='wallets-view -import'>
        <ModalHeader
          onBack={goToPrevStep}
          color='white'
          title='Import wallet'
          isDisabled={isLoading}
        />
        <div className='content'>
          {(currentStep === STEPS.NAME) && (
            <WalletNameStep
              onSubmit={goToNextStep}
              onChangeName={changeNameInput}
              invalidFields={invalidFields}
              valueName={name}
              buttonLabel='Next step'
              isLoading={isLoading}
            />
          )}
          {(currentStep === STEPS.DATA) && (
            <WalletDataStep
              onSubmit={goToNextStep}
              onChangeData={changeDataInput}
              onChangePassphrase={changePassphraseInput}
              onChangeDerivationPath={changeDerivationPathInput}
              title={[
                'Insert the private key or backup phrase to import. Also, you can import',
                'an address in the read-only mode.',
              ]}
              invalidFields={invalidFields}
              valueData={data}
              valuePassphrase={passphrase}
              valueDerivationPath={derivationPath}
              buttonLabel='Next step'
              isLoading={isLoading}
              isMnemonic={walletType === 'mnemonic'}
            />
          )}
          {(currentStep === STEPS.PASSWORD) && (
            <WalletPasswordStep
              onSubmit={goToNextStep}
              onChangePassword={changePasswordInput}
              onChangePasswordHint={changePasswordHintInput}
              onChangePasswordConfirm={changePasswordConfirmInput}
              title={[
                'You will use this password to unlock and transfer your funds.',
                'Keep it secure!',
              ]}
              invalidFields={invalidFields}
              valuePassword={password}
              valuePasswordHint={passwordHint}
              valuePasswordConfirm={passwordConfirm}
              buttonLabel='Import wallet'
              isLoading={isLoading}
              isPasswordExists={isPasswordExists}
            />
          )}
        </div>
      </div>
    )
  }
}

export default WalletsImportView
