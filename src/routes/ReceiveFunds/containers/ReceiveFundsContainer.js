import { connect } from 'react-redux'

import {
  getCurrentAddress,
  getDigitalAssetSymbols,
} from 'utils'

import {
  setAsset,
  setAmount,
  saveQRCode,
  copyAddress,
} from '../modules/receiveFunds'

import ReceiveFunds from '../components/ReceiveFunds'

const getRecipient = (keystore) => {
  const { accountName } = keystore.currentAccount
  const currentAddress = getCurrentAddress(keystore)
  const name = (accountName.length > 20) ? `${accountName.substr(0, 20)}...` : accountName
  const addr = `${currentAddress.substr(0, 6)}...${currentAddress.substr(-2)}`

  return `${name}   ${addr}`
}

const mapStateToProps = ({ currencies, keystore, receiveFunds }) => ({
  ...receiveFunds,
  recipient: getRecipient(keystore),
  digitalAssets: getDigitalAssetSymbols(currencies),
})

const mapDispatchToProps = {
  setAsset,
  setAmount,
  saveQRCode,
  copyAddress,
}

export default connect(mapStateToProps, mapDispatchToProps)(ReceiveFunds)
