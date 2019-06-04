// @flow strict

import { connect } from 'react-redux'
import { actions } from 'redux-router5'

import { selectPasswordPersist } from 'store/selectors/password'

import {
  type Props,
  WalletsItemBackupView,
} from './WalletsItemBackupView'

type OwnProps = {|
  +walletId: string,
|}

function mapStateToProps(state: AppState) {
  const {
    internalKey,
    salt,
    hint,
  }: PasswordPersist = selectPasswordPersist(state)

  return {
    internalKey,
    salt,
    hint,
  }
}

const mapDispatchToProps = {
  goHome: () => actions.navigateTo('Home'),
}

export const WalletsItemBackup = connect<Props, OwnProps, _, _, _, _>(
  mapStateToProps,
  mapDispatchToProps,
)(WalletsItemBackupView)
