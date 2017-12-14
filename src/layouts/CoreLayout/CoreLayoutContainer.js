import { connect } from 'react-redux'

import { openCurrenciesModal } from 'routes/JWallet/modules/currencies'

import { getKeystoreFromStorage, openKeystoreModal } from 'routes/JWallet/modules/keystore'

import { setLanguage } from 'routes/JWallet/modules/i18n'

import {
  getNetworksFromStorage,
  setCurrentNetwork,
  setCustomNetworkValue,
  saveCustomNetwork,
  removeCustomNetwork,
} from 'routes/JWallet/modules/networks'

import { openConvertFundsModal } from 'routes/JWallet/modules/modals/convertFunds'
import { openImportKeystoreAccountModal } from 'routes/JWallet/modules/modals/importKeystoreAccount'
import { openNewKeystoreAccountModal } from 'routes/JWallet/modules/modals/newKeystoreAccount'
import { openReceiveFundsModal } from 'routes/JWallet/modules/modals/receiveFunds'
import { openSendFundsModal } from 'routes/JWallet/modules/modals/sendFunds'

import CoreLayout from './CoreLayout'

const mapStateToProps = state => ({
  funds: state.funds,
  keystore: state.keystore,
  networks: state.networks,
  isAlphaWarningModalOpen: state.alphaWarningModal.isOpen,
  isBackupKeystoreModalOpen: state.backupKeystoreModal.isOpen,
  isClearKeystoreModalOpen: state.clearKeystoreModal.isOpen,
  isConvertFundsModalOpen: state.convertFundsModal.isOpen,
  isCurrenciesModalOpen: state.currencies.isOpen,
  isCustomTokenModalOpen: state.customTokenModal.isOpen,
  isImportKeystoreAccountModalOpen: state.importKeystoreAccountModal.isOpen,
  isNewDerivationPathModalOpen: state.newDerivationPathModal.isOpen,
  isNewKeystoreAccountModalOpen: state.newKeystoreAccountModal.isOpen,
  isNewKeystorePasswordModalOpen: state.newKeystorePasswordModal.isOpen,
  isReceiveFundsModalOpen: state.receiveFundsModal.isOpen,
  isSendFundsModalOpen: state.sendFundsModal.isOpen,
})

const mapDispatchToProps = {
  getKeystoreFromStorage,
  getNetworksFromStorage,
  setCurrentNetwork,
  setCustomNetworkValue,
  saveCustomNetwork,
  removeCustomNetwork,
  openConvertFundsModal,
  openCurrenciesModal,
  openImportKeystoreAccountModal,
  openKeystoreModal,
  openNewKeystoreAccountModal,
  openReceiveFundsModal,
  openSendFundsModal,
  setLanguage,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
