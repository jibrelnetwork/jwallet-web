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

function mapStateToProps(state: AppState) {
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

  const {
    data,
    walletType,
    currentStep,
    derivationPath,
  }: WalletsImportState = walletsImport

  return {
    data,
    name,
    password,
    walletType,
    currentStep,
    passwordHint,
    derivationPath,
    passwordConfirm,
    isLoading,
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
