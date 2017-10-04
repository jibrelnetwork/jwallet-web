import { connect } from 'react-redux'

import {
  closeNewKeyModal,
  setNewKeyMnemonicConfirm,
  setNewKeyPassword,
  setNewKeyPasswordConfirm,
  createKeystoreAccount,
  backupKeystore,
} from 'routes/JWallet/modules/keystore'

import NewKeyModal from './NewKeyModal'

const mapStateToProps = state => ({
  keystore: state.keystore,
})

const mapDispatchToProps = {
  closeNewKeyModal,
  setNewKeyMnemonicConfirm,
  setNewKeyPassword,
  setNewKeyPasswordConfirm,
  createKeystoreAccount,
  backupKeystore,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewKeyModal)
