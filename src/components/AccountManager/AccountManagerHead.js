import React from 'react'
import PropTypes from 'prop-types'

import JbSearch from 'components/base/JbSearch'

function AccountManagerHead({ search }) {
  return <JbSearch search={search} placeholder={'Search...'} className='search--account-manager' />
}

AccountManagerHead.propTypes = {
  search: PropTypes.func.isRequired,
}

export default AccountManagerHead
