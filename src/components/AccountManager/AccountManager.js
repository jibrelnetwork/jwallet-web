import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

import AccountManagerHeader from './AccountManagerHeader'
import AccountManagerBody from './AccountManagerBody'
import AccountManagerFooter from './AccountManagerFooter'

class AccountManager extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: true,
      isActiveAll: false,
      accounts: [{
        label: 'OMG',
        name: 'OmiseGO',
        balance: 100,
        licensed: 'Yes',
        transfer: 'Authorized',
        isActive: true,
      }, {
        label: 'OMG',
        name: 'OmiseGO',
        balance: 100,
        licensed: 'Yes',
        transfer: 'Authorized',
        isActive: false,
      }],
    }
  }

  render() {
    const { searchAccounts, addCustomToken } = this.props
    const { isActiveAll, accounts } = this.state

    const accountManagerHeader = <AccountManagerHeader searchAccounts={searchAccounts} />

    const accountManagerBody = (
      <AccountManagerBody
        accounts={accounts}
        toggleAccount={this.toggleAccount}
        isActiveAll={isActiveAll}
      />
    )

    const accountManagerFooter = <AccountManagerFooter addCustomToken={addCustomToken} />

    return (
      <JbModal
        closeModal={this.closeAccountManagerModal}
        name='account-manager'
        header={accountManagerHeader}
        body={accountManagerBody}
        footer={accountManagerFooter}
        isOpen={this.state.isOpen}
      />
    )
  }

  closeAccountManagerModal = () => this.setState({ isOpen: false })

  toggleAccount = (index) => {
    return (/* new checkbox state here */) => (/* event here */) => {
      const { isActiveAll, accounts } = this.state

      let newIsActiveAll = (index === -1) ? !isActiveAll : isActiveAll

      const newAccounts = accounts.map((account, i) => {
        const isCurrentActive = (index === i) ? !account.isActive : account.isActive

        return {
          ...account,
          isActive: (index === -1) ? newIsActiveAll : isCurrentActive,
        }
      })

      // check if all is active - set isActiveAll flag to true, otherwise set to false
      if (index !== -1) {
        newIsActiveAll = true

        newAccounts.forEach((account) => {
          if (!account.isActive) {
            newIsActiveAll = false
          }
        })
      }

      return this.setState({ accounts: newAccounts, isActiveAll: newIsActiveAll })
    }
  }
}

AccountManager.propTypes = {
  searchAccounts: PropTypes.func.isRequired,
  addCustomToken: PropTypes.func.isRequired,
  accounts: PropTypes.array,
  isActiveAll: PropTypes.bool,
  isOpen: PropTypes.bool,
}

export default AccountManager
