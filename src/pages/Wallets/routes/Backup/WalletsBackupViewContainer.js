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

// eslint-disable-next-line import/no-duplicates
import WalletsBackupView from './WalletsBackupView'

// eslint-disable-next-line import/no-duplicates
import { type Props } from './WalletsBackupView'

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

type OwnProps = {|
  params: {|
    walletId: string,
  |},
|}

export default (
  connect<Props, OwnProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(WalletsBackupView)
