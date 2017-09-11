import { connect } from 'react-redux'

import {
  closeConvertFundsModal,
  setConvertFundsFromAmount,
  setConvertFundsFromSymbol,
  setConvertFundsFromAddress,
  setConvertFundsToAmount,
  setConvertFundsToSymbol,
  setConvertFundsToAddress,
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
  setConvertFundsFromAddress,
  setConvertFundsToAmount,
  setConvertFundsToSymbol,
  setConvertFundsToAddress,
  convertFunds,
}

export default connect(mapStateToProps, mapDispatchToProps)(ConvertFundsModal)
