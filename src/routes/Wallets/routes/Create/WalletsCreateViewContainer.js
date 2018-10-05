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

type StateProps = {|
  +invalidFields: FormFields,
  +name: string,
  +password: string,
  +passwordHint: string,
  +passwordConfirm: string,
  +currentStep: Index,
  +isLoading: boolean,
  +isPasswordExists: boolean,
|}

const mapStateToProps = ({ wallets, walletsCreate }: State): StateProps => ({
  ...walletsCreate,
  isPasswordExists: !!wallets.testPasswordData,
})

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
