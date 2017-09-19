import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JLoader from 'components/base/JLoader'

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
    const { openAccountManager, accounts } = this.props

    if (accounts.isLoading) {
      return <div className='your-accounts loading'><JLoader /></div>
    }

    return (
      <div className='your-accounts'>
        <YourAccountsHeader openAccountManager={openAccountManager} />
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
}

YourAccounts.propTypes = {
  getAccounts: PropTypes.func.isRequired,
  openAccountManager: PropTypes.func.isRequired,
  setCurrentAccount: PropTypes.func.isRequired,
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      balanceFixed: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    currentActiveIndex: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
  }).isRequired,
  isTransactionsLoading: PropTypes.bool.isRequired,
}

export default YourAccounts
