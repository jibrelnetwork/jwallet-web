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

const mapStateToProps = ({ sendFundsModal, keystore, currencies }) => ({
  ...sendFundsModal,
  accounts: keystore.accounts,
  modalName: 'send-funds',
  buttonType: 'password',
  iconName: 'send-funds',
  modalTitle: i18n('modals.sendFunds.title'),
  buttonTitle: i18n('modals.sendFunds.buttonTitle'),
  currencies: currencies.items.filter(currency => currency.isActive),
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
