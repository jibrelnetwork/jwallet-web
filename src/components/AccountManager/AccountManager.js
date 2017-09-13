import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { JIcon, JModal } from 'components/base'
import AccountsTable from 'components/AccountsTable'

class AccountManager extends Component {
  render() {
    const { closeAccountManager, accounts } = this.props

    return (
      <JModal
        closeModal={closeAccountManager}
        name='account-manager'
        header={this.renderAccountManagerHeader()}
        body={this.renderAccountManagerBody()}
        footer={this.renderAccountManagerFooter()}
        isOpen={accounts.isAccountManagerOpen}
      />
    )
  }

  renderAccountManagerHeader = () => {
    return <div className='account-manager-header' />
  }

  renderAccountManagerBody = () => {
    const { searchAccounts, accounts } = this.props

    return (
      <div className='account-manager-body'>
        <AccountsTable
          toggleAccount={this.toggleAccount}
          searchAccounts={searchAccounts}
          sortAccounts={this.sortAccounts}
          accounts={accounts}
        />
      </div>
    )
  }

  renderAccountManagerFooter = () => {
    return (
      <div className='account-manager-footer' onClick={this.props.openAddCustomTokenModal}>
        <JIcon name='small-add' className='account-manager-footer__icon' small />
        {'Add custom token'}
      </div>
    )
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

AccountManager.propTypes = {
  closeAccountManager: PropTypes.func.isRequired,
  toggleAccount: PropTypes.func.isRequired,
  searchAccounts: PropTypes.func.isRequired,
  sortAccounts: PropTypes.func.isRequired,
  openAddCustomTokenModal: PropTypes.func.isRequired,
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
