import { connect } from 'react-redux'

import {
  closeConvertFundsModal,
  setConvertFundsFromAmount,
  setConvertFundsFromSymbol,
  setConvertFundsFromAccountId,
  setConvertFundsToAmount,
  setConvertFundsToSymbol,
  setConvertFundsToAccountId,
  convertFunds,
} from 'routes/JWallet/modules/modals/convertFunds'

import ConvertFundsModal from './ConvertFundsModal'

const mapStateToProps = state => ({
  ...state.convertFundsModal,
  accounts: state.keystore.accounts,
  modalName: 'convert-funds',
  modalTitle: 'Convert Funds',
  buttonTitle: 'Convert Funds',
  iconName: 'convert-funds',
})

const mapDispatchToProps = {
  closeConvertFundsModal,
  setConvertFundsFromAmount,
  setConvertFundsFromSymbol,
  setConvertFundsFromAccountId,
  setConvertFundsToAmount,
  setConvertFundsToSymbol,
  setConvertFundsToAccountId,
  convertFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConvertFundsModal)
