// @flow

import { connect } from 'react-redux'

import {
  changeNameInput,
  changePasswordInput,
  changePasswordHintInput,
  changePasswordConfirmInput,
} from '../../modules/wallets'

import {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  changeDataInput,
  changePassphraseInput,
  changeDerivationPathInput,
} from './modules/walletsImport'

import WalletsCreateView from './WalletsImportView'

type StateProps = {|
  +invalidFields: FormFields,
  +data: string,
  +name: string,
  +password: string,
  +passphrase: string,
  +passwordHint: string,
  +derivationPath: string,
  +passwordConfirm: string,
  +walletType: ?WalletCustomType,
  +currentStep: WalletsImportStepIndex,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

function mapStateToProps({ wallets, walletsImport }: AppState): StateProps {
  const {
    persist: {
      testPasswordData,
    },
    name,
    password,
    isLoading,
    passwordHint,
    invalidFields,
    passwordConfirm,
  } = wallets

  return {
    ...walletsImport,
    name,
    password,
    isLoading,
    passwordHint,
    passwordConfirm,
    isPasswordExists: !!testPasswordData,
    invalidFields: {
      ...invalidFields,
      ...walletsImport.invalidFields,
    },
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  changeDataInput,
  changeNameInput,
  changePasswordInput,
  changePassphraseInput,
  changePasswordHintInput,
  changeDerivationPathInput,
  changePasswordConfirmInput,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsCreateView)
