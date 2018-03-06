import { connect } from 'react-redux'

import {
  getCurrentAddress,
  getDigitalAssetSymbols,
} from 'utils'

import {
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setPassword,
  goToPasswordStep,
  send,
} from '../modules/sendFunds'

import SendFunds from '../components/SendFunds'

const getSender = (keystore) => {
  const { accountName } = keystore.currentAccount
  const currentAddress = getCurrentAddress(keystore)
  const name = (accountName.length > 20) ? `${accountName.substr(0, 20)}...` : accountName
  const addr = `${currentAddress.substr(0, 6)}...${currentAddress.substr(-2)}`

  return `${name}   ${addr}`
}

const mapStateToProps = ({ currencies, keystore, sendFunds }) => ({
  ...sendFunds,
  sender: getSender(keystore),
  digitalAssets: getDigitalAssetSymbols(currencies),
})

const mapDispatchToProps = {
  setAsset,
  setAmount,
  setRecipient,
  setGas,
  setGasPrice,
  setNonce,
  setPassword,
  goToPasswordStep,
  send,
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFunds)
