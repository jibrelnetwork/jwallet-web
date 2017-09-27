import { connect } from 'react-redux'

import { openAccountManager } from 'routes/JWallet/modules/accounts'

import {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
} from 'routes/JWallet/modules/funds'

import {
  getKeysFromCache,
  setActiveKey,
  openNewKeysModal,
  openImportKeysModal,
  openBackupKeysModal,
  clearKeys,
} from 'routes/JWallet/modules/keys'

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
  keys: state.keys,
  networks: state.networks,
})

const mapDispatchToProps = {
  openAccountManager,
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
  getKeysFromCache,
  setActiveKey,
  openNewKeysModal,
  openImportKeysModal,
  openBackupKeysModal,
  clearKeys,
  getNetworksFromCache,
  setActiveNetwork,
  saveCustomNetwork,
  removeCustomNetwork,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
