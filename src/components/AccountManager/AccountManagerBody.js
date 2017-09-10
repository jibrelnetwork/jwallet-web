import React from 'react'
import PropTypes from 'prop-types'

import AccountsTable from 'components/AccountsTable'

function AccountManagerBody({ toggleAccount, searchAccounts, sortAccounts, accounts }) {
  return (
    <div className='account-manager-body'>
      <AccountsTable
        toggleAccount={toggleAccount}
        searchAccounts={searchAccounts}
        sortAccounts={sortAccounts}
        accounts={accounts}
      />
    </div>
  )
}

AccountManagerBody.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  searchAccounts: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
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

export default AccountManagerBody
