import { connect } from 'react-redux'

import isMnemonicType from 'utils/isMnemonicType'

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

const mapStateToProps = ({
  sendFundsModal,
  currencies,
  keystore: {
    currentAccount: {
      type,
      accountName,
      address,
      addressIndex,
    },
    addressesFromMnemonic,
  },
}) => ({
  ...sendFundsModal,
  accountName,
  modalName: 'send-funds',
  buttonType: 'password',
  iconName: 'send-funds',
  modalTitle: i18n('modals.sendFunds.title'),
  buttonTitle: i18n('modals.sendFunds.buttonTitle'),
  currencies: currencies.items.filter(currency => currency.isActive),
  sender: isMnemonicType(type) ? addressesFromMnemonic.items[addressIndex] : address,
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
