import { connect } from 'react-redux'

import {
  closeConvertFundsModal,
  setConvertFundsFromAmount,
  setConvertFundsFromSymbol,
  setConvertFundsFromAccount,
  setConvertFundsToAmount,
  setConvertFundsToSymbol,
  setConvertFundsToAccount,
  convertFunds,
} from 'routes/JWallet/modules/modals/convertFunds'

import ConvertFundsModal from './ConvertFundsModal'

const mapStateToProps = state => state.convertFundsModal

const mapDispatchToProps = {
  closeConvertFundsModal,
  setConvertFundsFromAmount,
  setConvertFundsFromSymbol,
  setConvertFundsFromAccount,
  setConvertFundsToAmount,
  setConvertFundsToSymbol,
  setConvertFundsToAccount,
  convertFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConvertFundsModal)
