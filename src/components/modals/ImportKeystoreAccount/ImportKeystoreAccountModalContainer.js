import { connect } from 'react-redux'

import {
  closeImportKeystoreAccountModal,
  setImportKeystoreAccountData,
  setImportKeystoreAccountPassword,
  setImportKeystoreAccountPasswordConfirm,
} from 'routes/JWallet/modules/modals/importKeystoreAccount'

import { createKeystoreAccount } from 'routes/JWallet/modules/keystore'

import ImportKeystoreAccountModal from './ImportKeystoreAccountModal'

const mapStateToProps = state => ({
  ...state.importKeystoreAccountModal,
  isCreating: state.keystore.isCreating,
  isInitialized: !!state.keystore.currentAccount.id.length,
})

const mapDispatchToProps = {
  closeImportKeystoreAccountModal,
  setImportKeystoreAccountData,
  setImportKeystoreAccountPassword,
  setImportKeystoreAccountPasswordConfirm,
  createKeystoreAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportKeystoreAccountModal)
