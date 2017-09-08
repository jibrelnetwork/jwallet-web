import React from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

import AccountManagerHeader from './AccountManagerHeader'
import AccountManagerBody from './AccountManagerBody'
import AccountManagerFooter from './AccountManagerFooter'

function AccountManager(props) {
  const {
    setAccounts,
    toggleAccount,
    addCustomToken,
    closeAccountManager,
    accounts,
    isOpen,
  } = props

  const accountManagerHeader = <AccountManagerHeader />

  const accountManagerBody = (
    <AccountManagerBody
      accounts={accounts}
      setAccounts={setAccounts}
      toggleAccount={toggleAccount}
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
      isOpen={isOpen}
    />
  )
}

AccountManager.propTypes = {
  closeAccountManager: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  setAccounts: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
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
  isOpen: PropTypes.bool.isRequired,
}

export default AccountManager
