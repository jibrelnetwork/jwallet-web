import React from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

import AccountManagerHeader from './AccountManagerHeader'
import AccountManagerBody from './AccountManagerBody'
import AccountManagerFooter from './AccountManagerFooter'

function AccountManager(props) {
  const {
    toggleAccount,
    searchAccounts,
    sortAccounts,
    addCustomToken,
    closeAccountManager,
    accounts,
  } = props

  const accountManagerHeader = <AccountManagerHeader />

  const accountManagerBody = (
    <AccountManagerBody
      accounts={accounts}
      toggleAccount={toggleAccount}
      searchAccounts={searchAccounts}
      sortAccounts={sortAccounts}
    />
  )

  const accountManagerFooter = <AccountManagerFooter addCustomToken={addCustomToken} />

  return (
    <JbModal
      closeModal={closeAccountManager}
      name='account-manager'
      header={accountManagerHeader}
      body={accountManagerBody}
      footer={accountManagerFooter}
      isOpen={accounts.isAccountManagerOpen}
    />
  )
}

AccountManager.propTypes = {
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

export default AccountManager
