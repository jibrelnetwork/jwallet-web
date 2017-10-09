import { connect } from 'react-redux'

import {
  closeCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  addCustomToken,
  openCurrenciesModal,
} from 'routes/JWallet/modules/currencies'

import CustomTokenModal from './CustomTokenModal'

const mapStateToProps = state => ({
  currencies: state.currencies,
})

const mapDispatchToProps = {
  closeCustomTokenModal,
  setCustomTokenAddress,
  setCustomTokenName,
  setCustomTokenSymbol,
  setCustomTokenDecimals,
  addCustomToken,
  openCurrenciesModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomTokenModal)
