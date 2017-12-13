import React from 'react'
import PropTypes from 'prop-types'

import Search from 'components/Search'

function CurrenciesTableSearch({ searchCurrencies, searchQuery }) {
  return (
    <div className='currencies-table-search clear'>
      <Search
        search={searchCurrencies}
        name='currencies'
        query={searchQuery}
        placeholder={i18n('modals.digitalAssetManager.searchField')}
      />
    </div>
  )
}

CurrenciesTableSearch.propTypes = {
  searchCurrencies: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default CurrenciesTableSearch
