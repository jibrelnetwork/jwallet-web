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

const mapStateToProps = ({ newDerivationPathModal }) => ({
  ...newDerivationPathModal,
  buttonType: 'password',
  modalName: 'new-derivation-path',
  modalTitle: i18n('modals.derivationPath.title'),
  buttonTitle: i18n('modals.derivationPath.buttonTitle'),
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
