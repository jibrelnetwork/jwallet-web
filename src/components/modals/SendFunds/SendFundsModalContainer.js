import { connect } from 'react-redux'

import i18n from 'i18n/en'

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

const { title, buttonTitle } = i18n.modals.sendFunds

const mapStateToProps = state => ({
  ...state.sendFundsModal,
  buttonTitle,
  accounts: state.keystore.accounts,
  currencies: state.currencies.items,
  modalName: 'send-funds',
  modalTitle: title,
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
