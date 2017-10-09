import React from 'react'
import PropTypes from 'prop-types'

import Search from 'components/Search'

function CurrenciesTableHeader({ searchCurrencies, searchQuery }) {
  return (
    <div className='currencies-table-header clear'>
      <Search search={searchCurrencies} name='currencies' query={searchQuery} />
    </div>
  )
}

CurrenciesTableHeader.propTypes = {
  searchCurrencies: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default CurrenciesTableHeader
