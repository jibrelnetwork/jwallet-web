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
  setSendFundsPassword,
  sendFunds,
} from 'routes/JWallet/modules/modals/sendFunds'

import SendFundsModal from './SendFundsModal'

const mapStateToProps = state => state.sendFundsModal

const mapDispatchToProps = {
  closeSendFundsModal,
  setSendFundsAddress,
  setSendFundsAmount,
  setSendFundsSymbol,
  setSendFundsAccount,
  setSendFundsGas,
  setSendFundsGasPrice,
  setSendFundsGasSymbol,
  setSendFundsPassword,
  sendFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFundsModal)
