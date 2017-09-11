import React from 'react'
import PropTypes from 'prop-types'

import YourAccounts from 'components/YourAccounts'
import TransactionsTable from 'components/TransactionsTable'

import Form from 'components/Form'

function JWallet(props) {
  const {
    getAccounts,
    openAccountManager,
    closeAccountManager,
    setCurrentAccount,
    toggleAccount,
    searchAccounts,
    sortAccounts,
    addCustomToken,
    getTransactions,
    accounts,
    transactions,
  } = props

  const configs = {
    to: '0x7cB57B5A97eAbe94205C07890BE4c1aD31E486A8',
    value: 10,
    gas: 42000,
  }

  return (
    <div className='jwallet'>
      <Form configs={configs} />
      {/* <YourAccounts
        getAccounts={getAccounts}
        openAccountManager={openAccountManager}
        closeAccountManager={closeAccountManager}
        setCurrentAccount={setCurrentAccount}
        toggleAccount={toggleAccount}
        searchAccounts={searchAccounts}
        sortAccounts={sortAccounts}
        addCustomToken={addCustomToken}
        accounts={accounts}
        isTransactionsLoading={transactions.isLoading}
      />
      <TransactionsTable getTransactions={getTransactions} {...transactions} /> */}
    </div>
  )
}

JWallet.propTypes = {
  addCustomToken: PropTypes.func.isRequired,
  getAccounts: PropTypes.func.isRequired,
  openAccountManager: PropTypes.func.isRequired,
  closeAccountManager: PropTypes.func.isRequired,
  setCurrentAccount: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  searchAccounts: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  getTransactions: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      licensed: PropTypes.string.isRequired,
      transfer: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    foundItemsSymbols: PropTypes.arrayOf(PropTypes.string).isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isAccountManagerOpen: PropTypes.bool.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  transactions: PropTypes.shape({
    items: PropTypes.array.isRequired,
    sortField: PropTypes.string.isRequired,
    sortDirection: PropTypes.string.isRequired,
    searchQuery: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
}

export default JWallet
