import React from 'react'
import PropTypes from 'prop-types'

import Search from 'components/Search'

function AccountManagerHeader({ searchAccounts }) {
  return (
    <Search
      search={searchAccounts}
      placeholder={'Search...'}
      className='search--account-manager'
    />
  )
}

AccountManagerHeader.propTypes = {
  searchAccounts: PropTypes.func.isRequired,
}

export default AccountManagerHeader
