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
} from 'routes/JWallet/modules/funds'

import ConvertFundsModal from './ConvertFundsModal'

const mapStateToProps = state => ({
  funds: state.funds,
})

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
