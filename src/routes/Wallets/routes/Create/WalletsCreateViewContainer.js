// @flow

import { connect } from 'react-redux'

import {
  selectWallets,
  selectWalletsCreate,
} from 'store/selectors/wallets'

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
} from './modules/walletsCreate'

import WalletsCreateView from './WalletsCreateView'

type StateProps = {|
  +invalidFields: FormFields,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +currentStep: WalletsCreateStepIndex,
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

  const { currentStep }: WalletsCreateState = selectWalletsCreate(state)

  return {
    name,
    password,
    isLoading,
    currentStep,
    passwordHint,
    invalidFields,
    passwordConfirm,
    isPasswordExists: !!internalKey,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  changeNameInput,
  changePasswordInput,
  changePasswordHintInput,
  changePasswordConfirmInput,
}

export default (
  connect/* :: < AppState, any, OwnPropsEmpty, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsCreateView)
