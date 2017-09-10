import React from 'react'
import PropTypes from 'prop-types'

import AccountManager from 'components/AccountManager'

import JbIcon from 'components/base/JbIcon'

function YourAccountsHeader(props) {
  const {
    openAccountManager,
    closeAccountManager,
    toggleAccount,
    searchAccounts,
    sortAccounts,
    addCustomToken,
    accounts,
  } = props

  return (
    <div className='your-accounts-header clear'>
      <div className='your-accounts-header__title pull-left'>{'Your Accounts'}</div>
      <JbIcon
        name='settings'
        className='your-accounts-header__icon pull-right'
        title='Manage accounts'
        onClick={openAccountManager}
      />
      <AccountManager
        closeAccountManager={closeAccountManager}
        toggleAccount={toggleAccount}
        searchAccounts={searchAccounts}
        sortAccounts={sortAccounts}
        addCustomToken={addCustomToken}
        accounts={accounts}
      />
    </div>
  )
}

YourAccountsHeader.propTypes = {
  openAccountManager: PropTypes.func.isRequired,
  closeAccountManager: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  searchAccounts: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
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
    isAccountManagerOpen: PropTypes.bool.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
}

export default YourAccountsHeader
