import { connect } from 'react-redux'

import {
  getKeysFromCache,
  setActiveKey,
  addNewKeys,
  importKeys,
  backupKeys,
  clearKeys,
} from 'routes/JWallet/modules/keys'

import {
  sendFunds,
  receiveFunds,
  convertFunds,
} from 'routes/JWallet/modules/funds'

import CoreLayout from './CoreLayout'

const mapStateToProps = state => ({
  keys: state.keys,
})

const mapDispatchToProps = {
  getKeysFromCache,
  setActiveKey,
  addNewKeys,
  importKeys,
  backupKeys,
  clearKeys,
  sendFunds,
  receiveFunds,
  convertFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
