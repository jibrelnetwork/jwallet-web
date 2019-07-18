// @flow strict

import { connect } from 'react-redux'

import {
  selectFiatCurrency,
} from 'store/selectors/user'

import {
  type Props,
  SettingsView,
} from './SettingsView'

function mapStateToProps(state: AppState) {
  const fiatCurrency = selectFiatCurrency(state)

  // #TODO: developer mode: check active network from networks selector
  const isDeveloperMode = false

  return {
    fiatCurrency,
    isDeveloperMode,
  }
}

export const Settings = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
)(SettingsView)
