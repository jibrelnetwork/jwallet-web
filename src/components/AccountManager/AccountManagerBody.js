import React from 'react'
import PropTypes from 'prop-types'

import AccountsTable from 'components/AccountsTable'

function AccountManagerBody({ toggleAccount, accounts }) {
  const { items, isActiveAll } = accounts

  return (
    <div className='account-manager-body'>
      <AccountsTable
        toggleAccount={toggleAccount}
        items={items}
        sortField='symbol'
        isActiveAll={isActiveAll}
      />
    </div>
  )
}

AccountManagerBody.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    current: PropTypes.number.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AccountManagerBody
