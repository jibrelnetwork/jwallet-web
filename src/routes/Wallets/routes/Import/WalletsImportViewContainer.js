// @flow

import { connect } from 'react-redux'

import {
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
  +walletType: WalletCustomType,
  +currentStep: WalletsImportStepIndex,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

const mapStateToProps = ({ wallets, walletsImport }: State): StateProps => ({
  ...walletsImport,
  isPasswordExists: !!wallets.testPasswordData,
})

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
