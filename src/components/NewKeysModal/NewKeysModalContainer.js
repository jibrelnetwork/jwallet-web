import { connect } from 'react-redux'

import {
  closeNewKeysModal,
  setNewKeysMnemonic,
  saveNewKeysAsTXT,
} from 'routes/JWallet/modules/keys'

import NewKeysModal from './NewKeysModal'

const mapStateToProps = state => ({
  keys: state.keys,
})

const mapDispatchToProps = {
  closeNewKeysModal,
  setNewKeysMnemonic,
  saveNewKeysAsTXT,
}

export default connect(mapStateToProps, mapDispatchToProps)(NewKeysModal)
