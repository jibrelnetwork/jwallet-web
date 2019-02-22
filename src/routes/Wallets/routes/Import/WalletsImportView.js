// @flow

import React, { Component } from 'react'
import { t } from 'ttag'

import {
  ModalHeader,
  WalletDataStep,
  WalletNameStep,
  WalletPasswordStep,
} from 'components'

import { STEPS } from 'store/modules/walletsImport'

type Props = {|
  +openView: () => void,
  +closeView: () => void,
  +goToNextStep: () => void,
  +goToPrevStep: () => void,
  +changeDataInput: (string) => void,
  +changeNameInput: (string) => void,
  +changePasswordInput: (string) => void,
  +changePasswordHintInput: (string) => void,
  +changeDerivationPathInput: (string) => void,
  +changePasswordConfirmInput: (string) => void,
  +invalidFields: FormFields,
  +data: string,
  +name: string,
  +password: string,
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
      changePasswordHintInput,
      changeDerivationPathInput,
      changePasswordConfirmInput,
      invalidFields,
      data,
      name,
      password,
      walletType,
      passwordHint,
      derivationPath,
      passwordConfirm,
      currentStep,
      isLoading,
      isPasswordExists,
    } = this.props

    const passwordStepTitle: Array<string> =
     (t`You will use this password to unlock and transfer your funds.
      Keep it secure!`).split('\n')

    const dataStepTitle: Array<string> =
     (t`Insert the private key or backup phrase to import. Also, you can import
      an address in the read-only mode.`).split('\n')

    return (
      <div className='wallets-view -import'>
        <ModalHeader
          onBack={goToPrevStep}
          color='white'
          title={t`Import wallet`}
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
              fieldName='wallets-name'
              placeholder={t`Wallet name`}
              isLoading={isLoading}
            />
          )}
          {(currentStep === STEPS.DATA) && (
            <WalletDataStep
              onSubmit={goToNextStep}
              onChangeData={changeDataInput}
              onChangeDerivationPath={changeDerivationPathInput}
              title={dataStepTitle}
              invalidFields={invalidFields}
              valueData={data}
              valueDerivationPath={derivationPath}
              buttonLabel={t`Next step`}
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
              title={passwordStepTitle}
              invalidFields={invalidFields}
              valuePassword={password}
              valuePasswordHint={passwordHint}
              valuePasswordConfirm={passwordConfirm}
              buttonLabel={t`Import wallet`}
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
