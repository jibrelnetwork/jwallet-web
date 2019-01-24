// @flow
import { connect } from 'react-redux'

import { selectActiveWallet } from 'store/selectors/wallets'
import { selectCurrentNetworkName } from 'store/selectors/networks'
import { selectSettingsFiatCurrency } from 'store/selectors/settings'

import SettingsIndexView from './SettingsIndexView'

function mapStateToProps(state: AppState) {
  const wallet: ?Wallet = selectActiveWallet(state)
  const networkName: ?string = selectCurrentNetworkName(state)
  const fiatCurrency: FiatCurrency = selectSettingsFiatCurrency(state)

  return {
    ...state.settings,
    wallet,
    networkName,
    fiatCurrency,
  }
}

export default connect/* :: <AppState, null, OwnPropsEmpty, _, _ > */(
  mapStateToProps,
)(SettingsIndexView)

