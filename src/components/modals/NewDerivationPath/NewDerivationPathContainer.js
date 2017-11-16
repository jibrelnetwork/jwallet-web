import { connect } from 'react-redux'

import i18n from 'i18n/en'

import {
  closeNewDerivationPathModal,
  setDerivationPathPassword,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNewDerivationPathInvalidField,
} from 'routes/JWallet/modules/modals/newDerivationPath'

import { setKeystoreAccountDerivationPath } from 'routes/JWallet/modules/keystore'

import NewDerivationPath from './NewDerivationPath'

const { title, buttonTitle } = i18n.modals.derivationPath

const mapStateToProps = state => ({
  ...state.newDerivationPathModal,
  buttonTitle,
  modalName: 'new-derivation-path',
  modalTitle: title,
  buttonType: 'password',
})

const mapDispatchToProps = {
  closeNewDerivationPathModal,
  setDerivationPathPassword,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNewDerivationPathInvalidField,
  setKeystoreAccountDerivationPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDerivationPath)
