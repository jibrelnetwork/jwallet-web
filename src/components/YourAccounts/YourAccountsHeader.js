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
    addCustomToken,
    accounts,
    isAccountManagerOpen,
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
        addCustomToken={addCustomToken}
        accounts={accounts}
        isOpen={isAccountManagerOpen}
      />
    </div>
  )
}

YourAccountsHeader.propTypes = {
  openAccountManager: PropTypes.func.isRequired,
  closeAccountManager: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  searchAccounts: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    current: PropTypes.number.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
  isAccountManagerOpen: PropTypes.bool.isRequired,
}

export default YourAccountsHeader
