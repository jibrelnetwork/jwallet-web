import React, { Component } from 'react'
import PropTypes from 'prop-types'

import YourAccountsHeader from './YourAccountsHeader'
import YourAccountsBody from './YourAccountsBody'

class YourAccounts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAccountManagerOpen: false,
      accounts: {
        isActiveAll: false,
        current: 0,
        items: [{
          symbol: 'ETH',
          balance: 2.123,
          isLicensed: false,
          isAuthRequired: false,
          isActive: true,
        }, {
          symbol: 'jUSD',
          balance: 7.890,
          isLicensed: false,
          isAuthRequired: false,
          isActive: true,
        }, {
          symbol: 'jEUR',
          balance: 8.657,
          isLicensed: false,
          isAuthRequired: false,
          isActive: false,
        }, {
          symbol: 'JNT',
          balance: 9.999,
          isLicensed: true,
          isAuthRequired: true,
          isActive: true,
        }],
      },
    }
  }

  render() {
    const { searchAccounts, addCustomToken /* , accounts */ } = this.props
    const { accounts, isAccountManagerOpen } = this.state

    return (
      <div className='your-accounts'>
        <YourAccountsHeader
          openAccountManager={this.openAccountManager}
          closeAccountManager={this.closeAccountManager}
          toggleAccount={this.toggleAccount}
          searchAccounts={searchAccounts}
          addCustomToken={addCustomToken}
          accounts={accounts}
          isAccountManagerOpen={isAccountManagerOpen}
        />
        <YourAccountsBody setCurrentAccount={this.setCurrentAccount} accounts={accounts} />
      </div>
    )
  }

  openAccountManager = () => this.setState({ isAccountManagerOpen: true })
  closeAccountManager = () => this.setState({ isAccountManagerOpen: false })

  setCurrentAccount = (current) => {
    return () => {
      this.setState({
        accounts: { ...this.state.accounts, current },
      })
    }
  }

  toggleAccount = (index) => {
    return (/* new checkbox state here */) => (e) => {
      const { accounts } = this.state
      const { items, current, isActiveAll } = accounts

      let newIsActiveAll = (index === -1) ? !isActiveAll : isActiveAll

      const newItems = items.map((item, i) => {
        const isCurrentActive = (index === i) ? !item.isActive : item.isActive

        return {
          ...item,
          isActive: (index === -1) ? newIsActiveAll : isCurrentActive,
        }
      })

      // check if all is active - set isActiveAll flag to true, otherwise set to false
      if (index !== -1) {
        newIsActiveAll = true

        newItems.forEach((item) => {
          if (!item.isActive) {
            newIsActiveAll = false
          }
        })
      }

      this.setState({
        accounts: { current, items: newItems, isActiveAll: newIsActiveAll },
      })

      /**
       * clicking on checkbox call this function twice,
       * because account row has the same onClick handler too
       */
      e.stopPropagation()
    }
  }
}

YourAccounts.propTypes = {
  searchAccounts: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  /*
  accounts: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      balance: PropTypes.number.isRequired,
      isActive: PropTypes.bool.isRequired,
      isAuthRequired: PropTypes.bool.isRequired,
      isLicensed: PropTypes.bool.isRequired,
    })).isRequired,
    current: PropTypes.number.isRequired,
    isActiveAll: PropTypes.bool.isRequired,
  }).isRequired,
  */
}

export default YourAccounts
