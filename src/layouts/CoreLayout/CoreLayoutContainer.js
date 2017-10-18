import { connect } from 'react-redux'

import { openCurrenciesModal } from 'routes/JWallet/modules/currencies'

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
  getNetworksFromStorage,
  setActiveNetwork,
  saveCustomNetwork,
  removeCustomNetwork,
} from 'routes/JWallet/modules/networks'

import CoreLayout from './CoreLayout'

const mapStateToProps = state => ({
  currencies: state.currencies,
  funds: state.funds,
  keystore: state.keystore,
  networks: state.networks,
  isNewKeystorePasswordModalOpen: state.newKeystorePasswordModal.isOpen,
})

const mapDispatchToProps = {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
  getKeystoreFromStorage,
  openKeystoreModal,
  openNewKeyModal,
  openImportKeyModal,
  getNetworksFromStorage,
  setActiveNetwork,
  saveCustomNetwork,
  removeCustomNetwork,
  openCurrenciesModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
