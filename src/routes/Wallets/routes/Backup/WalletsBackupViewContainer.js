// @flow

import { connect } from 'react-redux'

import { changePasswordInput } from '../../modules/wallets'

import {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
} from './modules/walletsBackup'

import WalletsBackupView from './WalletsBackupView'

type StateProps = {|
  +invalidFields: FormFields,
  +data: string,
  +password: string,
  +currentStep: WalletsBackupStepIndex,
  +isLoading: boolean,
|}

function mapStateToProps({ wallets, walletsBackup }: State): StateProps {
  const {
    password,
    isLoading,
    invalidFields,
  } = wallets

  return {
    ...walletsBackup,
    password,
    isLoading,
    invalidFields,
  }
}

const mapDispatchToProps = {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  changePasswordInput,
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletsBackupView)
