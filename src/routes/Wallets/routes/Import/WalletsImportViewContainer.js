// @flow

import { connect } from 'react-redux'

import {
  selectWallets,
  selectWalletsImport,
} from 'store/selectors/wallets'

import {
  changeNameInput,
  changePasswordInput,
  changePasswordHintInput,
  changePasswordConfirmInput,
} from 'store/modules/wallets'

import {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  changeDataInput,
  changeDerivationPathInput,
} from 'store/modules/walletsImport'

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

function mapStateToProps(state: AppState): StateProps {
  const {
    persist: {
      internalKey,
    },
    name,
    password,
    isLoading,
    passwordHint,
    invalidFields,
    passwordConfirm,
  }: WalletsState = selectWallets(state)

  const walletsImport: WalletsImportState = selectWalletsImport(state)

  return {
    ...walletsImport,
    name,
    password,
    isLoading,
    passwordHint,
    passwordConfirm,
    isPasswordExists: !!internalKey,
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
  changePasswordHintInput,
  changeDerivationPathInput,
  changePasswordConfirmInput,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsCreateView)
