import { connect } from 'react-redux'

import {
  closeNewKeystorePasswordModal,
  setOldKeystorePassword,
  setNewKeystorePassword,
  setNewKeystorePasswordInvalidField,
} from 'routes/JWallet/modules/modals/newKeystorePassword'

import { setKeystorePassword } from 'routes/JWallet/modules/keystore'

import NewKeystorePasswordModal from './NewKeystorePasswordModal'

const mapStateToProps = state => ({
  ...state.newKeystorePasswordModal,
  modalName: 'new-keystore-password',
  modalTitle: 'New Keystore Password',
  buttonTitle: 'Confirm',
  iconName: '',
})

const mapDispatchToProps = {
  closeNewKeystorePasswordModal,
  setOldKeystorePassword,
  setNewKeystorePassword,
  setNewKeystorePasswordInvalidField,
  setKeystorePassword,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewKeystorePasswordModal)
