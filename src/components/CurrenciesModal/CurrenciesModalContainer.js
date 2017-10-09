import { connect } from 'react-redux'

import {
  closeCurrenciesModal,
  toggleActiveCurrency,
  searchCurrencies,
  sortCurrencies,
  openCustomTokenModal,
} from 'routes/JWallet/modules/currencies'

import CurrenciesModal from './CurrenciesModal'

const mapStateToProps = state => ({
  currencies: state.currencies,
})

const mapDispatchToProps = {
  closeCurrenciesModal,
  toggleActiveCurrency,
  searchCurrencies,
  sortCurrencies,
  openCustomTokenModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesModal)
