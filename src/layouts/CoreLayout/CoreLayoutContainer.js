import { connect } from 'react-redux'

import {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
} from 'routes/JWallet/modules/funds'

import {
  getKeysFromCache,
  setActiveKey,
  openNewKeysModal,
  openImportKeysModal,
  openBackupKeysModal,
  clearKeys,
} from 'routes/JWallet/modules/keys'

import CoreLayout from './CoreLayout'

const mapStateToProps = state => ({
  keys: state.keys,
})

const mapDispatchToProps = {
  openSendFundsModal,
  openReceiveFundsModal,
  openConvertFundsModal,
  getKeysFromCache,
  setActiveKey,
  openNewKeysModal,
  openImportKeysModal,
  openBackupKeysModal,
  clearKeys,
}

export default connect(mapStateToProps, mapDispatchToProps)(CoreLayout)
