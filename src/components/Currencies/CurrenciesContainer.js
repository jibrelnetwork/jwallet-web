import { connect } from 'react-redux'

import {
  getCurrencies,
  setCurrentCurrency,
  openCurrenciesModal,
} from 'routes/JWallet/modules/currencies'

import Currencies from './Currencies'

const mapStateToProps = state => ({
  currencies: state.currencies,
  isTransactionsLoading: state.transactions.isLoading,
})

const mapDispatchToProps = {
  getCurrencies,
  setCurrentCurrency,
  openCurrenciesModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)
