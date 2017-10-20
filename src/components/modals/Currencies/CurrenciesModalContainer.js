import { connect } from 'react-redux'

import {
  openCurrenciesModal,
  closeCurrenciesModal,
  toggleActiveCurrency,
  searchCurrencies,
  sortCurrencies,
} from 'routes/JWallet/modules/currencies'

import { openCustomTokenModal } from 'routes/JWallet/modules/modals/customToken'

import CurrenciesModal from './CurrenciesModal'

const mapStateToProps = state => state.currencies

const mapDispatchToProps = {
  openCurrenciesModal,
  closeCurrenciesModal,
  toggleActiveCurrency,
  searchCurrencies,
  sortCurrencies,
  openCustomTokenModal,
}

export default connect(mapStateToProps, mapDispatchToProps)(CurrenciesModal)
