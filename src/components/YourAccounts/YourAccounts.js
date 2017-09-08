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
      setAccounts,
      openAccountManager,
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
          setAccounts={setAccounts}
          openAccountManager={openAccountManager}
          closeAccountManager={closeAccountManager}
          toggleAccount={this.toggleAccount}
          addCustomToken={addCustomToken}
          accounts={accounts}
        />
        <YourAccountsBody setCurrentAccount={this.setCurrentAccount} accounts={accounts} />
      </div>
    )
  }

  setCurrentAccount = current => (/* event */) => {
    const { setCurrentAccount, isTransactionsLoading } = this.props

    if (isTransactionsLoading) {
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
}

YourAccounts.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  setAccounts: PropTypes.func.isRequired,
  openAccountManager: PropTypes.func.isRequired,
  closeAccountManager: PropTypes.func.isRequired,
  setCurrentAccount: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isAccountManagerOpen: PropTypes.bool.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  isTransactionsLoading: PropTypes.bool.isRequired,
}

export default YourAccounts
