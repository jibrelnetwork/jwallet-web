import React from 'react'
import PropTypes from 'prop-types'

import JbSearch from 'components/base/JbSearch'

function AccountManagerHeader({ searchAccounts }) {
  return (
    <JbSearch
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
