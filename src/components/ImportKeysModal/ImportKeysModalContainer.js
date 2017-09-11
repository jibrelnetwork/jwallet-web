import { connect } from 'react-redux'

import {
  closeImportKeysModal,
  setImportKeysData,
  setImportKeysPincode,
  importKeys,
} from 'routes/JWallet/modules/keys'

import ImportKeysModal from './ImportKeysModal'

const mapStateToProps = state => ({
  keys: state.keys,
})

const mapDispatchToProps = {
  closeImportKeysModal,
  setImportKeysData,
  setImportKeysPincode,
  importKeys,
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportKeysModal)
