// @flow

import { connect } from 'react-redux'

import {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  changeNameInput,
  changePasswordInput,
  changePasswordHintInput,
  changePasswordConfirmInput,
} from './modules/walletsCreate'

import WalletsCreateView from './WalletsCreateView'

const mapStateToProps = ({
  wallets,
  walletsCreate,
}: State): {|
  +invalidFields: FormFields,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +currentStep: Index,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|} => ({
  ...walletsCreate,
  isPasswordExists: !!wallets.testPasswordData,
})

const mapDispatchToProps: {|
  +openView: Function,
  +closeView: Function,
  +goToNextStep: Function,
  +goToPrevStep: Function,
  +changeNameInput: Function,
  +changePasswordInput: Function,
  +changePasswordHintInput: Function,
  +changePasswordConfirmInput: Function,
|} = {
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
