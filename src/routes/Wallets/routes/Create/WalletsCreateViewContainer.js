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

function mapStateToProps({ wallets, walletsCreate }: State): StateProps {
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
    ...walletsCreate,
    name,
    password,
    isLoading,
    passwordHint,
    invalidFields,
    passwordConfirm,
    isPasswordExists: !!testPasswordData,
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

export default connect(mapStateToProps, mapDispatchToProps)(WalletsCreateView)
