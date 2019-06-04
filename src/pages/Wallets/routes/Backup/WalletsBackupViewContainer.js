// @flow

import { connect } from 'react-redux'

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
  } = wallets

  return {
    ...walletsBackup,
    items,
  }
}

const mapDispatchToProps = {
}

type OwnProps = {|
  params: {|
    walletId: string,
  |},
|}

export default (
  connect<Props, OwnProps, _, _, _, _ >(mapStateToProps, mapDispatchToProps)
)(WalletsBackupView)
