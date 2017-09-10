import React from 'react'
import PropTypes from 'prop-types'

import AccountsTableHeader from './AccountsTableHeader'
import AccountsTableBody from './AccountsTableBody'

function AccountsTable({ toggleAccount, searchAccounts, sortAccounts, accounts }) {
  return (
    <div className='accounts-table'>
      <AccountsTableHeader
        searchAccounts={searchAccounts}
        searchQuery={accounts.searchQuery}
      />
      <AccountsTableBody
        sortAccounts={sortAccounts}
        toggleAccount={toggleAccount}
        accounts={accounts}
      />
    </div>
  )
}

AccountsTable.propTypes = {
  toggleAccount: PropTypes.func.isRequired,
  searchAccounts: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AccountsTable
