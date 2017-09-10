import React from 'react'
import PropTypes from 'prop-types'

import AccountsTable from 'components/AccountsTable'

function AccountManagerBody({ setAccounts, toggleAccount, accounts }) {
  const { items, isActiveAll } = accounts

  console.log('AccountManagerBody', items[1].symbol)

  return (
    <div className='account-manager-body'>
      <AccountsTable
        syncItems={setAccounts}
        toggleAccount={toggleAccount}
        items={items}
        sortField='symbol'
        isActiveAll={isActiveAll}
      />
    </div>
  )
}

AccountManagerBody.propTypes = {
  setAccounts: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default AccountManagerBody
