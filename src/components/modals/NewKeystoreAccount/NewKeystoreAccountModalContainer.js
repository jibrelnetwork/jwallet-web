import { connect } from 'react-redux'

import {
  closeNewKeystoreAccountModal,
  setNewKeystoreAccountMnemonic,
  setNewKeystoreAccountMnemonicConfirm,
  setNewKeystoreAccountPassword,
  setNewKeystoreAccountPasswordConfirm,
  setNewKeystoreAccountCurrentStep,
  setNewKeystoreAccountValidField,
  setNewKeystoreAccountInvalidField,
  setNewKeystoreAccountAlert,
} from 'routes/JWallet/modules/modals/newKeystoreAccount'

import { saveMnemonicToFile, createKeystoreAccount } from 'routes/JWallet/modules/keystore'

import NewKeystoreAccountModal from './NewKeystoreAccountModal'

const mapStateToProps = state => ({
  ...state.newKeystoreAccountModal,
  isCreating: state.keystore.isCreating,
  isInitialized: !!state.keystore.currentAccount.id.length,
})

const mapDispatchToProps = {
  closeNewKeystoreAccountModal,
  setNewKeystoreAccountMnemonic,
  setNewKeystoreAccountMnemonicConfirm,
  setNewKeystoreAccountPassword,
  setNewKeystoreAccountPasswordConfirm,
  setNewKeystoreAccountCurrentStep,
  setNewKeystoreAccountValidField,
  setNewKeystoreAccountInvalidField,
  setNewKeystoreAccountAlert,
  saveMnemonicToFile,
  createKeystoreAccount,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewKeystoreAccountModal)
