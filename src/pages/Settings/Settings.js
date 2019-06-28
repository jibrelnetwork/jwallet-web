// @flow strict

import { connect } from 'react-redux'

import { selectSettingsPersist } from 'store/selectors/settings'

import {
  type Props,
  SettingsView,
} from './SettingsView'

function mapStateToProps(state: AppState) {
  const {
    language,
    fiatCurrency,
    isDeveloperMode,
  }: SettingsPersist = selectSettingsPersist(state)

  return {
    language,
    fiatCurrency,
    isDeveloperMode,
  }
}

export const Settings = connect<Props, OwnPropsEmpty, _, _, _, _>(
  mapStateToProps,
)(SettingsView)
