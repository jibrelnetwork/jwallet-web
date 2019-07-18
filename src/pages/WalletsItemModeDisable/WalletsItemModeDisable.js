// @flow strict

import { compose } from 'redux'
import { connect } from 'react-redux'
import { withI18n } from '@lingui/react'
import { type I18n as I18nType } from '@lingui/core'

import { selectAddressNames } from 'store/selectors/wallets'

import {
  type Props,
  WalletsItemModeDisableView,
} from './WalletsItemModeDisableView'

type OwnProps = {|
  +i18n: I18nType,
  +walletId: string,
|}

function mapStateToProps(state: AppState) {
  return {
    addressNames: selectAddressNames(state),
  }
}

export const WalletsItemModeDisable = compose(
  withI18n(),
  connect<Props, OwnProps, _, _, _, _>(
    mapStateToProps,
  ),
)(WalletsItemModeDisableView)
