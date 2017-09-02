import React, { Component } from 'react'
import PropTypes from 'prop-types'

import JbModal from 'components/base/JbModal'

import AccountManagerHead from './AccountManagerHead'
import AccountManagerBody from './AccountManagerBody'

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
    const { isActiveAll, accounts } = this.state

    const head = <AccountManagerHead search={console.log} />

    const body = (
      <AccountManagerBody
        accounts={accounts}
        toggleAccount={this.toggleAccount}
        isActiveAll={isActiveAll}
      />
    )

    return (
      <JbModal
        closeModal={this.closeAccountManagerModal}
        name='account-manager'
        head={head}
        body={body}
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
        return {
          ...account,
          isActive: (index === -1) // toggle all
            ? newIsActiveAll
            : (index === i) // toggle only the current
              ? !account.isActive
              : account.isActive,
        }
      })

      // check if all is active - set isActiveAll flag to true, otherwise set to false
      if (index !== -1) {
        newIsActiveAll = true

        for (let account of newAccounts) {
          if (!account.isActive) {
            newIsActiveAll = false

            break
          }
        }
      }

      return this.setState({ accounts: newAccounts, isActiveAll: newIsActiveAll })
    }
  }
}

AccountManager.propTypes = {
  //className: PropTypes.string.isRequired,
}

export default AccountManager
