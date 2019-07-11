// @flow strict

import { connect } from 'react-redux'

import {
  selectLanguage,
  selectFiatCurrency,
} from 'store/selectors/user'

import {
  type Props,
  SettingsView,
} from './SettingsView'

function mapStateToProps(state: AppState) {
  const language = selectLanguage(state)
  const fiatCurrency = selectFiatCurrency(state)

  // #TODO: developer mode: check active network from networks selector
  const isDeveloperMode = false

  return {
    language,
    fiatCurrency,
    isDeveloperMode,
  }
}

export const Settings = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
)(SettingsView)
