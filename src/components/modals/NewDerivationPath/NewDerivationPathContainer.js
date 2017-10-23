import { connect } from 'react-redux'

import {
  closeNewDerivationPathModal,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNewDerivationPathInvalidField,
} from 'routes/JWallet/modules/modals/newDerivationPath'

import { setKeystoreAccountDerivationPath } from 'routes/JWallet/modules/keystore'

import NewDerivationPath from './NewDerivationPath'

const mapStateToProps = state => state.newDerivationPathModal

const mapDispatchToProps = {
  closeNewDerivationPathModal,
  setKnownDerivationPath,
  setCustomDerivationPath,
  setNewDerivationPathInvalidField,
  setKeystoreAccountDerivationPath,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDerivationPath)
