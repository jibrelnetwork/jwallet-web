import { connect } from 'react-redux'

import {
  closeSendFundsModal,
  setSendFundsAddress,
  setSendFundsAmount,
  setSendFundsSymbol,
  setSendFundsAccountId,
  setSendFundsGas,
  setSendFundsGasPrice,
  setSendFundsPassword,
  sendFunds,
} from 'routes/JWallet/modules/modals/sendFunds'

import SendFundsModal from './SendFundsModal'

const mapStateToProps = state => ({
  ...state.sendFundsModal,
  accounts: state.keystore.accounts,
  currencies: state.currencies.items,
  modalName: 'send-funds',
  modalTitle: 'Send Funds',
  buttonTitle: 'Send Funds',
  buttonType: 'password',
  iconName: 'send-funds',
})

const mapDispatchToProps = {
  closeSendFundsModal,
  setSendFundsAddress,
  setSendFundsAmount,
  setSendFundsSymbol,
  setSendFundsAccountId,
  setSendFundsGas,
  setSendFundsGasPrice,
  setSendFundsPassword,
  sendFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(SendFundsModal)
