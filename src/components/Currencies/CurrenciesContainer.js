import { connect } from 'react-redux'

import {
  getCurrencies,
  setCurrentDigitalAssetAddress,
  openCurrenciesModal,
} from 'routes/JWallet/modules/currencies'

import Currencies from './Currencies'

const mapStateToProps = state => ({
  currencies: state.currencies,
  isTransactionsLoading: state.transactions.isLoading,
})

const mapDispatchToProps = {
  getCurrencies,
  setCurrentDigitalAssetAddress,
  openCurrenciesModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)
