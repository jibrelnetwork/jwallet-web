import { connect } from 'react-redux'

import {
  getCurrencies,
  openCurrenciesModal,
  setCurrentCurrency,
} from 'routes/JWallet/modules/currencies'

import Currencies from './Currencies'

const mapStateToProps = state => ({
  currencies: state.currencies,
  isTransactionsLoading: state.transactions.isLoading,
})

const mapDispatchToProps = {
  getCurrencies,
  openCurrenciesModal,
  setCurrentCurrency,
}

export default connect(mapStateToProps, mapDispatchToProps)(Currencies)
