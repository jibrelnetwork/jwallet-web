// @flow

import { connect } from 'react-redux'

import { changePasswordInput } from 'store/modules/wallets'

import {
  openView,
  closeView,
  goToNextStep,
  goToPrevStep,
  downloadToTxt,
  copyToClipboard,
} from 'store/modules/walletsBackup'

import WalletsBackupView from './WalletsBackupView'

function mapStateToProps({
  wallets,
  walletsBackup,
}: AppState) {
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

/* ::
type OwnProps = {|
  params: {|
    walletId: string,
  |},
|}
*/

export default (
  connect/* :: < AppState, any, OwnProps, _, _ > */(mapStateToProps, mapDispatchToProps)
)(WalletsBackupView)
