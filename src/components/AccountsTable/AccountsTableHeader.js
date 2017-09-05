import React from 'react'
import PropTypes from 'prop-types'

import Search from 'components/Search'

function AccountsTableHeader({ searchAccounts, searchQuery }) {
  return (
    <div className='accounts-table-header clear'>
      <Search search={searchAccounts} name='accounts' query={searchQuery} />
    </div>
  )
}

AccountsTableHeader.propTypes = {
  searchAccounts: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
}

export default AccountsTableHeader
