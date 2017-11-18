import { connect } from 'react-redux'

import {
  closeSendFundsModal,
  setSendFundsAddress,
  setSendFundsAmount,
  setSendFundsSymbol,
  setSendFundsAccount,
  setSendFundsGas,
  setSendFundsGasPrice,
  setSendFundsGasSymbol,
  setSendFundsPincode,
  typeSendFundsPincode,
  sendFunds,
} from 'routes/JWallet/modules/funds'

import SendFundsModal from './SendFundsModal'

const mapStateToProps = state => ({
  funds: state.funds,
})

const mapDispatchToProps = {
  closeSendFundsModal,
  setSendFundsAddress,
  setSendFundsAmount,
  setSendFundsSymbol,
  setSendFundsAccount,
  setSendFundsGas,
  setSendFundsGasPrice,
  setSendFundsGasSymbol,
  setSendFundsPincode,
  typeSendFundsPincode,
  sendFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFundsModal)
