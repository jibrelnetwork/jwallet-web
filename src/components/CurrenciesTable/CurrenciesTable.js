import React from 'react'
import PropTypes from 'prop-types'

import CurrenciesTableHeader from './CurrenciesTableHeader'
import CurrenciesTableBody from './CurrenciesTableBody'

function CurrenciesTable({ toggleActiveCurrency, searchCurrencies, sortCurrencies, currencies }) {
  return (
    <div className='currencies-table'>
      <CurrenciesTableHeader
        searchCurrencies={searchCurrencies}
        searchQuery={currencies.searchQuery}
      />
      <CurrenciesTableBody
        sortCurrencies={sortCurrencies}
        toggleActiveCurrency={toggleActiveCurrency}
        currencies={currencies}
      />
    </div>
  )
}

CurrenciesTable.propTypes = {
  toggleActiveCurrency: PropTypes.func.isRequired,
  searchCurrencies: PropTypes.func.isRequired,
  sortCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      licensed: PropTypes.string.isRequired,
      transfer: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })).isRequired,
    foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default CurrenciesTable
