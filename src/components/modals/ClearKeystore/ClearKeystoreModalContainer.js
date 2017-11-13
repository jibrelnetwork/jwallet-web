import { connect } from 'react-redux'

import {
  closeClearKeystoreModal,
  setClearKeystorePassword,
} from 'routes/JWallet/modules/modals/clearKeystore'

import { removeKeystoreAccounts } from 'routes/JWallet/modules/keystore'

import ClearKeystoreModal from './ClearKeystoreModal'

const mapStateToProps = state => ({
  ...state.clearKeystoreModal,
  alert: 'Please confirm that you really want to remove all your keys',
  modalName: 'clear-keystore',
  modalTitle: 'Clear Keystore',
  buttonTitle: 'Confirm',
  buttonType: 'password',
  imageName: 'done',
})

const mapDispatchToProps = {
  closeClearKeystoreModal,
  setClearKeystorePassword,
  removeKeystoreAccounts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearKeystoreModal)
