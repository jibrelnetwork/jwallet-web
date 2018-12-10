// @flow
import { connect } from 'react-redux'

import { selectActiveWallet } from 'store/selectors/wallets'
import { selectCurrentNetworkName } from 'store/selectors/networks'
import SettingsIndexView from './SettingsIndexView'

function mapStateToProps(state: AppState) {
  const networkName = selectCurrentNetworkName(state)
  const wallet = selectActiveWallet(state)

  return {
    ...state.settings,
    networkName,
    wallet,
  }
}

export default (
  connect/* :: <AppState, null, OwnPropsEmpty, _, _ > */(mapStateToProps)(SettingsIndexView)
)
