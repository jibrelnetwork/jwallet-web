import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbLoader from 'components/base/JbLoader'

import YourAccountsHeader from './YourAccountsHeader'
import YourAccountsBody from './YourAccountsBody'

class YourAccounts extends Component {
  componentWillMount() {
    const { getAccounts, accounts } = this.props

    if (!(accounts.items && accounts.items.length)) {
      getAccounts()
    }
  }

  render() {
    const {
      openAccountManager,
      searchAccounts,
      addCustomToken,
      closeAccountManager,
      accounts,
    } = this.props

    if (accounts.isLoading) {
      return <div className='your-accounts'><JbLoader /></div>
    }

    return (
      <div className='your-accounts'>
        <YourAccountsHeader
          openAccountManager={openAccountManager}
          closeAccountManager={closeAccountManager}
          toggleAccount={this.toggleAccount}
          searchAccounts={searchAccounts}
          sortAccounts={this.sortAccounts}
          addCustomToken={addCustomToken}
          accounts={accounts}
        />
        <YourAccountsBody setCurrentAccount={this.setCurrentAccount} accounts={accounts} />
      </div>
    )
  }

  setCurrentAccount = current => (/* event */) => {
    const { setCurrentAccount, isTransactionsLoading, accounts } = this.props
    const isAlreadyCurrent = (current === accounts.currentActiveIndex)

    if (isTransactionsLoading || isAlreadyCurrent) {
      return
    }

    setCurrentAccount(current)
  }

  toggleAccount = (index) => {
    return (/* new checkbox state here */) => (e) => {
      this.props.toggleAccount(index)

      /**
       * clicking on checkbox call this function twice,
       * because account row has the same onClick handler as well
       */
      e.stopPropagation()
    }
  }

  sortAccounts = field => (/* event */) => this.props.sortAccounts(field)
}

YourAccounts.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  openAccountManager: PropTypes.func.isRequired,
  closeAccountManager: PropTypes.func.isRequired,
  setCurrentAccount: PropTypes.func.isRequired,
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
  isTransactionsLoading: PropTypes.bool.isRequired,
}

export default YourAccounts
