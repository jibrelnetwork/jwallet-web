// @flow
import { connect } from 'react-redux'

import { selectActiveWallet } from 'store/selectors/wallets'
import { selectCurrentNetworkName } from 'store/selectors/networks'
import SettingsIndexView from './SettingsIndexView'

type Props = {|
  ...SettingsState,
  networkName: ?string,
  wallet: ?Wallet,
|}

function mapStateToProps(state: AppState): ?Props {
  const networkName = selectCurrentNetworkName(state)
  const wallet = selectActiveWallet(state)

  return {
    ...state.settings,
    networkName,
    wallet,
  }
}

export default (
  connect/* :: <AppState, null, Props, _, _ > */(mapStateToProps)(SettingsIndexView)
)
