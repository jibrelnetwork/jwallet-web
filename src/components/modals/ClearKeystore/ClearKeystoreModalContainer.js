import { connect } from 'react-redux'

import i18n from 'i18n/en'

import {
  closeClearKeystoreModal,
  setClearKeystorePassword,
} from 'routes/JWallet/modules/modals/clearKeystore'

import { removeKeystoreAccounts } from 'routes/JWallet/modules/keystore'

import ClearKeystoreModal from './ClearKeystoreModal'

const { title, buttonTitle, alert } = i18n.modals.removeAccounts

const mapStateToProps = state => ({
  ...state.clearKeystoreModal,
  alert,
  buttonTitle,
  modalTitle: title,
  modalName: 'clear-keystore',
  buttonType: 'password',
  imageName: 'done',
})

const mapDispatchToProps = {
  closeClearKeystoreModal,
  setClearKeystorePassword,
  removeKeystoreAccounts,
}

export default connect(mapStateToProps, mapDispatchToProps)(ClearKeystoreModal)
