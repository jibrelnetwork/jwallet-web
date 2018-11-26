// @flow

import { connect } from 'react-redux'

import { changePasswordInput } from '../../modules/wallets'

import {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  downloadToTxt,
  copyToClipboard,
} from './modules/walletsBackup'

import WalletsBackupView from './WalletsBackupView'

type StateProps = {|
  +items: Wallets,
  +invalidFields: FormFields,
  +data: string,
  +password: string,
  +currentStep: WalletsBackupStepIndex,
  +isLoading: boolean,
|}

function mapStateToProps({ wallets, walletsBackup }: AppState): StateProps {
  const {
    persist: {
      items,
    },
    password,
    isLoading,
    invalidFields,
  } = wallets

  return {
    ...walletsBackup,
    items,
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
  downloadToTxt,
  copyToClipboard,
  changePasswordInput,
}

// eslint-disable-next-line no-unused-vars
type OwnProps = {|
  params: {|
    walletId: string
  |}
|}

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsBackupView)
