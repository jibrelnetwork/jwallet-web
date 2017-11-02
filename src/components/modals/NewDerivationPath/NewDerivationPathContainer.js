import { connect } from 'react-redux'

import {
  closeNewDerivationPathModal,
  setDerivationPathPassword,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNewDerivationPathInvalidField,
} from 'routes/JWallet/modules/modals/newDerivationPath'

import { setKeystoreAccountDerivationPath } from 'routes/JWallet/modules/keystore'

import NewDerivationPath from './NewDerivationPath'

const mapStateToProps = state => ({
  ...state.newDerivationPathModal,
  modalName: 'new-derivation-path',
  modalTitle: 'New Derivation Path',
  buttonTitle: 'Set derivation path',
  iconName: '',
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
