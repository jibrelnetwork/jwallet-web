import { connect } from 'react-redux'

import { openAccountManager } from 'routes/JWallet/modules/accounts'

import {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
} from 'routes/JWallet/modules/funds'

import {
  getKeystoreFromStorage,
  openKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
} from 'routes/JWallet/modules/keystore'

import {
  getNetworksFromCache,
  setActiveNetwork,
  saveCustomNetwork,
  removeCustomNetwork,
} from 'routes/JWallet/modules/networks'

import CoreLayout from './CoreLayout'

const mapStateToProps = state => ({
  accounts: state.accounts,
  funds: state.funds,
  keystore: state.keystore,
  networks: state.networks,
})

const mapDispatchToProps = {
  openAccountManager,
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
  getKeystoreFromStorage,
  openKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
  getNetworksFromCache,
  setActiveNetwork,
  saveCustomNetwork,
  removeCustomNetwork,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
