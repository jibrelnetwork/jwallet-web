// @flow
import { get } from 'lodash'
import { connect } from 'react-redux'

import { selectActiveWallet } from 'store/selectors/wallets'
import { selectCurrentNetwork } from 'store/selectors/networks'
import SettingsIndexView from './SettingsIndexView'

function mapStateToProps(state) {
  const networkName = get(selectCurrentNetwork(state), 'title', null)

  const activeWallet = selectActiveWallet(state)
  const walletName = get(activeWallet, 'name', null)
  const walletType = get(activeWallet, 'customType', null)
  const { derivationPath, passphrase } = get(activeWallet, 'mnemonicOptions', {})

  const resultProps = {
    networkName,
    walletName,
    walletType,
    derivationPath,
    passphrase,
  }

  return { ...state.settings, ...resultProps }
}

export default connect(mapStateToProps)(SettingsIndexView)
